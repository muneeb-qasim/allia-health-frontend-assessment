"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskTable } from "@/components/tasks/TaskTable";
import { CreateTaskModal } from "@/components/tasks/CreateTaskModal";
import { TaskChart } from "@/components/dashboard/TaskChart";
import { useTaskStore } from "@/store/tasks";
import { deserializeFilters, updateURL } from "@/lib/url-params";
import { toast } from "sonner";
import { Status } from "@/types/task";

export default function TasksPageWrapper() {
  const searchParams = useSearchParams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    tasks,
    filteredTasks,
    loading,
    error,
    filters,
    optimisticUpdates,
    loadingTasks,
    fetchTasks,
    updateTaskStatus,
    createTask,
    setFilters,
    clearError,
  } = useTaskStore();

  // Initialize filters from URL on mount
  useEffect(() => {
    const urlFilters = deserializeFilters(searchParams);
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array is intentional here

  // Update URL when filters change
  useEffect(() => {
    updateURL(filters);
  }, [filters]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters(newFilters);
  };

  const handleStatusChange = async (taskId: string, status: string) => {
    await updateTaskStatus(taskId, status as Status);
  };

  const handleCreateTask = async (data: Parameters<typeof createTask>[0]) => {
    await createTask(data);
    toast.success("Task created successfully!");
  };

  // Get unique users for the create modal
  const availableUsers = Array.from(
    new Map(
      tasks
        .flatMap((t) => [t.assignedTo, t.createdBy])
        .map((user) => [user.id, user])
    ).values()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="space-y-6">
              {/* Task Chart */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <TaskChart tasks={tasks} type="status" />
              </div>

              <TaskFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onCreateTask={() => setIsCreateModalOpen(true)}
              />

              <TaskTable
                tasks={filteredTasks}
                loading={loading}
                onStatusChange={handleStatusChange}
                optimisticUpdates={optimisticUpdates}
                loadingTasks={loadingTasks}
              />
            </div>
          </main>
        </div>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        loading={loading}
        availableUsers={availableUsers}
      />
    </div>
  );
}
