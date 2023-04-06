import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/db";

export const teacherRouter = createTRPCRouter({
    all: protectedProcedure
        .query(async ({ ctx }) => {

            // fetching the administrator profile of the logged in user

            const admin = await prisma.administratorProfile.findUnique({
                where: {
                    id: ctx.user.id
                }
            });
            if (!admin) return { teacherProfiles: [] };

            const teacherProfiles = await prisma.teacherProfile.findMany({
                where: {
                    schoolId: admin.id
                },
                include: {
                    teacher: true
                }
            });
            return { teacherProfiles }
        }),

    invite: protectedProcedure
        .input(z.object({ email: z.string() }))
        .mutation(async ({ input }) => {

            return true
        }),

    remove: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            await prisma.teacherProfile.update({
                where: {
                    id: input.id
                },
                data: {
                    school: undefined
                }
            });

            return true
        }),

    getByEmail: protectedProcedure
        .input(z.object({ email: z.string() }))
        .query(async ({ ctx, input }) => {
            let teacherProfile = await prisma.teacherProfile.findFirst({
                where: {
                    teacher: {
                        email: input.email
                    }
                }
            });

            return { teacherProfile };
        }),

    joinSchool: protectedProcedure
        .input(z.object({ schoolID: z.string() }))
        .mutation(async ({ input, ctx }) => {
            let teacherProfile = await prisma.teacherProfile.update({
                where: {
                    teacherId: ctx.user.id
                },
                data: {
                    school: {
                        connect: {
                            id: input.schoolID
                        }
                    }
                }
            });

            return { teacherProfile };
        }),

    getProfile: protectedProcedure
        .query(async ({ ctx }) => {
            let teacherProfile = await prisma.teacherProfile.findUnique({
                where: {
                    teacherId: ctx.user.id
                },
                include: {
                    school: true
                }
            });

            return { teacherProfile }
        }),

    setSubject: protectedProcedure
        .input(z.object({ subject: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const profile = await prisma.teacherProfile.create({
                data: {
                    teacher: {
                        connect: {
                            id: ctx.user.id,
                        }
                    },
                    subject: input.subject
                }
            });
            return { teacherProfile: profile }
        }),

    inviteStudent: protectedProcedure
        .input(z.object({ teacherID: z.string() }))
        .mutation(async ({ input, ctx }) => {

            const schoolAdmin = await prisma.administratorProfile.findUnique({
                where: {
                    administratorId: ctx.user.id
                },
                include: {
                    school: true
                }
            })

            const teacherInvitation = await prisma.teacherInvitation.create({
                data: {
                    title: `You have been invited to teach in ${schoolAdmin?.school.name}`,
                    receiver: {
                        connect: {
                            id: input.teacherID
                        }
                    },
                    sender: {
                        connect: {
                            id: schoolAdmin?.id
                        }
                    }
                }
            })
        })
})