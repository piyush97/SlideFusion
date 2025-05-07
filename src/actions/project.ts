"use server";

import { client } from "@/lib/prisma";
import { OutlineCard } from "@/lib/types";
import { JsonValue } from "@prisma/client/runtime/library";
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

export const createProject = async (title: string, outlines: OutlineCard[]) => {
  try {
    if (!title || !outlines || outlines.length === 0)
      return { status: 400, error: "Titles and Outlines are required" };

    const allOutlines = outlines.map((outline) => outline.title);

    const user = await onAuthenticateUser();

    if (!user || user.status !== 200 || !user.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const project = await client?.project.create({
      data: {
        title,
        outlines: allOutlines,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.user.id,
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
};

export const getProjectById = async (projectId: string) => {
  try {
    const user = await onAuthenticateUser();

    if (!user || user.status !== 200 || !user.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const project = await client?.project.findUnique({
      where: {
        id: projectId,
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

export const updateSlides = async (projectId: string, slides: JsonValue) => {
  try {
    if (!projectId || !slides) {
      return { status: 400, error: "Project ID and slides are required" };
    }

    const updatedProject = await client?.project.update({
      where: {
        id: projectId,
      },
      data: {
        slides: slides,
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
};

export const updateTheme = async (projectId: string, theme: string) => {
  try {
    if (!projectId || !theme) {
      return { status: 400, error: "Project ID and theme are required" };
    }

    const updatedProject = await client?.project.update({
      where: {
        id: projectId,
      },
      data: {
        themeName: theme,
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
};

export const deleteAllProjects = async (projectsIds: string[]) => {
  try {
    if (!projectsIds || projectsIds.length === 0) {
      return { status: 400, error: "Project IDs are required" };
    }

    const user = await onAuthenticateUser();

    if (!user || user.status !== 200 || !user.user) {
      return { status: 403, error: "User Not Authenticated" };
    }

    const deletedProjects = await client?.project.deleteMany({
      where: {
        id: { in: projectsIds },
        userId: user.user.id,
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
};
