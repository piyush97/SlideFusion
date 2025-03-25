import { getProjectById } from "@/actions/project";
import { themes } from "@/global/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2 } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { toast } from "sonner";

const Page = () => {
  const { setSlides, setProject, setCurrentTheme } = useSlideStore();
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
          (theme) => theme.name === res?.data.themeName,
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
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );

  return <DndProvider>{/* Your component content */}</DndProvider>;
};

export default Page;
