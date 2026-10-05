"use client";

import { workflows as defaultWorkflows, Workflow } from "@/data/workflows";

const STORAGE_KEY = "flowmarket_custom_workflows";

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
  // Map by id so custom updates overwrite defaults if needed
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
    if (existingIndex >= 0) {
      custom[existingIndex] = workflow;
    } else {
      custom.unshift(workflow);
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
