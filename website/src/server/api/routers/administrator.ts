import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/db";


export const administratorRouter = createTRPCRouter({

    create: protectedProcedure 
        .input(z.object({ schoolID: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const administratorProfile = await prisma.administratorProfile.create({
                data: {
                    administrator: {
                        connect: {
                            id: ctx.user.id
                        }
                    },
                    school: {
                        connect: {
                            id: input.schoolID
                        }
                    }
                }
            });
            return { administratorProfile };
        }),

    getByUser: protectedProcedure
        .query(async ({ ctx }) => {
            console.log(ctx.user.id)
            let administratorProfile = await prisma.administratorProfile.findFirst({
                where: {
                    administrator: {
                        id: ctx.user.id
                    }
                },
                include: {
                    school: true
                }
            });

            

            return { administratorProfile };
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await prisma.administratorProfile.findUnique({
                where: {
                    id: input.id
                },
                include: {
                    administrator: true
                }
            })
        })
})