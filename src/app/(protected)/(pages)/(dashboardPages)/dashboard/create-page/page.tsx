import { Suspense } from "react";
import CreatePageSkeleton from "./_components/CreatePageSkeleton";
import RenderPage from "./_components/RenderPage";

const Page = () => {
  return (
    <main className="w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
};

export default Page;
