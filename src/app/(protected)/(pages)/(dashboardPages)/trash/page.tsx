import { getDeletedProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects";
import DeleteAllButton from "./_components/DeleteAllButton";

export const dynamic = "force-dynamic";

const Page = async () => {
  const deletedProjects = await getDeletedProjects();
  if (!deletedProjects.data) return <NotFound />;
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
        <DeleteAllButton Projects={deletedProjects?.data} />
      </div>
      {deletedProjects?.data.length > 0 ? (
        <Projects projects={deletedProjects.data} />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Page;
