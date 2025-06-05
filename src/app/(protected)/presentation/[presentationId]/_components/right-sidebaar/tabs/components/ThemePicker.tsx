"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { themes } from "@/config";
import { api } from "@/lib/api";
import type { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const ThemePicker = () => {
  const { currentTheme, setCurrentTheme, project } = useSlideStore();
  const { setTheme } = useTheme();

  // tRPC mutation for updating theme
  const updateThemeMutation = api.project.updateTheme.useMutation({
    onSuccess: () => {
      toast.success("Theme updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update theme: ${error.message}`);
    },
  });

  const handleThemeChange = async (theme: Theme) => {
    if (!project) {
      toast.error("Failed to update");
      return;
    }

    setTheme(theme.type);
    setCurrentTheme(theme);

    updateThemeMutation.mutate({
      projectId: project.id,
      theme: theme.name,
    });
  };

  return (
    <ScrollArea className="h-[400px]">
      <div className="mb-4 font-bold text-center">Themes</div>
      <div className="flex flex-col space-y-4">
        {themes.map((theme) => (
          <Button
            onClick={() => handleThemeChange(theme)}
            key={theme.name}
            variant={currentTheme.name === theme.name ? "default" : "outline"}
            className="flex flex-col items-center justify-start w-full h-auto px-4"
            style={{
              fontFamily: theme.fontFamily,
              color: theme.fontColor,
              background: theme.gradientBackground || theme.backgroundColor,
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
                Body & <span style={{ color: theme.accentColor }}>link</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ThemePicker;
