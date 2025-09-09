import { create } from 'zustand';
import { Task, TaskFilters, CreateTaskData, Status } from '@/types/task';
import { api, CURRENT_USER_ID } from '@/lib/api';

interface TaskStore {
  // State
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
  optimisticUpdates: Map<string, Status>;
  loadingTasks: Set<string>; // Track which tasks are currently being updated

  // Actions
  fetchTasks: () => Promise<void>;
  updateTaskStatus: (taskId: string, status: Status) => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<void>;
  setFilters: (filters: Partial<TaskFilters>) => void;
  clearError: () => void;
  applyFilters: (tasks: Task[], filters: TaskFilters) => void;
}

const defaultFilters: TaskFilters = {
  search: '',
  filter: 'all',
  sortBy: 'createdOn',
  sortOrder: 'desc',
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  // Initial state
  tasks: [],
  filteredTasks: [],
  loading: false,
  error: null,
  filters: defaultFilters,
  optimisticUpdates: new Map(),
  loadingTasks: new Set(),

  // Actions
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await api.listTasks();
      set({ tasks, loading: false });
      
      // Apply current filters to update filtered tasks
      const { filters } = get();
      get().applyFilters(tasks, filters);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch tasks',
        loading: false 
      });
    }
  },

  updateTaskStatus: async (taskId: string, status: Status) => {
    const { tasks, optimisticUpdates, loadingTasks } = get();
    
    // Add to loading tasks
    const newLoadingTasks = new Set(loadingTasks);
    newLoadingTasks.add(taskId);
    set({ loadingTasks: newLoadingTasks });
    
    // Optimistic update
    const newOptimisticUpdates = new Map(optimisticUpdates);
    newOptimisticUpdates.set(taskId, status);
    set({ optimisticUpdates: newOptimisticUpdates });

    try {
      const updatedTask = await api.updateTaskStatus(taskId, status);
      
      // Update the task in the store
      const newTasks = tasks.map(task => 
        task.id === taskId ? updatedTask : task
      );
      
      // Remove from optimistic updates and loading tasks
      const finalOptimisticUpdates = new Map(optimisticUpdates);
      finalOptimisticUpdates.delete(taskId);
      const finalLoadingTasks = new Set(loadingTasks);
      finalLoadingTasks.delete(taskId);
      
      set({ 
        tasks: newTasks,
        optimisticUpdates: finalOptimisticUpdates,
        loadingTasks: finalLoadingTasks
      });
      
      // Reapply filters
      const { filters } = get();
      get().applyFilters(newTasks, filters);
    } catch (error) {
      // Revert optimistic update and remove from loading on error
      const revertedOptimisticUpdates = new Map(optimisticUpdates);
      revertedOptimisticUpdates.delete(taskId);
      const revertedLoadingTasks = new Set(loadingTasks);
      revertedLoadingTasks.delete(taskId);
      
      set({
        optimisticUpdates: revertedOptimisticUpdates,
        loadingTasks: revertedLoadingTasks,
        error: error instanceof Error ? error.message : 'Failed to update task status'
      });
    }
  },

  createTask: async (data: CreateTaskData) => {
    set({ loading: true, error: null });
    try {
      const newTask = await api.createTask(data);
      const { tasks } = get();
      const updatedTasks = [...tasks, newTask];
      
      set({ 
        tasks: updatedTasks,
        loading: false 
      });
      
      // Reapply filters
      const { filters } = get();
      get().applyFilters(updatedTasks, filters);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create task',
        loading: false 
      });
    }
  },

  setFilters: (newFilters: Partial<TaskFilters>) => {
    const { filters, tasks } = get();
    const updatedFilters = { ...filters, ...newFilters };
    
    set({ filters: updatedFilters });
    get().applyFilters(tasks, updatedFilters);
  },

  clearError: () => {
    set({ error: null });
  },

  // Helper function to apply filters and sorting
  applyFilters: (tasks: Task[], filters: TaskFilters) => {
    let filtered = [...tasks];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.assignedTo.name.toLowerCase().includes(searchLower) ||
        task.createdBy.name.toLowerCase().includes(searchLower) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        task.meta.patientCode.toLowerCase().includes(searchLower)
      );
    }

    // Apply user filter
    if (filters.filter === 'assigned_to_me') {
      filtered = filtered.filter(task => task.assignedTo.id === CURRENT_USER_ID);
    } else if (filters.filter === 'created_by_me') {
      filtered = filtered.filter(task => task.createdBy.id === CURRENT_USER_ID);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (filters.sortBy) {
        case 'createdOn':
          aValue = new Date(a.createdOn).getTime();
          bValue = new Date(b.createdOn).getTime();
          break;
        case 'dueOn':
          aValue = new Date(a.dueOn).getTime();
          bValue = new Date(b.dueOn).getTime();
          break;
        case 'priority': {
          const priorityOrder = { low: 1, medium: 2, high: 3 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        }
        default:
          return 0;
      }

      if (filters.sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    set({ filteredTasks: filtered });
  },
}));
