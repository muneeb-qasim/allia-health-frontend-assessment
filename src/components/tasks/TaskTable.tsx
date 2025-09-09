import { useMemo } from "react";
import { Task, Status } from "@/types/task";
import { format } from "date-fns";
import { Select, Avatar, Typography, Skeleton } from "antd";
import { TagOutlined, LoadingOutlined } from "@ant-design/icons";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PriorityBadge } from "@/components/ui/PriorityBadge";

const getSafeAvatarSrc = (
  avatarUrl: string | undefined | null
): string | null => {
  if (!avatarUrl || avatarUrl.trim() === "") {
    return null;
  }
  return avatarUrl;
};

const getUserInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

interface TaskTableProps {
  tasks: Task[];
  loading: boolean;
  onStatusChange: (taskId: string, status: Status) => void;
  optimisticUpdates: Map<string, Status>;
  loadingTasks: Set<string>;
}

const { Text } = Typography;

const statusOptions = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "in_review", label: "In Review" },
  { value: "done", label: "Done" },
];

const StatusDropdown = ({
  task,
  onStatusChange,
  isLoading,
}: {
  task: Task;
  onStatusChange: (taskId: string, status: Status) => void;
  isLoading: boolean;
}) => {
  const handleStatusChange = (newStatus: Status) => {
    if (newStatus === task.status || isLoading) return;
    onStatusChange(task.id, newStatus);
  };

  const getStatusLabel = (status: Status) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "in_progress":
        return "In progress";
      case "in_review":
        return "In Review";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <StatusBadge status={task.status} showDropdown={true}>
        {isLoading ? (
          <div className="flex items-center gap-1">
            <LoadingOutlined style={{ fontSize: "12px" }} />
            <span>{getStatusLabel(task.status)}</span>
          </div>
        ) : (
          getStatusLabel(task.status)
        )}
      </StatusBadge>
      <Select
        value={task.status}
        onChange={handleStatusChange}
        loading={isLoading}
        disabled={isLoading}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
        options={statusOptions.map((option) => ({
          value: option.value,
          label: option.label,
        }))}
        popupMatchSelectWidth={200}
        suffixIcon={null}
      />
    </div>
  );
};

export const TaskTable = ({
  tasks,
  loading,
  onStatusChange,
  optimisticUpdates,
  loadingTasks,
}: TaskTableProps) => {
  const groupedTasks = useMemo(() => {
    const groups = new Map<string, Task[]>();

    tasks.forEach((task) => {
      const assignedUserId = task.assignedTo.id;
      if (!groups.has(assignedUserId)) {
        groups.set(assignedUserId, []);
      }
      groups.get(assignedUserId)!.push(task);
    });

    return Array.from(groups.entries()).map(([, userTasks]) => ({
      user: userTasks[0].assignedTo,
      tasks: userTasks,
    }));
  }, [tasks]);

  if (loading) {
    return (
      <div className="task-table bg-white rounded-lg border border-gray-200">
        <div className="table-header">
          <div className="grid">
            <div className="text-left text-base font-bold">TASK TITLE</div>
            <div className="text-left text-base font-bold">CREATED BY</div>
            <div className="text-left text-base font-bold">TAGS</div>
            <div className="text-left text-base font-bold">PRIORITY</div>
            <div className="text-left text-base font-bold">STATUS</div>
          </div>
        </div>

        <div>
          {[1, 2, 3].map((groupIndex) => (
            <div key={groupIndex}>
              <div className="assigned-to-header">
                <div className="flex items-center gap-2">
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: 100, height: 16 }}
                  />
                  <Skeleton.Avatar active size={24} shape="circle" />
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: 120, height: 16 }}
                  />
                </div>
              </div>

              {[1, 2, 3, 4]
                .slice(0, Math.floor(Math.random() * 3) + 2)
                .map((taskIndex) => (
                  <div
                    key={taskIndex}
                    className="task-row border-b border-gray-100 last:border-b-0"
                  >
                    <div className="px-6 py-4">
                      <div className="grid grid-cols-5 items-start gap-4">
                        <div className="text-left">
                          <Skeleton.Input
                            active
                            size="small"
                            style={{
                              width: "80%",
                              height: 16,
                              marginBottom: 4,
                            }}
                          />
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: "60%", height: 12 }}
                          />
                        </div>

                        <div className="text-left">
                          <Skeleton.Input
                            active
                            size="small"
                            style={{
                              width: "70%",
                              height: 16,
                              marginBottom: 4,
                            }}
                          />
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: "90%", height: 12 }}
                          />
                        </div>

                        <div className="text-left">
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 60, height: 20 }}
                          />
                        </div>

                        <div className="text-left">
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 50, height: 20 }}
                          />
                        </div>

                        <div className="text-left">
                          <Skeleton.Input
                            active
                            size="small"
                            style={{ width: 80, height: 24 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="text-gray-400 text-6xl mb-4">📋</div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          No tasks found
        </h3>
        <p className="text-sm text-gray-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="task-table bg-white rounded-lg border border-gray-200">
      <div className="table-header">
        <div className="grid">
          <div className="text-left text-base font-bold">TASK TITLE</div>
          <div className="text-left text-base font-bold">CREATED BY</div>
          <div className="text-left text-base font-bold">TAGS</div>
          <div className="text-left text-base font-bold">PRIORITY</div>
          <div className="text-left text-base font-bold">STATUS</div>
        </div>
      </div>

      <div>
        {groupedTasks.map((group) => (
          <div key={group.user.id}>
            <div className="assigned-to-header">
              <div className="flex">
                <Text className="text-sm font-bold assigned-to-label">
                  Assigned To:
                </Text>
                <Avatar
                  size={24}
                  src={getSafeAvatarSrc(group.user.avatar)}
                  style={{ backgroundColor: "#f0f0f0", color: "#666" }}
                >
                  {!getSafeAvatarSrc(group.user.avatar) &&
                    getUserInitials(group.user.name)}
                </Avatar>
                <Text className="text-sm">{group.user.name}</Text>
              </div>
            </div>

            {group.tasks.map((task) => {
              const isOptimistic = optimisticUpdates.has(task.id);
              const isLoading = loadingTasks.has(task.id);
              const displayStatus =
                optimisticUpdates.get(task.id) || task.status;
              const taskWithStatus = { ...task, status: displayStatus };

              return (
                <div
                  key={task.id}
                  className={`task-row border-b border-gray-100 last:border-b-0 ${
                    isOptimistic ? "opacity-70" : ""
                  } ${isLoading ? "loading" : ""}`}
                >
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-5 items-start">
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {task.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          Due On: {format(new Date(task.dueOn), "MMM d, yyyy")}
                          {task.overdue && (
                            <span className="text-red-600 ml-1">(Overdue)</span>
                          )}
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {task.createdBy.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Created On:{" "}
                          {format(new Date(task.createdOn), "MMM d, yyyy")}
                        </div>
                      </div>

                      <div className="text-left">
                        {task.tags.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="tag-badge">
                              <TagOutlined className="tag-icon" />
                              <span className="tag-text text-sm">
                                {task.tags.length === 1
                                  ? task.tags[0]
                                  : "Hashtag"}
                              </span>
                            </div>
                            {task.tags.length > 1 && (
                              <span className="tag-count-outside text-sm">
                                + {task.tags.length - 1}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="no-tags text-sm">--</span>
                        )}
                      </div>

                      <div className="text-left">
                        <PriorityBadge priority={task.priority} />
                      </div>

                      <div className="text-left">
                        <StatusDropdown
                          task={taskWithStatus}
                          onStatusChange={onStatusChange}
                          isLoading={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
