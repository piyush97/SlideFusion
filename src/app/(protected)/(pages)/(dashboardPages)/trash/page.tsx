"use client";

import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";
import { api } from "@/lib/api";
import DeleteAllButton from "./_components/DeleteAllButton";

const Page = () => {
  const {
    data: deletedProjects,
    isLoading,
    error,
  } = api.project.getDeleted.useQuery();

  if (isLoading) {
    return (
      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
              Trash
            </h1>
            <p className="text-base font-normal dark:text-secondary">
              All your deleted presentations
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
              Trash
            </h1>
            <p className="text-base font-normal dark:text-secondary">
              All your deleted presentations
            </p>
          </div>
        </div>
        <div className="text-center p-8 text-red-500">
          Error loading deleted projects: {error.message}
        </div>
      </div>
    );
  }

  if (
    !deletedProjects ||
    deletedProjects.status !== 200 ||
    !deletedProjects.data
  )
    return <NotFound />;

  const projects = deletedProjects.data;

  return (
    <div className="relative flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Trash
          </h1>
          <p className="text-base font-normal dark:text-secondary">
            All your deleted presentations
          </p>
        </div>
        <DeleteAllButton Projects={projects} />
      </div>
      {projects.length > 0 ? <Projects projects={projects} /> : <NotFound />}
    </div>
  );
};

export default Page;
