"use client";

import { themes } from "@/global/constants";
import { api } from "@/lib/api";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2 } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "sonner";
import Navbar from "./_components/Navbar/Navbar";
import LayoutPreview from "./_components/editor-sidebar/leftSidebar/LayoutPreview";
import Editor from "./_components/editor/Editor";
import EditorSidebar from "./_components/right-sidebaar";

const Page = () => {
  const { setSlides, setProject, currentTheme, setCurrentTheme } =
    useSlideStore();
  const params = useParams();

  // Use tRPC query to fetch project by ID
  const {
    data: projectData,
    isLoading,
    error,
  } = api.project.getById.useQuery(
    { projectId: params?.presentationId as string },
    {
      enabled: !!params?.presentationId,
    }
  );

  useEffect(() => {
    if (projectData) {
      if (projectData.status !== 200 || !projectData.data) {
        toast.error("Failed to fetch project");
        redirect("/dashboard");
        return;
      }

      const findTheme = themes.find(
        (theme) => theme.name === projectData.data.themeName
      );

      setCurrentTheme(findTheme || themes[0]);
      setProject(projectData.data);
      setSlides(JSON.parse(JSON.stringify(projectData.data.slides)));
    }
  }, [projectData, setCurrentTheme, setProject, setSlides]);

  useEffect(() => {
    if (error) {
      console.error(error);
      toast.error("Failed to fetch project");
    }
  }, [error]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col min-h-screen">
        <Navbar
          presentationId={params.presentationId as string}
          title="Presentation Editor"
        />
        <div
          className="flex flex-1 pt-16 overflow-hidden"
          style={{
            color: currentTheme.accentColor,
            fontFamily: currentTheme.fontFamily,
            backgroundColor: currentTheme.backgroundColor,
          }}
        >
          <LayoutPreview />
          <div className="flex-1 pr-16 ml-64">
            <Editor isEditable={true} />
          </div>
          <EditorSidebar />
        </div>
      </div>
    </DndProvider>
  );
};

export default Page;
