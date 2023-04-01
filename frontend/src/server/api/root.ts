import { createTRPCRouter } from "@/server/api/trpc";
import { administratorRouter } from "./routers/administrator";
import { authRouter } from "./routers/auth";
import { parentRouter } from "./routers/parent";
import { schoolRouter } from "./routers/school";
import { studentRouter } from "./routers/student";
import { teacherRouter } from "./routers/teacher";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  school: schoolRouter,
  student: studentRouter,
  teacher: teacherRouter,
  administrator: administratorRouter,
  parent: parentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
