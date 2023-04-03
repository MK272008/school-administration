import { prisma } from "@/server/db";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({
    all: protectedProcedure
        .query(async ({ ctx }) => {
            let students = await prisma.student.findMany({
                where: {
                    school: {
                        administratorId: ctx.user.id
                    }
                },
                include: {
                    parent: {
                        include: {
                            parent: true
                        }
                    },
                }
            });
            return { students }
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            let student = await prisma.student.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    parent: {
                        include: {
                            parent: true
                        }
                    },
                    class: true
                }
            });

            return { student }
        }),

    // create: protectedProcedure
    //     .input(z.object({
    //         name: z.string(),
    //         age: z.number(),
    //         parent: z.string(),
    //         section: z.string(),
    //         standard: z.number(),
    //     }))
    //     .mutation(async ({ input, ctx }) => {
    //         console.log(input);

    //         const { name, age, parent } = input;

    //         // fetching the currently logged in users administrator profile
    //         const admin = await prisma.administratorProfile.findFirst({
    //             where: {
    //                 administrator: {
    //                     id: ctx.user.id
    //                 }
    //             }
    //         });
            
    //         if (!admin) return;

    //         let student = await prisma.student.create({
    //             data: {
    //                 name, 
    //                 age, 
    //                 parent: {
    //                     connect: {
    //                         parentId: 
    //                     }
    //                 },
    //                 school: {
    //                     connect: {
    //                         administratorId: admin.id
    //                     }
    //                 },
    //                 class: {
    //                     connectOrCreate: {
    //                         create: {
    //                              name: input.standard + "-" +  input.section
    //                         },
    //                         where: {
    //                             name: input.standard + "-" +  input.section
    //                         }
    //                     }
    //                 }
    //             }
    //         });

    //         return { student };
    //     }),

    update: protectedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string(),
            age: z.number(),
            parent: z.string(),
            section: z.string(),
            standard: z.number(),
        }))
        .mutation(async ({ input, ctx }) => {
            console.log(input)
            let student = await prisma.student.update({
                where: {
                    id: input.id
                },
                data: {
                    ...input,
                    parent: undefined
                }
            })
            return { student }
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            await prisma.student.delete({
                where: {
                    id: input.id,
                }
            });
            return true;
        })

})