"use client";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/config";
import { useSlideStore } from "@/store/useSlideStore";
import { Project } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();

  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      toast.error("Project not found", {
        description: "Please try again",
      });
      return;
    }
    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`${ROUTES.presentation}/${projectId}`);
  };
  return (
    recentProjects.length > 0 && (
      <SidebarGroup>
        <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>
        <SidebarMenu>
          {recentProjects.map((project) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton
                asChild
                tooltip={project.title}
                className="hover:bg-primary-80"
              >
                <Button
                  variant={"link"}
                  onClick={() => handleClick(project.id, project.slides)}
                  className="text-xs items-center justify-start"
                >
                  {project.title}
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    )
  );
};

export default RecentOpen;
