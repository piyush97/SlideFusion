"use client";

import { ROUTES } from "@/config";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const router = useRouter();
  const { data: auth, isLoading } = api.user.authenticate.useQuery();

  useEffect(() => {
    if (isLoading) return;

    if (!auth?.user) {
      router.push(ROUTES.signin);
    }
  }, [auth, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth?.user) {
    return null;
  }

  return <div className="w-full min-h-screen">{children}</div>;
};

export default DashboardLayout;
