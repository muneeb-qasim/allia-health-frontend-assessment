import { ReactNode } from "react";
import { Status } from "@/types/task";
import { DownOutlined } from "@ant-design/icons";

interface StatusBadgeProps {
  status: Status;
  children: ReactNode;
  showDropdown?: boolean;
  className?: string;
}

export const StatusBadge = ({
  status,
  children,
  showDropdown = false,
  className,
}: StatusBadgeProps) => {
  const getStatusClass = (status: Status): string => {
    switch (status) {
      case "todo":
        return "todo";
      case "in_progress":
        return "in-progress";
      case "in_review":
        return "in-review";
      case "done":
        return "done";
      default:
        return "in-progress";
    }
  };

  return (
    <div
      className={`status-badge ${getStatusClass(status)} ${className || ""}`}
    >
      <span className="status-text">{children}</span>
      {showDropdown && (
        <DownOutlined className="status-chevron text-xs ml-1.5 text-inherit" />
      )}
    </div>
  );
};
