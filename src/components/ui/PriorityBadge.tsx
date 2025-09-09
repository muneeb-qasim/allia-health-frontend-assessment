import { Priority } from "@/types/task";
import { FlagOutlined } from "@ant-design/icons";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return priority;
    }
  };

  return (
    <div className={`priority-badge ${className || ""}`}>
      <FlagOutlined className={`priority-icon ${priority}`} />
      <span>{getPriorityLabel(priority)}</span>
    </div>
  );
};
