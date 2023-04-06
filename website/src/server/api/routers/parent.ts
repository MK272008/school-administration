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

        getStudentSchool: protectedProcedure    
            .query(async ({ ctx }) => {
                const student = await prisma.student.findFirst({
                    where: {
                        parent: {
                            parentId: ctx.user.id
                        }
                    }
                });
                return { student }
            })


    // addChild: protectedProcedure
    // .input(z.object({ name: z.string(), age: z.number() }))
    //     .mutation(async ({ ctx , input}) => {



    //         const student = await prisma.student.create({
    //             data: {
    //                 name: input.name,
    //                 age: input.age,
    //                 parent: {
    //                     connect: {
    //                         parentId: ctx.user.id
    //                     }
    //                 }
    //             }
    //         });
    //         return { student };
    //     })
})