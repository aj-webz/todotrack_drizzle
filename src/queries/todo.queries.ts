import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKey } from "./querykey";

import type { CreateTodoInput, TodoStatus } from "@/store/todo/todo.types";

import {
  createTodo,
  readTodos,
  updateTodoStatus,
  deleteTodo,
} from "@/api/todo.api";


export function useTodoQuery() {
  return useQuery({
    queryKey: queryKey.all,
    queryFn: readTodos,
    staleTime: 1000 * 30, 
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTodoInput) => createTodo(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.all,
      });
    },
  });
}


export function useUpdateTodoStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: TodoStatus;
    }) => updateTodoStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.all,
      });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.all,
      });
    },
  });
}
