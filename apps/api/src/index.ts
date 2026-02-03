import { Hono } from "hono";
import { cors } from "hono/cors";
import { nanoid } from "nanoid";
import { serve } from "@hono/node-server";
import { z } from "zod";
import { eq } from "drizzle-orm";

import { TodoSchema, CreateTodoSchema } from "@repo/shared";
import { db, todos } from "@repo/db";
import { handle } from "hono/vercel";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

app.options("*", (c) => c.body(null, 204));


app.get("/", async (c) => {
  const rows = await db.select().from(todos);

  return c.json(
    rows.map((r) =>
      TodoSchema.parse({
        id: r.id,
        title: r.title,
        description: r.description,
        status: r.status,
        completed: r.completed,
      })
    ),
    200
  );
});


app.post("/", async (c) => {
  const input = CreateTodoSchema.parse(await c.req.json());

  const [row] = await db
    .insert(todos).values({
      id: nanoid(),
      title: input.title,
      description: input.description,
      status: "in-progress",
      completed: false,
    })
    .returning();

  return c.json(
    TodoSchema.parse({
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      completed: row.completed,
    }),
    201
  );
});


const UpdateStatusSchema = z.object({
  status: z.enum(["in-progress", "completed"]),
});

app.patch("/:id/status", async (c) => {
  const { id } = c.req.param();
  const { status } = UpdateStatusSchema.parse(await c.req.json());

  const [row] = await db
    .update(todos)
    .set({
      status,
      completed: status === "completed",
    })
    .where(eq(todos.id, id))
    .returning();

  if (!row) return c.json({ message: "Not found" }, 404);

  return c.json(
    TodoSchema.parse({
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      completed: row.completed,
    }),
    200
  );
});


app.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await db.delete(todos).where(eq(todos.id, id));
  return c.body(null, 204);
});

export default handle(app);
