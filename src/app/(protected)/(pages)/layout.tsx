"use client";

import AppSidebar from "@/components/global/app-sidebar";
import UpperInfoBar from "@/components/global/upper-info-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ROUTES } from "@/config";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { data: recentProjects, isLoading: recentLoading } =
    api.project.getRecent.useQuery();
  const { data: checkUser, isLoading: userLoading } =
    api.user.authenticate.useQuery();

  // Show loading state while data is being fetched
  if (userLoading || recentLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!checkUser?.user) {
    redirect(ROUTES.signin);
    return null;
  }

  const projects =
    recentProjects?.status === 200 ? recentProjects.data || [] : [];

  return (
    <SidebarProvider>
      <AppSidebar recentProjects={projects} user={checkUser.user} />
      <SidebarInset>
        <UpperInfoBar user={checkUser.user} />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
