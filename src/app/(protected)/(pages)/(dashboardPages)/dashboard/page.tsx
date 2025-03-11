import { getAllProjects } from "@/actions/project";

const DashboardPage = async () => {
  const allProjects = await getAllProjects();
  return (
    <div className="w-full flex flex-col gap-6 relative">
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
      {allProjects.data?.map((project) => (
        <div key={project.id} className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold dark:text-primary">
            {project.title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
