import { currentUser } from "@clerk/nextjs/server";
import { createTRPCRouter, protectedProcedure } from "../../lib/trpc";

export const userRouter = createTRPCRouter({
  authenticate: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await currentUser();
      if (!user) {
        return { status: 403 };
      }

      const userExist = await ctx.db.user.findUnique({
        where: {
          clerkId: user.id,
        },
        include: {
          PurchasedProjects: {
            select: {
              id: true,
            },
          },
        },
      });

      if (userExist) {
        return { status: 200, user: userExist };
      }

      const newUser = await ctx.db.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName} ${user.lastName}`,
          profileImage: user.imageUrl,
        },
      });

      if (newUser) {
        return { status: 201, user: newUser };
      }
    } catch (error) {
      console.error("Error", error);
      return { status: 500, error: "Internal Server Error" };
    }
  }),
});
