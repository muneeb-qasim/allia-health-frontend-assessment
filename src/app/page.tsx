import { Suspense } from "react";
import { Toaster } from "sonner";
import TasksPageWrapper from "@/components/TasksPageWrapper";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <TasksPageWrapper />
      </Suspense>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
