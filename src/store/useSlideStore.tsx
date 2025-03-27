import { Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
  project: Project | null;
  setProject: (project: Project | null) => void;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
}

const defaultTheme: Theme = {
  name: "Default",
  fontFamily: "'Inter', sans-serif",
  fontColor: "#333333",
  backgroundColor: "#f0f0f0",
  slideBackgroundColor: "#ffffff",
  accentColor: "#3b82f6",
  type: "light",
};

export const useSlideStore = create<SlideState>()(
  persist(
    (set) => ({
      slides: [],
      setSlides: (slides: Slide[]) => set({ slides }),
      project: null,
      setProject: (project: Project | null) => set({ project }),
      currentTheme: defaultTheme,
      setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
    }),
    {
      name: "slides-storage",
    }
  )
);
