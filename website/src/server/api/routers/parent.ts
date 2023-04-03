import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/db";

export const parentRouter = createTRPCRouter({
    create: protectedProcedure
        .mutation(async ({ ctx }) => {
            let parentProfile = await prisma.parentProfile.create({
                data: {
                    parent: {
                        connect: {
                            id: ctx.user.id
                        }
                    }
                }
            });
            return { parentProfile };
        }),

    addChild: protectedProcedure
    .input(z.object({ name: z.string(), age: z.number(), standard: z.string(), section: z.string() }))
        .mutation(async ({ ctx , input}) => {
            let student = await prisma.student.create({
                data: {
                    name: input.name,
                    age: input.age,
                    parent: {
                        connect: {
                            parentId: ctx.user.id
                        }
                    },
                    class: {
                        connectOrCreate: {
                            create: {
                                name: `${input.standard}-${input.section}`
                            },
                            where: {
                                name: `${input.standard}-${input.section}`
                            }
                        }
                    },
                    school: {
                        
                    }
                }
            });
            return { student };
        })
})