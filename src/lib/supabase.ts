import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ywzpfhxrtqfagvpxfpfj.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_DrNy4WKOtSoPPqjCDmRMNw_8GqmHndq";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  avatar?: string;
}

const LOCAL_ADMIN_KEY = "flowmarket_admin_session";

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    // 1. Try Supabase Auth session first
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const u = session.user;
      const metaName =
        u.user_metadata?.full_name ||
        u.user_metadata?.name ||
        u.user_metadata?.username;
      const derivedName = metaName || u.email?.split("@")[0] || "Administrateur";
      
      const adminData: AdminUser = {
        id: u.id,
        email: u.email || "admin@flowmarket.fr",
        name: derivedName,
        role: "ADMIN",
        avatar: u.user_metadata?.avatar_url,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminData));
      }
      return adminData;
    }

    // 2. Fallback to localStorage session
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (stored) {
        return JSON.parse(stored) as AdminUser;
      }
    }
  } catch (err) {
    console.warn("Erreur lors de la récupération de la session Supabase:", err);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (stored) {
        return JSON.parse(stored) as AdminUser;
      }
    }
  }
  return null;
}

export function saveLocalAdminSession(admin: AdminUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(admin));
    window.dispatchEvent(new Event("flowmarket_auth_changed"));
  }
}

export async function logOutAdmin(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch {
    // ignore
  }
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    sessionStorage.removeItem("flowmarket_just_logged_in");
    window.dispatchEvent(new Event("flowmarket_auth_changed"));
  }
}

/* ──────────────────── Storage Upload Helpers ──────────────────── */

// Bucket names
export const STORAGE_BUCKETS = {
  WORKFLOW_JSON: "workflow-json",
  WORKFLOW_VIDEO: "workflow-videos",
  WORKFLOW_COVER: "workflow-covers",
} as const;

type BucketName = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

function getBucketConfig(bucket: BucketName) {
  const configs: Record<BucketName, { maxSizeMB: number; allowedTypes: string[] }> = {
    "workflow-json": { maxSizeMB: 5, allowedTypes: ["application/json", "text/json"] },
    "workflow-videos": { maxSizeMB: 100, allowedTypes: ["video/mp4", "video/webm", "video/quicktime"] },
    "workflow-covers": { maxSizeMB: 10, allowedTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"] },
  };
  return configs[bucket];
}

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

/**
 * Upload a file to Supabase Storage
 * @param file - The file to upload
 * @param bucket - Target bucket
 * @param workflowId - Workflow ID for folder organization
 * @returns UploadResult with public URL or error
 */
export async function uploadWorkflowFile(
  file: File,
  bucket: BucketName,
  workflowId: string
): Promise<UploadResult> {
  const config = getBucketConfig(bucket);

  // Validate file type
  if (!config.allowedTypes.includes(file.type)) {
    return {
      url: "",
      path: "",
      error: `Type de fichier non autorisé. Types acceptés : ${config.allowedTypes.join(", ")}`,
    };
  }

  // Validate file size
  if (file.size > config.maxSizeMB * 1024 * 1024) {
    return {
      url: "",
      path: "",
      error: `Fichier trop volumineux. Taille max : ${config.maxSizeMB} MB`,
    };
  }

  try {
    // Generate unique path: workflows/{workflowId}/{bucket}/{timestamp}-{random}.{ext}
    const ext = file.name.split(".").pop() || "";
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const fileName = `${timestamp}-${random}.${ext}`;
    const path = `workflows/${workflowId}/${bucket}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return { url: "", path: "", error: uploadError.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);

    return { url: publicUrl, path };
  } catch (err) {
    console.error("Upload error:", err);
    return { url: "", path: "", error: "Erreur lors de l'upload" };
  }
}

/**
 * Upload multiple files in parallel
 */
export async function uploadWorkflowFiles(
  files: { file: File; bucket: BucketName }[],
  workflowId: string
): Promise<Record<string, UploadResult>> {
  const results: Record<string, UploadResult> = {};
  
  await Promise.all(
    files.map(async ({ file, bucket }) => {
      const result = await uploadWorkflowFile(file, bucket, workflowId);
      results[bucket] = result;
    })
  );

  return results;
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteWorkflowFile(
  bucket: BucketName,
  path: string
): Promise<{ error?: string }> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) return { error: error.message };
    return {};
  } catch (err) {
    console.error("Delete error:", err);
    return { error: "Erreur lors de la suppression" };
  }
}

/**
 * Extract file path from public URL for deletion
 */
export function extractPathFromUrl(url: string, bucket: BucketName): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split(`/${bucket}/`);
    if (pathParts.length === 2) {
      return pathParts[1];
    }
    return null;
  } catch {
    return null;
  }
}
