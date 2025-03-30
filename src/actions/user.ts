"use server";
import {
  createErrorResponse,
  createSuccessResponse,
  handleServerActionError,
} from "@/lib/apiUtils";
import { client } from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async (): Promise<ApiResponse> => {
  try {
    const user = await currentUser();
    if (!user) {
      return createErrorResponse("User not authenticated", 403);
    }

    const userExist = await client.user.findUnique({
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
      return createSuccessResponse({ user: userExist }, 200);
    }

    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
        profileImage: user.imageUrl,
      },
    });

    if (newUser) {
      return createSuccessResponse({ user: newUser }, 201);
    }

    return createErrorResponse("Failed to create or authenticate user", 500);
  } catch (error) {
    return handleServerActionError(error, "Authentication failed");
  }
};
