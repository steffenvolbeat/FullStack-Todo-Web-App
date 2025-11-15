// types/todo.ts - TypeScript Types für Todo-Objekte
export interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateTodoData {
  title: string;
  description?: string;
}

export interface UpdateTodoData {
  title?: string;
  description?: string | null;
  completed?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

export interface TodoFormData {
  title: string;
  description: string;
}
