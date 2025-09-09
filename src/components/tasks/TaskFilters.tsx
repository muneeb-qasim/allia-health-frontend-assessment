import { useState } from "react";
import { TaskFilters as TaskFiltersType } from "@/types/task";
import { Input, Button } from "antd";
import {
  SearchOutlined,
  SortAscendingOutlined,
  FilterOutlined,
  DownOutlined,
  CloseOutlined,
} from "@ant-design/icons";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: Partial<TaskFiltersType>) => void;
  onCreateTask?: () => void;
}

const filterTabs = [
  { key: "all", label: "All" },
  { key: "assigned_to_me", label: "Assigned to Me" },
  { key: "created_by_me", label: "Created By Me" },
] as const;

export const TaskFilters = ({
  filters,
  onFiltersChange,
  onCreateTask,
}: TaskFiltersProps) => {
  const [searchInput, setSearchInput] = useState(filters.search);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    // Debounce search
    const timeoutId = setTimeout(() => {
      onFiltersChange({ search: value });
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onFiltersChange({ search: "" });
  };

  const handleSortToggle = () => {
    // Toggle between desc and asc for Create Date
    const newSortOrder = filters.sortOrder === "desc" ? "asc" : "desc";
    onFiltersChange({
      sortBy: "createdOn",
      sortOrder: newSortOrder,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with title and create button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 m-0">Pending Tasks</h2>
        <Button
          type="primary"
          onClick={onCreateTask}
          className="bg-teal-600! hover:bg-teal-600! border-teal-600! hover:border-teal-600! h-10! rounded-md! font-medium! text-white!"
        >
          + Create New Task
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by task title"
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          prefix={<SearchOutlined className="text-gray-500" />}
          suffix={
            searchInput ? (
              <CloseOutlined
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                onClick={handleClearSearch}
              />
            ) : null
          }
          className="flex-1 search-input"
        />

        <div className="flex items-center gap-2">
          <Button
            onClick={handleSortToggle}
            icon={<SortAscendingOutlined />}
            className="sort-button"
          >
            Sort by Create Date ({filters.sortOrder === "desc" ? "Desc" : "Asc"}
            )
            <DownOutlined
              className={`transition-transform ${
                filters.sortOrder === "asc" ? "rotate-180" : ""
              }`}
            />
          </Button>

          <Button icon={<FilterOutlined />} className="filter-button">
            Filter
          </Button>
        </div>
      </div>

      <div className="flex space-x-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              onFiltersChange({
                filter: tab.key,
              })
            }
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${
                filters.filter === tab.key
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
