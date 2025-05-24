"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CreatePageSkeleton from "./_components/CreatePageSkeleton";
import RenderPage from "./_components/RenderPage";

const Page = () => {
  const router = useRouter();
  const { data: checkUser, isLoading } = api.user.authenticate.useQuery();

  useEffect(() => {
    if (isLoading) return;

    if (!checkUser?.user) {
      router.push("/sign-in");
      return;
    }

    if (!checkUser?.user?.subscription) {
      router.push("/dashboard");
      return;
    }
  }, [checkUser, isLoading, router]);

  if (isLoading) {
    return <CreatePageSkeleton />;
  }

  if (!checkUser?.user || !checkUser?.user?.subscription) {
    return null;
  }

  return (
    <main className="w-full h-full pt-6">
      <RenderPage />
    </main>
  );
};

export default Page;
