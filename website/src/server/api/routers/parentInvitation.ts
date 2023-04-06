import { prisma } from "@/server/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const parentInvitationRouter = createTRPCRouter({
    all: protectedProcedure
        .query(async ({ ctx }) => {
            let parentInvitations = await prisma.parentInvitation.findMany({
                where: {
                    // receiverId is the id of parent profile
                    receiver: {
                        parentId: ctx.user.id
                    }
                }
            });
            return parentInvitations
        }),

    create: protectedProcedure
        .input(z.object({ parentEmail: z.string(), studentId: z.string() }))
        .mutation(async ({ input, ctx }) => {

            // this invitation could only be made by an administrator
            const adminProfile = await prisma.administratorProfile.findUnique({
                where: {
                    administratorId: ctx.user.id
                },
                include: {
                    school: true
                }
            });

            // getting the parent
            const parentProfile = await prisma.parentProfile.findFirst({
                where: {
                    parent: {
                        email: input.parentEmail
                    }
                }
            });

            let inv = await prisma.parentInvitation.create({
                data: {
                    title: `You have been invited to join ${adminProfile?.school.name}!`,
                    student: {
                        connect: {
                            id: input.studentId
                        }
                    },
                    receiver: {
                        connect: {
                            id: parentProfile?.id
                        }
                    },
                    sender: {
                        connect: {
                            id: adminProfile?.id
                        }
                    }
                }
            });

            return { invitation: inv }
        }),

    accept: protectedProcedure
        .input(z.object({ invitationID: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const inv = await prisma.parentInvitation.findUnique({
                where: {
                    id: input.invitationID
                }
            });

            if (!inv) return;

            const student = await prisma.student.update({
                where: {
                    id: inv.studentId
                },
                data: {
                    parent: {
                        connect: {
                            parentId: ctx.user.id
                        }
                    }
                }
            })
            return { student };
        }),

    getSchoolFromInvitation: protectedProcedure 
        .input(z.object({ invitationID: z.string() }))
        .query(async ({ ctx, input }) => {
            const school = await prisma.parentInvitation.findUnique({
                where: {
                    id: input.invitationID
                },
                select: {
                    sender: {
                        select: {
                            school: true
                        }
                    }
                }
            })
            return { school }
        })
})