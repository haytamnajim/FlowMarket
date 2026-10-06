import { Suspense } from "react";
import WorkflowsClient from "./WorkflowsClient";

export default function WorkflowsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-16 flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement du catalogue...</p>
        </div>
      </div>
    }>
      <WorkflowsClient />
    </Suspense>
  );
}