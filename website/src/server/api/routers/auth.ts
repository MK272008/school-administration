import jwt from "jsonwebtoken";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure
} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { createJWTForUser, Token } from "@/server/auth";

export const authRouter = createTRPCRouter({
    signup: publicProcedure
        .input(z.object({ name: z.string(), email: z.string(), password: z.string(), role: z.string(), username: z.string(), image: z.string() }))
        .mutation(async ({ input }) => {
            // Creating user in database
            let user = await prisma.user.create({
                data: input
            });

            const token = createJWTForUser(user);

            return { token }
        }),

        login: publicProcedure
            .input(z.object({ email: z.string(), password: z.string() }))
            .mutation(async ({ input }) => {
                let user = await prisma.user.findUnique({
                    where: {
                        email: input.email
                    }
                });
                
                if (user?.password == input.password) {
                    const token = createJWTForUser(user);
                    return { token }
                }
                else {
                    return null;
                }
            }),
        
        getUserByToken: protectedProcedure
            .query(async ({ ctx }) => {
                // let id: string|undefined;
                // jwt.verify(input.token, process.env.JWT_SECRET ?? "", {}, (err, decoded) => {
                //     id = (decoded as { user: Token }).user.id;
                // })
                // const user = await prisma.user.findUnique({
                //     where: {
                //         id
                //     },
                //     include: {
                //         School: true
                //     }
                // })
                return { user: ctx.user };
            })
});
