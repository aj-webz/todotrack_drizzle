import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "./querykey";

import type { Todo, CreateTodoInput, TodoStatus } from "@repo/shared";
import {
  readTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
} from "@/services/todo.api";


export function useTodoQuery() {
  return useQuery<Todo[]>({
    queryKey: queryKey.all,
    queryFn: readTodos,
    staleTime: 1000 * 60, 
  });
}



export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,

    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(queryKey.all, (old = []) => [
        newTodo,
        ...old,
      ]);
    },
  });
}


export function useUpdateTodoStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TodoStatus }) =>
      updateTodoStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: queryKey.all });

      const previous = queryClient.getQueryData<Todo[]>(queryKey.all);

      queryClient.setQueryData<Todo[]>(queryKey.all, (old = []) =>
        old.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                status,
                completed: status === "completed",
              }
            : todo
        )
      );

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(queryKey.all, ctx.previous);
      }
    },

    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(queryKey.all, (old = []) =>
        old.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );
    },
  });
}


export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKey.all });

      const previous = queryClient.getQueryData<Todo[]>(queryKey.all);

      queryClient.setQueryData<Todo[]>(queryKey.all, (old = []) =>
        old.filter((t) => t.id !== id)
      );

      return { previous };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(queryKey.all, ctx.previous);
      }
    },
  });
}
