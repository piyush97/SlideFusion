"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { APP_NAME, DATA } from "@/config";
import type { Project, User } from "@prisma/client";
import NavFooter from "./nav-footer";
import NavMenu from "./nav-menu";
import RecentOpen from "./recent-open";

const AppSidebar = ({
  recentProjects,
  user,
}: // ...props
{
  recentProjects: Project[];
  user: User;
  // props: React.ComponentProps<typeof Sidebar>;
}) => {
  return (
    <Sidebar collapsible="icon" className="max-w-[212px] bg-background-90">
      <SidebarHeader className="pt-6 px-2 pb-0">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open]:text-sidebar-accent-foreground "
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={"/next.svg"} alt={user.name} />
              <AvatarFallback className="rounded-lg">
                SlideFusion
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="truncate text-primary text-3xl font-semibold">
            {APP_NAME}
          </span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMenu items={DATA.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
