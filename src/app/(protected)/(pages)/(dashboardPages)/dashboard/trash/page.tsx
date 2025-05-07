import DeleteAllButton from "./_components/DeleteAllButton";

const Page = async () => {
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
        <DeleteAllButton Projects={[]} />
      </div>
    </div>
  );
};

export default Page;
