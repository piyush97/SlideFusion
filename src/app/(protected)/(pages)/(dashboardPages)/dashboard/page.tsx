"use client";

import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";
import { api } from "@/lib/api";

const DashboardPage = () => {
  const { data: projects, isLoading, error } = api.project.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="relative flex flex-col w-full gap-6 p-4 md:p-0">
        <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col item-start">
            <h1 className="text-4xl font-semibold dark:text-primary backdrop-blur-lg">
              Projects
            </h1>
            <p className="text-lg font-normal dark:text-secondary">
              All of your work in one place
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex flex-col w-full gap-6 p-4 md:p-0">
        <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col item-start">
            <h1 className="text-4xl font-semibold dark:text-primary backdrop-blur-lg">
              Projects
            </h1>
            <p className="text-lg font-normal dark:text-secondary">
              All of your work in one place
            </p>
          </div>
        </div>
        <div className="text-center p-8 text-red-500">
          Error loading projects: {error.message}
        </div>
      </div>
    );
  }

  const projectsData = projects?.status === 200 ? projects.data : [];

  return (
    <div className="relative flex flex-col w-full gap-6 p-4 md:p-0">
      <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col item-start">
          <h1 className="text-4xl font-semibold dark:text-primary backdrop-blur-lg">
            Projects
          </h1>
          <p className="text-lg font-normal dark:text-secondary">
            All of your work in one place
          </p>
        </div>
      </div>

      {projectsData && projectsData.length > 0 ? (
        <Projects projects={projectsData} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default DashboardPage;
