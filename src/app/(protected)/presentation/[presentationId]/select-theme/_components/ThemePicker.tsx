import { generateLayouts } from "@/actions/openai";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2, Wand2 } from "lucide-react";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  selectedTheme: Theme;
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
};

const ThemePicker = ({ selectedTheme, themes, onThemeSelect }: Props) => {
  const router = useRouter();
  const params = useParams();

  const { project, setSlides, currentTheme } = useSlideStore();
  const [loading, setLoading] = useState(false);

  const handleGenerateLayouts = async () => {
    setLoading(true);
    if (!selectedTheme) {
      toast.error("Please select a theme");
      return;
    }

    if (project?.id === "") {
      toast.error("Please create a project");
      setLoading(false);
      router.push("/create-project");
      return;
    }
    try {
      const res = await generateLayouts(
        params.presentationId as string,
        currentTheme.name
      );

      if (res.status !== 200 || !res?.data || res?.data.length === 0) {
        throw new Error(res.error || "Failed to generate layouts");
      }

      toast.success("Layouts generated successfully");
      router.push(`/presentation/${project?.id}`);
      setSlides(res.data);
    } catch (error) {
      console.error("Error generating layouts:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate layouts. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col"
      style={{
        backgroundColor:
          selectedTheme.sidebarColor || selectedTheme.backgroundColor,
        borderLeft: `1px solid ${selectedTheme.accentColor}20`,
      }}
    >
      <div className="flex-shrink-0 p-8 space-y-6">
        <div className="space-y-2">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: selectedTheme.accentColor }}
          >
            Pick a theme
          </h2>
          <p
            className="text-sm "
            style={{ color: `${selectedTheme.accentColor}80` }}
          >
            Choose a theme to get started. You can customize it later.
          </p>
        </div>
        <Button
          className="w-full h-12 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.backgroundColor,
          }}
          onClick={handleGenerateLayouts}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Wand2 className="w-5 h-5 mr-2" />
          )}
          {loading ? (
            <p className="animate-pulse">Generating...</p>
          ) : (
            "Generate a theme"
          )}
        </Button>
      </div>
      <ScrollArea className="flex-grow px-8 pb-8">
        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.8 }}
            >
              <Button
                onClick={() => {
                  onThemeSelect(theme);
                }}
                className="flex flex-col items-center justify-start w-full h-auto p-6"
                style={{
                  backgroundColor:
                    theme.gradientBackground || theme.backgroundColor,
                  color: theme.fontColor,
                  fontFamily: theme.fontFamily,
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xl font-bold">{theme.name}</span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                </div>
                <div className="w-full space-y-1">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: theme.accentColor }}
                  >
                    Title
                  </div>
                  <div className="text-base opacity-80">
                    Body &{" "}
                    <span style={{ color: theme.accentColor }}>link</span>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ThemePicker;
