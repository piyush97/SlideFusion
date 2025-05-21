import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CreatePageSkeleton from "./_components/CreatePageSkeleton";
import RenderPage from "./_components/RenderPage";
export const dynamic = "force-dynamic";
export const runtime = "edge"; // Required for Cloudflare Pages

const Page = async () => {
  // Checking if the user is authenticated and has a subscription
  // If not, redirect to the sign-in page or dashboard
  const checkUser = await onAuthenticateUser();

  if (!checkUser?.user) {
    redirect("/sign-in");
  }

  if (!checkUser?.user?.subscription) {
    redirect("/dashboard");
  }

  return (
    <main className="w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
};

export default Page;
