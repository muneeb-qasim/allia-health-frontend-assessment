import clsx from "clsx";
import { Tag as AntTag } from "antd";
import { Tag as TagIcon } from "lucide-react";

interface TagBadgeProps {
  tag: string;
  showIcon?: boolean;
  className?: string;
}

interface TagListProps {
  tags: string[];
  maxVisible?: number;
  className?: string;
}

export const TagBadge = ({
  tag,
  showIcon = true,
  className,
}: TagBadgeProps) => {
  return (
    <AntTag
      className={clsx(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border-gray-200",
        className
      )}
      icon={
        showIcon ? <TagIcon className="w-3 h-3 text-gray-500" /> : undefined
      }
    >
      {tag}
    </AntTag>
  );
};

export const TagList = ({ tags, maxVisible = 1, className }: TagListProps) => {
  if (tags.length === 0) {
    return <span className="text-xs text-gray-400">--</span>;
  }

  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      {visibleTags.map((tag) => (
        <TagBadge key={tag} tag={tag} />
      ))}
      {remainingCount > 0 && (
        <AntTag className="text-xs font-medium text-gray-700 bg-gray-100 border-gray-200">
          +{remainingCount}
        </AntTag>
      )}
    </div>
  );
};
