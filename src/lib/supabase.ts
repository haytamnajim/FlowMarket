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
