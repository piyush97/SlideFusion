"use client";

import { Button } from "@/components/ui/button";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { useAnimation } from "framer-motion";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const ThemePreview = () => {
  const router = useRouter();
  const params = useParams();
  const controls = useAnimation();
  const { currentTheme, setCurrentTheme, project } = useSlideStore();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    if (project?.slides) {
      redirect(`/presentation/${params.presentationId}`);
    }
  }, [project]);

  useEffect(() => {
    controls.start("visible");
  }, [controls, selectedTheme]);

  const LeftCardContent = (
    <div className="space-y-4">
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: selectedTheme.accentColor }}
      >
        <h3 className="text-xl font-semibold mb-4">Quick Start Guide</h3>
        <ol
          className="list-decimal list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Choose a theme</li>
          <li>Customize colors and fonts</li>
          <li>Add your content</li>
          <li>Preview and Publish</li>
        </ol>
      </div>
      <Button
        className="w-full h-12 text-lg font-medium"
        style={{
          backgroundColor: selectedTheme.accentColor,
          color: selectedTheme.accentColor,
        }}
      >
        Get Started
      </Button>
    </div>
  );

  const MainCardContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            This is a smart layout: it acts as a text box.
          </p>
        </div>
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            You can get thee by typing /smart{" "}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button
          className="w-full h-12 text-lg font-medium"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.accentColor,
          }}
        >
          Primary button
        </Button>
        <Button
          variant="outline"
          className="w-full h-12 text-lg font-medium"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.accentColor,
          }}
        >
          Secondarybutton
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {LeftCardContent}
      {MainCardContent}
    </>
  );
};

export default ThemePreview;
