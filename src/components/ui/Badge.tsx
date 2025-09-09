import { ReactNode } from "react";
import { Badge as AntBadge } from "antd";
import { Priority, Status } from "@/types/task";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "priority" | "status";
  priority?: Priority;
  status?: Status;
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  priority,
  status,
  className,
}: BadgeProps) => {
  const getBadgeColor = () => {
    if (variant === "priority") {
      switch (priority) {
        case "high":
          return "red";
        case "medium":
          return "orange";
        case "low":
          return "green";
        default:
          return "default";
      }
    }

    if (variant === "status") {
      switch (status) {
        case "todo":
          return "default";
        case "in_progress":
          return "blue";
        case "in_review":
          return "purple";
        case "done":
          return "green";
        default:
          return "default";
      }
    }

    return "default";
  };

  return (
    <AntBadge
      color={getBadgeColor()}
      text={children}
      className={`text-xs font-medium px-2 py-0.5 rounded-xl border-0 ${
        className || ""
      }`}
    />
  );
};
