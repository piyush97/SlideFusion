import { createTRPCRouter } from "../lib/trpc";
import { lemonSqueezyRouter } from "./routers/lemonSqueezy";
import { openaiRouter } from "./routers/openai";
import { projectRouter } from "./routers/project";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  user: userRouter,
  project: projectRouter,
  openai: openaiRouter,
  lemonSqueezy: lemonSqueezyRouter,
});

export type AppRouter = typeof appRouter;
