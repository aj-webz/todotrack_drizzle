export type TodoStatus = "in-progress" | "completed";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  completed: boolean;
  created: Date;
  endDate: Date | null |string;
}

export interface CreateTodoInput {
  title: string;
  description: string;
  endDate: Date | null;
}

export interface TodoStore {
  todos: Todo[];
  error: string | null;
  addTodo: (input: CreateTodoInput) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearError: () => void;
  updateTodoStatus:(id :string, status :TodoStatus) =>void;
}
