"use client";

import { getProjectById } from "@/actions/project";
import { themes } from "@/global/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2 } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "sonner";
import Navbar from "./_components/Navbar/Navbar";
import LayoutPreview from "./_components/editor-sidebar/leftSidebar/LayoutPreview";
import Editor from "./_components/editor/Editor";
import EditorSidebar from "./_components/right-sidebaar";

export const runtime = 'edge'; // Required for Cloudflare Pages

const Page = () => {
  const { setSlides, setProject, currentTheme, setCurrentTheme } =
    useSlideStore();
  const params = useParams();
  // const { setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectById(params?.presentationId as string);
        if (res.status !== 200 || !res.data) {
          toast.error("Failed to fetch project");
          redirect("/dashboard");
        }

        const findTheme = themes.find(
          (theme) => theme.name === res?.data.themeName
        );

        setCurrentTheme(findTheme || themes[0]);
        setProject(res.data);
        setSlides(JSON.parse(JSON.stringify(res?.data.slides)));
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch project");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params?.presentationId, setCurrentTheme, setProject, setSlides]);

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
