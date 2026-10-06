"use client";

import { workflows as defaultWorkflows, Workflow, Category } from "@/data/workflows";

const STORAGE_KEY = "flowmarket_custom_workflows";
const CATEGORIES_STORAGE_KEY = "flowmarket_custom_categories";

/* ─────────────────── Workflows ─────────────────── */

export function getCustomWorkflows(): Workflow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading custom workflows:", err);
    return [];
  }
}

export function getAllStoredWorkflows(): Workflow[] {
  const custom = getCustomWorkflows();
  const map = new Map<string, Workflow>();
  defaultWorkflows.forEach((w) => map.set(w.id, w));
  custom.forEach((w) => map.set(w.id, w));
  return Array.from(map.values());
}

export function saveWorkflow(workflow: Workflow): void {
  if (typeof window === "undefined") return;
  try {
    const custom = getCustomWorkflows();
    const existingIndex = custom.findIndex((w) => w.id === workflow.id);
    const now = new Date().toISOString().split("T")[0];
    
    const workflowToSave = {
      ...workflow,
      updatedAt: now,
      publishedAt: workflow.status === "published" && !workflow.publishedAt ? now : workflow.publishedAt,
    };
    
    if (existingIndex >= 0) {
      custom[existingIndex] = workflowToSave;
    } else {
      custom.unshift(workflowToSave);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
    window.dispatchEvent(new Event("flowmarket_workflows_changed"));
  } catch (err) {
    console.error("Error saving workflow:", err);
  }
}

export function deleteWorkflow(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const custom = getCustomWorkflows().filter((w) => w.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
    window.dispatchEvent(new Event("flowmarket_workflows_changed"));
  } catch (err) {
    console.error("Error deleting workflow:", err);
  }
}

/* ─────────────────── Categories ─────────────────── */

export function getCustomCategories(): Category[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading custom categories:", err);
    return [];
  }
}

export function getAllStoredCategories(): Category[] {
  const custom = getCustomCategories();
  // Note: default categories are in workflows.ts, we just return custom ones
  // The UI will merge them
  return custom;
}

export function saveCategory(category: Category): void {
  if (typeof window === "undefined") return;
  try {
    const custom = getCustomCategories();
    const existingIndex = custom.findIndex((c) => c.id === category.id);
    if (existingIndex >= 0) {
      custom[existingIndex] = category;
    } else {
      custom.push(category);
    }
    // Sort by order
    custom.sort((a, b) => a.order - b.order);
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(custom));
    window.dispatchEvent(new Event("flowmarket_categories_changed"));
  } catch (err) {
    console.error("Error saving category:", err);
  }
}

export function deleteCategory(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const custom = getCustomCategories().filter((c) => c.id !== id);
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(custom));
    window.dispatchEvent(new Event("flowmarket_categories_changed"));
  } catch (err) {
    console.error("Error deleting category:", err);
  }
}

/* ─────────────────── CSV Export/Import ─────────────────── */

export const CSV_HEADERS: (keyof Workflow)[] = [
  "id", "title", "slug", "description", "longDescription", "price", "category",
  "tags", "image", "rating", "reviews", "downloads", "featured", "createdAt",
  "updatedAt", "nodes", "complexity", "demoVideo", "demoPoster", "n8nJsonProtected",
  "status", "publishedAt", "metaTitle", "metaDescription", "ogImage"
];

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
}

function workflowToCsvRow(w: Workflow): string {
  return CSV_HEADERS.map((h) => {
    const val = w[h];
    if (Array.isArray(val)) return escapeCsv(val.join(";"));
    if (typeof val === "boolean") return val ? "true" : "false";
    if (val === undefined || val === null) return "";
    return escapeCsv(String(val));
  }).join(",");
}

export function exportWorkflowsToCsv(): string {
  const allWorkflows = getAllStoredWorkflows();
  const header = CSV_HEADERS.join(",");
  const rows = allWorkflows.map(workflowToCsvRow).join("\n");
  return header + "\n" + rows;
}

export function downloadCsv(filename = "workflows-export.csv"): void {
  const csv = exportWorkflowsToCsv();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function parseCsvRow(row: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function importWorkflowsFromCsv(csv: string): { success: number; errors: string[] } {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return { success: 0, errors: ["CSV vide ou invalide"] };

  const headers = parseCsvRow(lines[0]);
  const headerMap = new Map(headers.map((h, i) => [h, i]));
  
  const errors: string[] = [];
  let success = 0;

  for (let i = 1; i < lines.length; i++) {
    try {
      const cols = parseCsvRow(lines[i]);
      if (cols.length < headers.length) continue;

      const get = (key: string) => cols[headerMap.get(key) ?? -1] ?? "";
      
      const workflow: Workflow = {
        id: get("id") || `custom-${Date.now()}-${i}`,
        title: get("title"),
        slug: get("slug") || get("title").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        description: get("description"),
        longDescription: get("longDescription") || get("description"),
        price: parseFloat(get("price")) || 0,
        category: get("category") || "marketing",
        tags: get("tags") ? get("tags").split(";").map(t => t.trim()).filter(Boolean) : [],
        image: get("image") || "/workflows/default.png",
        rating: parseFloat(get("rating")) || 5.0,
        reviews: parseInt(get("reviews")) || 1,
        downloads: parseInt(get("downloads")) || 0,
        featured: get("featured") === "true",
        createdAt: get("createdAt") || new Date().toISOString().split("T")[0],
        updatedAt: get("updatedAt"),
        nodes: parseInt(get("nodes")) || 12,
        complexity: (get("complexity") as Workflow["complexity"]) || "Débutant",
        demoVideo: get("demoVideo") || undefined,
        demoPoster: get("demoPoster") || undefined,
        n8nJsonProtected: get("n8nJsonProtected") || undefined,
        status: (get("status") as Workflow["status"]) || "published",
        publishedAt: get("publishedAt") || undefined,
        metaTitle: get("metaTitle") || undefined,
        metaDescription: get("metaDescription") || undefined,
        ogImage: get("ogImage") || undefined,
      };

      if (!workflow.title || !workflow.slug) {
        errors.push(`Ligne ${i + 1}: titre ou slug manquant`);
        continue;
      }

      saveWorkflow(workflow);
      success++;
    } catch (err) {
      errors.push(`Ligne ${i + 1}: ${err}`);
    }
  }

  return { success, errors };
}

export function parseCsvFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error("Erreur lecture fichier"));
    reader.readAsText(file);
  });
}