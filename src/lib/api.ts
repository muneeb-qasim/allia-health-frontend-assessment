import { Task, TasksResponse, Status, CreateTaskData } from '@/types/task';

// Simulate network latency
const delay = (min: number, max: number) => 
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

// Simulate random failures (10-15% failure rate)
const shouldFail = () => Math.random() < 0.125; // 12.5% failure rate

// Current user for filtering
export const CURRENT_USER_ID = 'u1'; // Amie Leighton

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  async listTasks(): Promise<Task[]> {
    await delay(800, 1200);
    
    if (shouldFail()) {
      throw new ApiError('Failed to load tasks. Please try again.', 500);
    }

    try {
      const response = await fetch('/tasks.json');
      if (!response.ok) {
        throw new ApiError(`Failed to load tasks: ${response.status} ${response.statusText}`, response.status);
      }
      
      const text = await response.text();
      if (!text.trim()) {
        throw new ApiError('Tasks data is empty', 500);
      }
      
      const data: TasksResponse = JSON.parse(text);
      if (!data.tasks || !Array.isArray(data.tasks)) {
        throw new ApiError('Invalid tasks data format', 500);
      }
      
      return data.tasks;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Failed to parse tasks data. Please check the JSON format.', 500);
    }
  },

  async updateTaskStatus(id: string, status: Status): Promise<Task> {
    await delay(600, 900);
    
    if (shouldFail()) {
      throw new ApiError('Failed to update task status. Please try again.', 500);
    }

    const tasks = await this.listTasks();
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
  
      console.warn(`Task ${id} not found in JSON file, creating minimal task structure`);
      
      // Return a minimal task structure for newly created tasks
      return {
        id,
        title: 'New Task',
        assignedTo: { id: CURRENT_USER_ID, name: 'Current User', avatar: '' },
        createdBy: { id: CURRENT_USER_ID, name: 'Current User', avatar: '' },
        tags: [],
        priority: 'medium',
        status,
        createdOn: new Date().toISOString(),
        dueOn: new Date().toISOString(),
        overdue: false,
        meta: {
          patientCode: 'PT-000',
          commentsCount: 0,
        },
      };
    }

    return {
      ...task,
      status,
    };
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    await delay(600, 900);
    
    if (shouldFail()) {
      throw new ApiError('Failed to create task. Please try again.', 500);
    }

    // Get all users from existing tasks to find the assigned user
    const tasks = await this.listTasks();
    const allUsers = [...new Map(
      tasks.flatMap(t => [t.assignedTo, t.createdBy])
        .map(user => [user.id, user])
    ).values()];
    
    const assignedUser = allUsers.find(u => u.id === data.assignedTo);
    const currentUser = allUsers.find(u => u.id === CURRENT_USER_ID);
    
    if (!assignedUser || !currentUser) {
      throw new ApiError('User not found', 404);
    }

    const newTask: Task = {
      id: `t${Date.now()}`,
      title: data.title,
      assignedTo: assignedUser,
      createdBy: currentUser,
      tags: data.tags,
      priority: data.priority,
      status: data.status,
      createdOn: new Date().toISOString(),
      dueOn: data.dueOn,
      overdue: new Date(data.dueOn) < new Date(),
      meta: {
        patientCode: `PT-${Math.floor(Math.random() * 100).toString().padStart(3, '0')}`,
        commentsCount: 0,
      },
    };

    return newTask;
  },
};
