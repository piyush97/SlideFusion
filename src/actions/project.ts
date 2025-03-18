"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();

    if (!checkUser || checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const projects = await client?.project.findMany({
      where: {
        userId: checkUser.user.id,
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
};

export const getRecentProjects = async () => {
  try {
    const user = await onAuthenticateUser();

    if (!user || user.status !== 200 || !user.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const projects = await client?.project.findMany({
      where: {
        userId: user.user.id,
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
};

export const recoverProject = async (projectId: string) => {
  try {
    const user = await onAuthenticateUser();

    if (!user || user.status !== 200 || !user.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const project = await client?.project.update({
      where: {
        id: projectId,
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
};

export const deleteProject = async (projectId: string) => {
  try {
    const user = await onAuthenticateUser();

    if (!user || user.status !== 200 || !user.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const project = await client?.project.update({
      where: {
        id: projectId,
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
};
