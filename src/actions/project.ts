"use server";

import {
  createErrorResponse,
  createSuccessResponse,
  handleServerActionError,
} from "@/lib/apiUtils";
import { client } from "@/lib/prisma";
import { ApiResponse, OutlineCard } from "@/lib/types";
import { onAuthenticateUser } from "./user";

export const getAllProjects = async (): Promise<ApiResponse> => {
  try {
    const checkUser = await onAuthenticateUser();

    if (!checkUser || checkUser.status !== 200 || !checkUser.data?.user) {
      return createErrorResponse("User not authenticated", 403);
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.data.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return createErrorResponse("No projects found", 404);
    }

    return createSuccessResponse(projects);
  } catch (error) {
    return handleServerActionError(error, "Failed to fetch projects");
  }
};

export const getRecentProjects = async (): Promise<ApiResponse> => {
  try {
    const userResponse = await onAuthenticateUser();

    if (
      !userResponse ||
      userResponse.status !== 200 ||
      !userResponse.data?.user
    ) {
      return createErrorResponse("User not authenticated", 403);
    }

    const projects = await client.project.findMany({
      where: {
        userId: userResponse.data.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 5,
    });

    if (projects.length === 0) {
      return createErrorResponse("No projects found", 404);
    }

    return createSuccessResponse(projects);
  } catch (error) {
    return handleServerActionError(error, "Failed to fetch recent projects");
  }
};

export const recoverProject = async (
  projectId: string
): Promise<ApiResponse> => {
  try {
    if (!projectId) {
      return createErrorResponse("Project ID is required", 400);
    }

    const userResponse = await onAuthenticateUser();

    if (
      !userResponse ||
      userResponse.status !== 200 ||
      !userResponse.data?.user
    ) {
      return createErrorResponse("User not authenticated", 403);
    }

    const project = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: false,
      },
    });

    if (!project) {
      return createErrorResponse("Project not found", 404);
    }

    return createSuccessResponse(project);
  } catch (error) {
    return handleServerActionError(error, "Failed to recover project");
  }
};

export const deleteProject = async (
  projectId: string
): Promise<ApiResponse> => {
  try {
    if (!projectId) {
      return createErrorResponse("Project ID is required", 400);
    }

    const userResponse = await onAuthenticateUser();

    if (
      !userResponse ||
      userResponse.status !== 200 ||
      !userResponse.data?.user
    ) {
      return createErrorResponse("User not authenticated", 403);
    }

    const project = await client.project.update({
      where: {
        id: projectId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!project) {
      return createErrorResponse("Project not found", 404);
    }

    return createSuccessResponse(project);
  } catch (error) {
    return handleServerActionError(error, "Failed to delete project");
  }
};

export const createProject = async (
  title: string,
  outlines: OutlineCard[]
): Promise<ApiResponse> => {
  try {
    if (!title || !outlines || outlines.length === 0) {
      return createErrorResponse("Title and outlines are required", 400);
    }

    const allOutlines = outlines.map((outline) => outline.title);

    const userResponse = await onAuthenticateUser();

    if (
      !userResponse ||
      userResponse.status !== 200 ||
      !userResponse.data?.user
    ) {
      return createErrorResponse("User not authenticated", 403);
    }

    const project = await client.project.create({
      data: {
        title,
        outlines: allOutlines,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: userResponse.data.user.id,
        isDeleted: false,
      },
    });

    if (!project) {
      return createErrorResponse("Failed to create project", 500);
    }

    return createSuccessResponse(project);
  } catch (error) {
    return handleServerActionError(error, "Failed to create project");
  }
};

export const getProjectById = async (
  projectId: string
): Promise<ApiResponse> => {
  try {
    if (!projectId) {
      return createErrorResponse("Project ID is required", 400);
    }

    const userResponse = await onAuthenticateUser();

    if (
      !userResponse ||
      userResponse.status !== 200 ||
      !userResponse.data?.user
    ) {
      return createErrorResponse("User not authenticated", 403);
    }

    const project = await client.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return createErrorResponse("Project not found", 404);
    }

    return createSuccessResponse(project);
  } catch (error) {
    return handleServerActionError(error, "Failed to fetch project");
  }
};
