import { Suspense } from "react";
import CreatePageSkeleton from "./_components/CreatePageSkeleton";

const Page = () => {
  return (
    <main className="w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}></Suspense>
    </main>
  );
};

export default Page;
