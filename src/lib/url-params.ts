import { TaskFilters } from '@/types/task';

export const serializeFilters = (filters: TaskFilters): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (filters.search) params.set('search', filters.search);
  if (filters.filter !== 'all') params.set('filter', filters.filter);
  if (filters.sortBy !== 'createdOn') params.set('sortBy', filters.sortBy);
  if (filters.sortOrder !== 'desc') params.set('sortOrder', filters.sortOrder);
  
  return params;
};

export const deserializeFilters = (searchParams: URLSearchParams): Partial<TaskFilters> => {
  const filters: Partial<TaskFilters> = {};
  
  const search = searchParams.get('search');
  if (search) filters.search = search;
  
  const filter = searchParams.get('filter');
  if (filter && ['all', 'assigned_to_me', 'created_by_me'].includes(filter)) {
    filters.filter = filter as TaskFilters['filter'];
  }
  
  const sortBy = searchParams.get('sortBy');
  if (sortBy && ['createdOn', 'dueOn', 'priority'].includes(sortBy)) {
    filters.sortBy = sortBy as TaskFilters['sortBy'];
  }
  
  const sortOrder = searchParams.get('sortOrder');
  if (sortOrder && ['asc', 'desc'].includes(sortOrder)) {
    filters.sortOrder = sortOrder as TaskFilters['sortOrder'];
  }
  
  return filters;
};

export const updateURL = (filters: TaskFilters) => {
  const params = serializeFilters(filters);
  const url = new URL(window.location.href);
  url.search = params.toString();
  window.history.replaceState({}, '', url.toString());
};

