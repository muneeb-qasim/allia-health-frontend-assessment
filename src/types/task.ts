export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in_progress' | 'in_review' | 'done';

export interface User {
  id: string;
  name: string;
  avatar: string; // Can be empty string or valid URL
}

export interface Task {
  id: string;
  title: string;
  assignedTo: User;
  createdBy: User;
  tags: string[];
  priority: Priority;
  status: Status;
  createdOn: string;
  dueOn: string;
  overdue: boolean;
  meta: {
    patientCode: string;
    commentsCount: number;
  };
}

export interface TasksResponse {
  _meta: {
    schema: string;
  };
  tasks: Task[];
}

export interface CreateTaskData {
  title: string;
  assignedTo: string;
  priority: Priority;
  status: Status;
  dueOn: string;
  tags: string[];
}

export interface TaskFilters {
  search: string;
  filter: 'all' | 'assigned_to_me' | 'created_by_me';
  sortBy: 'createdOn' | 'dueOn' | 'priority';
  sortOrder: 'asc' | 'desc';
}

export interface TaskStats {
  total: number;
  byStatus: Record<Status, number>;
  byPriority: Record<Priority, number>;
}

