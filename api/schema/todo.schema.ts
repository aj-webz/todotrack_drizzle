import { z } from "zod"

export const TodoStatusSchema = z.enum(["in-progress", "completed"]);

export const inputTodoSchema = z.object({
    title: z.string().trim().min(3, "atleast 3 values must be involved").max(100),
    description: z.string().min(3, "Atleast enter three abbrs").max(200),
    endDate: z.string().nullable(),
})

export const PatchTodoSchema = z.object({
    title: z.string().trim().min(3).max(100).optional(),
    description: z.string().min(10).max(200).optional(),
    status: TodoStatusSchema,
    completed: z.boolean().optional(),
    endDate: z.coerce.date().nullable().optional(),
}).refine(
    (data) => {
        if (data.status === undefined || data.completed === undefined) {
            return true;
        }
        return (data.status === "completed") === data.completed;
    },
    {
        message: "completed must match status",
    }
);
