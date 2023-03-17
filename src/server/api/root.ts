import { createTRPCRouter } from "~/server/api/trpc";
import { tokenRouter } from "~/server/api/routers/token";
import { userRouter } from "./routers/user";
import { dashboardRouter } from "./routers/dashboard";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  token: tokenRouter,
  user: userRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
