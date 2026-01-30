import app from "./index";
import { serve } from "@hono/node-server";

serve({
  fetch: app.fetch,
  port: 4000,
});
