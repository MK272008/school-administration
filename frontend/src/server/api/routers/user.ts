import { z } from "zod";
import { prisma } from "@/server/db";
import type { AdministratorProfile, TeacherProfile } from "@prisma/client";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({
            name: z.string(),
            email: z.string(),
            role: z.string(),
            username: z.string(),
            password: z.string(),
            image: z.string()
        }))
        .mutation(async ({ input }) => {
            let user = await prisma.user.create({
                data: {
                    name: input.email,
                    username: input.username,
                    email: input.email,
                    password: input.password,
                    image: input.image,
                    role: input.role
                }
            });
            return { user }
        }),

    getByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
        let user = await prisma.user.findUnique({
            where: {
                email: input.email
            }
        });

        return { user }
    }),
});
