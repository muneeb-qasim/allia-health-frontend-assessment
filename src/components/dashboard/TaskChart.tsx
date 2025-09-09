import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Task, Status, Priority } from "@/types/task";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

interface LegendProps {
  payload?: Array<{
    value: string;
    color: string;
    payload: {
      value: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const total = payload.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((data.value / total) * 100).toFixed(1);
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600">
          {data.value} tasks ({percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: LegendProps) => {
  if (!payload) return null;

  const total = payload.reduce((sum, entry) => sum + entry.payload.value, 0);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry) => {
        const percentage = ((entry.payload.value / total) * 100).toFixed(1);
        return (
          <div key={entry.value} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">
              {entry.value} ({percentage}%)
            </span>
          </div>
        );
      })}
    </div>
  );
};

interface TaskChartProps {
  tasks: Task[];
  type: "status" | "priority";
}

const statusColors = {
  todo: "#F97316", // orange
  in_progress: "#60A5FA", // light blue
  in_review: "#14B8A6", // teal
  done: "#FBBF24", // yellow
};

const priorityColors = {
  low: "#10B981", // green
  medium: "#F59E0B", // yellow
  high: "#EF4444", // red
};

const statusLabels = {
  todo: "To Do",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
};

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const TaskChart = ({ tasks, type }: TaskChartProps) => {
  const chartData = useMemo(() => {
    if (type === "status") {
      const statusCounts = tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      }, {} as Record<Status, number>);

      return Object.entries(statusCounts).map(([status, count]) => ({
        name: statusLabels[status as Status],
        value: count,
        color: statusColors[status as Status],
      }));
    } else {
      const priorityCounts = tasks.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
      }, {} as Record<Priority, number>);

      return Object.entries(priorityCounts).map(([priority, count]) => ({
        name: priorityLabels[priority as Priority],
        value: count,
        color: priorityColors[priority as Priority],
      }));
    }
  }, [tasks, type]);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Task Distribution by {type === "status" ? "Status" : "Priority"}
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No tasks to display
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Task Distribution by {type === "status" ? "Status" : "Priority"}
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        Total: {total} tasks
      </div>
    </div>
  );
};
