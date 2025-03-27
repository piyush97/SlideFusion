"use client";

import { Button } from "@/components/ui/button";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { useAnimation } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeCard from "./ThemeCard";

const ThemePreview = () => {
  const router = useRouter();
  const params = useParams();
  const controls = useAnimation();
  const { currentTheme, setCurrentTheme, project } = useSlideStore();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    if (project?.slides) {
      router.push(`/presentation/${params.presentationId}`);
    }
  }, [project]);

  useEffect(() => {
    controls.start("visible");
  }, [controls, selectedTheme]);

  const buttonStyle = {
    backgroundColor: selectedTheme.accentColor,
    color: selectedTheme.fontColor,
  };

  const LeftCardContent = (
    <div className="space-y-4">
      <div
        className="p-6 rounded-xl"
        style={{ backgroundColor: selectedTheme.accentColor }}
      >
        <h3 className="mb-4 text-xl font-semibold">Quick Start Guide</h3>
        <ol
          className="space-y-2 list-decimal list-inside"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Choose a theme</li>
          <li>Customize colors and fonts</li>
          <li>Add your content</li>
          <li>Preview and Publish</li>
        </ol>
      </div>
      <Button className="w-full h-12 text-lg font-medium" style={buttonStyle}>
        Get Started
      </Button>
    </div>
  );

  const MainCardContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          className="p-6 rounded-xl"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            This is a smart layout: it acts as a text box.
          </p>
        </div>
        <div
          className="p-6 rounded-xl"
          style={{ backgroundColor: selectedTheme.accentColor + "10" }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            You can get thee by typing /smart{" "}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button className="w-full h-12 text-lg font-medium" style={buttonStyle}>
          Primary button
        </Button>
        <Button
          variant="outline"
          className="w-full h-12 text-lg font-medium"
          style={buttonStyle}
        >
          Secondary button
        </Button>
      </div>
    </div>
  );

  const RightCardContent = (
    <div className="space-y-4">
      <div
        className="p-6 rounded-xl"
        style={{ backgroundColor: selectedTheme.accentColor + "10" }}
      >
        <h3 className="mb-4 text-xl font-semibold">Th eme Features</h3>
        <ul className="space-y-2 list-inside list-desc">
          <li>Responsive Design</li>
          <li> Dark and Light modes</li>
          <li>custom color schemes</li>
        </ul>

        <Button
          variant={"outline"}
          className="w-full h-12 text-lg font-medium"
          style={{
            borderColor: selectedTheme.accentColor,
            color: selectedTheme.fontColor,
          }}
        >
          Explore Features
        </Button>
      </div>
    </div>
  );

  return (
    <div
      className="flex w-full h-screen"
      style={{
        backgroundColor: selectedTheme.backgroundColor,
        color: selectedTheme.accentColor,
        fontFamily: selectedTheme.fontFamily,
      }}
    >
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-col items-center min-h-screen p-12">
          <Button
            variant={"outline"}
            className="self-start mb-12"
            size="lg"
            style={{
              backgroundColor: selectedTheme.accentColor + "10",
              color: selectedTheme.accentColor,
              borderColor: selectedTheme.accentColor + "20",
            }}
            onClick={() => router.push("/create-page")}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="relative flex items-center justify-center flex-grow w-full">
            <ThemeCard
              title="Quick Start"
              description="Get up and running in no time"
              content={LeftCardContent}
              variant="left"
              theme={selectedTheme}
              controls={controls}
            />
            <ThemeCard
              title="Main Features"
              description="Explore the main features of this theme"
              content={MainCardContent}
              variant="main"
              theme={selectedTheme}
              controls={controls}
            />
            <ThemeCard
              title="Theme Features"
              description="Discover additional features"
              content={RightCardContent}
              variant="right"
              theme={selectedTheme}
              controls={controls}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
