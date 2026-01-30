export type TodoStatus = "in-progress" | "completed" | "undefined";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  completed: boolean;
  created: string;       
  endDate: string | null;
}
