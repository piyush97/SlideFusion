import { currentUser } from "@clerk/nextjs/server";
import type { InputJsonValue } from "@prisma/client/runtime/library";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../lib/trpc";

const outlineCardSchema = z.object({
  title: z.string(),
  id: z.string(),
  order: z.number(),
});

export const projectRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await currentUser();

      if (!user) {
        return { status: 403, error: "User Not Authenticated" };
      }

      const userExist = await ctx.db.user.findUnique({
        where: { clerkId: user.id },
      });

      if (!userExist) {
        return { status: 403, error: "User Not Found" };
      }

      const projects = await ctx.db.project.findMany({
        where: {
          userId: userExist.id,
          isDeleted: false,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      if (projects?.length === 0) {
        return { status: 404, error: "No Projects Found" };
      }

      return { status: 200, data: projects };
    } catch (error) {
      console.error("Error", error);
      return { status: 500, error: "Internal Server Error" };
    }
  }),

  getRecent: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await currentUser();

      if (!user) {
        return { status: 403, error: "User Not Authenticated" };
      }

      const userExist = await ctx.db.user.findUnique({
        where: { clerkId: user.id },
      });

      if (!userExist) {
        return { status: 403, error: "User Not Found" };
      }

      const projects = await ctx.db.project.findMany({
        where: {
          userId: userExist.id,
          isDeleted: false,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 5,
      });

      if (projects?.length === 0) {
        return { status: 404, error: "No Projects Found" };
      }

      return { status: 200, data: projects };
    } catch (error) {
      console.error("Error", error);
      return { status: 500, error: "Internal Server Error" };
    }
  }),

  getById: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const user = await currentUser();

        if (!user) {
          return { status: 403, error: "User Not Authenticated" };
        }

        const userExist = await ctx.db.user.findUnique({
          where: { clerkId: user.id },
        });

        if (!userExist) {
          return { status: 403, error: "User Not Found" };
        }

        const project = await ctx.db.project.findUnique({
          where: {
            id: input.projectId,
          },
        });

        if (!project) {
          return { status: 404, error: "Project Not Found" };
        }

        return { status: 200, data: project };
      } catch (error) {
        console.error("Error", error);
        return { status: 500, error: "Internal Server Error" };
      }
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        outlines: z.array(outlineCardSchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.title || !input.outlines || input.outlines.length === 0) {
          return { status: 400, error: "Titles and Outlines are required" };
        }

        const allOutlines = input.outlines.map((outline) => outline.title);

        const user = await currentUser();

        if (!user) {
          return { status: 403, error: "User Not Authenticated" };
        }

        const userExist = await ctx.db.user.findUnique({
          where: { clerkId: user.id },
        });

        if (!userExist) {
          return { status: 403, error: "User Not Found" };
        }

        const project = await ctx.db.project.create({
          data: {
            title: input.title,
            outlines: allOutlines,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: userExist.id,
            isDeleted: false,
          },
        });

        if (!project) {
          return { status: 500, error: "Failed to create project" };
        }

        return { status: 200, data: project };
      } catch (error) {
        console.error("Error", error);
        return { status: 500, error: "Internal Server Error" };
      }
    }),

  updateSlides: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        slides: z.any(), // JsonValue from Prisma
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.projectId || !input.slides) {
          return { status: 400, error: "Project ID and slides are required" };
        }

        const updatedProject = await ctx.db.project.update({
          where: {
            id: input.projectId,
          },
          data: {
            slides: input.slides as InputJsonValue,
          },
        });

        if (!updatedProject) {
          return { status: 404, error: "Project Not Found" };
        }
        return { status: 200, data: updatedProject };
      } catch (error) {
        console.error("Error", error);
        return { status: 500, error: "Internal Server Error" };
      }
    }),

  updateTheme: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        theme: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.projectId || !input.theme) {
          return { status: 400, error: "Project ID and theme are required" };
        }

        const updatedProject = await ctx.db.project.update({
          where: {
            id: input.projectId,
          },
          data: {
            themeName: input.theme,
          },
        });

        if (!updatedProject) {
          return { status: 404, error: "Project Not Found" };
        }
        return { status: 200, data: updatedProject };
      } catch (error) {
        console.error("Error", error);
        return { status: 500, error: "Internal Server Error" };
      }
    }),

  delete: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await currentUser();

        if (!user) {
          return { status: 403, error: "User Not Authenticated" };
        }

        const userExist = await ctx.db.user.findUnique({
          where: { clerkId: user.id },
        });

        if (!userExist) {
          return { status: 403, error: "User Not Found" };
        }

        const project = await ctx.db.project.update({
          where: {
            id: input.projectId,
          },
          data: {
            isDeleted: true,
          },
        });

        if (!project) {
          return { status: 404, error: "Project Not Found" };
        }

        return { status: 200, data: project };
      } catch (error) {
        console.error("Error", error);
        return { status: 500, error: "Internal Server Error" };
      }
    }),

  recover: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await currentUser();

        if (!user) {
          return { status: 403, error: "User Not Authenticated" };
        }

        const userExist = await ctx.db.user.findUnique({
          where: { clerkId: user.id },
        });

        if (!userExist) {
          return { status: 403, error: "User Not Found" };
        }

        const project = await ctx.db.project.update({
          where: {
            id: input.projectId,
          },
          data: {
            isDeleted: false,
          },
        });

        if (!project) {
          return { status: 404, error: "Project Not Found" };
        }

        return { status: 200, data: project };
      } catch (error) {
        console.error("Error", error);
        return { status: 500, error: "Internal Server Error" };
      }
    }),

  deleteMany: protectedProcedure
    .input(z.object({ projectIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.projectIds || input.projectIds.length === 0) {
          return { status: 400, error: "Project IDs are required" };
        }

        const user = await currentUser();

        if (!user) {
          return { status: 403, error: "User Not Authenticated" };
        }

        const userExist = await ctx.db.user.findUnique({
          where: { clerkId: user.id },
        });

        if (!userExist) {
          return { status: 403, error: "User Not Found" };
        }

        const deletedProjects = await ctx.db.project.deleteMany({
          where: {
            id: { in: input.projectIds },
            userId: userExist.id,
          },
        });

        if (!deletedProjects) {
          return { status: 404, error: "Projects Not Found" };
        }
        return { status: 200, data: deletedProjects };
      } catch (error) {
        console.error("Error", error);
        return { status: 500, error: "Internal Server Error" };
      }
    }),

  getDeleted: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await currentUser();

      if (!user) {
        return { status: 403, error: "User Not Authenticated" };
      }

      const userExist = await ctx.db.user.findUnique({
        where: { clerkId: user.id },
      });

      if (!userExist) {
        return { status: 403, error: "User Not Found" };
      }

      const deletedProjects = await ctx.db.project.findMany({
        where: {
          userId: userExist.id,
          isDeleted: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      if (deletedProjects?.length === 0) {
        return { status: 404, error: "No Deleted Projects Found" };
      }

      return { status: 200, data: deletedProjects };
    } catch (error) {
      console.error("Error", error);
      return { status: 500, error: "Internal Server Error" };
    }
  }),
});
