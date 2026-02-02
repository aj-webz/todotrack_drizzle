import { z } from "zod";

export const TodoStatusSchema = z.enum(["in-progress", "completed"]);
export type TodoStatus = z.infer<typeof TodoStatusSchema>;

export const CreateTodoSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title must be under 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200, "Description must be at most 200 characters."),
  endDate: z.date().nullable().default(null),
});

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status:  TodoStatusSchema,
  completed: z.boolean(),
  created: z.date(),
  endDate: z.date().nullable(),
}).refine(
  (data) => (data.status === "completed") === data.completed,
  {
    message: "completed status must match status",
    path: ["completed"],
  }
);
