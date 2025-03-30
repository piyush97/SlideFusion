import { getRecentProjects } from "@/actions/project";
import { onAuthenticateUser } from "@/actions/user";
import AppSidebar from "@/components/global/app-sidebar";
import UpperInfoBar from "@/components/global/upper-info-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ROUTES } from "@/global/constants";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const recentProjectsResponse = await getRecentProjects();
  const userResponse = await onAuthenticateUser();

  if (
    !userResponse.status ||
    userResponse.status !== 200 ||
    !userResponse.data?.user
  ) {
    redirect(ROUTES.signin);
  }

  const recentProjects = recentProjectsResponse.data || [];

  return (
    <SidebarProvider>
      <AppSidebar
        recentProjects={recentProjects}
        user={userResponse.data.user}
      />
      <SidebarInset>
        <UpperInfoBar user={userResponse.data.user} />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
