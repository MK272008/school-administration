import { prisma } from "@/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const teacherInvitationRouter = createTRPCRouter({
    all: protectedProcedure
        .query(async ({ ctx }) => {
            return await prisma.teacherInvitation.findMany({
                where: {
                    receiver: {
                        teacherId: ctx.user.id
                    }
                }
            })
        }),
    getSchool: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await prisma.school.findUnique({
                where: {
                    id: input.id
                },
                select: {
                    administrator: {
                        select: {
                            school: true
                        }
                    }
                }
            })
        })
})