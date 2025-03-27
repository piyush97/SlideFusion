import { getAllProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";

const DashboardPage = async () => {
  const { data: projects } = await getAllProjects();

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

      {projects && projects.length > 0 ? (
        <Projects projects={projects} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default DashboardPage;
