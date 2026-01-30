import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { todos } from "../store/todo.store.js";
import { inputTodoSchema, PatchTodoSchema } from "../schema/todo.schema.js";
import type { Todo } from "../types/todo.types.js";

const routes = new Hono();


routes.get("/", (c) => c.json(todos));


routes.post("/", zValidator("json", inputTodoSchema), (c) => {
  const data = c.req.valid("json");
  
  const todo: Todo = {
    id: crypto.randomUUID(), 
    ...data,
    status: "in-progress",
    completed: false,
    created: new Date().toISOString(),
  };

  todos.push(todo);
  return c.json(todo, 201);
});


routes.patch("/:id/status", zValidator("json", PatchTodoSchema), (c) => {
  const { id } = c.req.param();
  const { status } = c.req.valid("json");

  const todo = todos.find((t) => t.id === id);
  if (!todo) return c.json({ message: "Todo not found" }, 404);

  todo.status = status;
  todo.completed = status === "completed";

  return c.json(todo);
});

routes.delete("/:id", (c) => {
  const { id } = c.req.param();
  const index = todos.findIndex((t) => t.id === id);
  
  if (index === -1) return c.json({ message: "Todo not found" }, 404);

  todos.splice(index, 1);
  return c.body(null, 204); 
});

export default routes;
