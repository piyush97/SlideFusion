import { Button } from "@/components/ui/button";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  selectedTheme: Theme;
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
};

const ThemePicker = ({ selectedTheme, themes, onThemeSelect }: Props) => {
  const router = useRouter();

  const { project, setSlides, currentTheme } = useSlideStore();
  const [loading, setLoading] = useState(false);

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
          // onClick={}
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
    </div>
  );
};

export default ThemePicker;
