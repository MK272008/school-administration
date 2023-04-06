import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const schoolRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
        console.log(ctx.user.name)
        let school = await prisma.school.create({
            data: {
                name: input.name,
            }
        });
        return { school }
    }),

    connectAdministrator: protectedProcedure
    .input(z.object({ schoolID: z.string() }))
      .mutation(async ({ input, ctx }) => {
        let profile = await prisma.administratorProfile.findFirst({
          where: {
            administrator: {
              id: ctx.user.id
            }
          }
        })
        let school = await prisma.school.update({
          where: {
            id: input.schoolID
          },
          data: {
            administratorId: ctx.user.id,
            administrator: {
              connect: {
                id: profile?.id
              }
            }
          }
        });

        return { school };
      }),

    getByOwner: protectedProcedure
      .query(async ({ ctx }) => {
        const profile = await prisma.administratorProfile.findUnique({
          where: {
            administratorId: ctx.user.id
          }
        });
        console.log(profile)
        const school = await prisma.school.findUnique({
          where: {
            id: profile?.schoolId
          }
        })

        return { school };
      })
});