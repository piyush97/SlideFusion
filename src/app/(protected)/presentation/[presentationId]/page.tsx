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

const Page = () => {
  const { setSlides, setProject, setCurrentTheme } = useSlideStore();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectById(params?.presentationId as string);
        if (res.status !== 200 || !res.data) {
          toast.error(res.error || "Failed to fetch project");
          redirect("/dashboard");
          return;
        }

        const slides = res.data.slides;
        const themeName = res.data.themeName;

        if (!slides || !slides.length) {
          toast.error("No slides found in this project");
          redirect("/dashboard");
          return;
        }

        setSlides(slides);
        setProject(res.data);

        const theme = themes.find((t) => t.name === themeName) || themes[0];
        setCurrentTheme(theme);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project", {
          description: "Please try again or contact support",
        });
        redirect("/dashboard");
      }
    })();
  }, [params?.presentationId, setCurrentTheme, setProject, setSlides]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="w-6 h-6 mr-2 animate-spin" />
        <span>Loading presentation...</span>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="min-h-screen bg-background">
        <Navbar />
      </main>
    </DndProvider>
  );
};

export default Page;
