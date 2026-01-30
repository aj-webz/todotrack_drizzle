import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { TodoStore } from "./todo.types";



export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      error: null,
      addTodo: (input) => {
        if (!input.title.trim()) {
          set({ error: "Title cannot be empty" });
          return;
        }

        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: nanoid(),
              title: input.title.trim(),
              description: input.description.trim(),
              status: "in-progress",
              completed: false,
              created: new Date(),
              endDate: input.endDate ?? null,
            },
          ],
          error: null,
        }));
      },
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                ...todo,
                completed: !todo.completed,
                status: todo.completed
                  ? "in-progress"
                  : "completed",
              }
              : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),


      clearError: () => set({ error: null }),

      updateTodoStatus: (id, status) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                ...todo,
                status,
                completed: status === "completed",
              }
              : todo
          ),
        })),


    }),
    {
      name: "work-tracker-store",
      partialize: (state) => ({
        todos: state.todos,
      }),
    }
  )
);
