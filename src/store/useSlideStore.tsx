import { Slide } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
  project: Project | null;
  setProject: (project: Project | null) => void;
}

export const useSlideStore = create(
  persist<SlideState>(
    (set) => ({
      slides: [],
      setSlides: (slides) => set({ slides }),
      project: null,
      setProject: (project) => set({ project }),
    }),
    {
      name: "slides-storage",
    },
  ),
);
