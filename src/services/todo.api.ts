import type {
  Todo,
  CreateTodoInput,
  TodoStatus,
} from "@/store/todo/todo.types";


const baseUrl = "https://backend-ten-zeta-54.vercel.app";


export async function readTodos(): Promise<Todo[]> {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}

export async function createTodo(
  input: CreateTodoInput
): Promise<Todo> {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }

  return res.json();
}


export async function updateTodoStatus(
  id: string,
  status: TodoStatus
): Promise<Todo> {
  const res = await fetch(`${baseUrl}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update todo status");
  }

  return res.json();
}


export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
}
