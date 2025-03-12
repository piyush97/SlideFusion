import { create } from "zustand";

export const useSlideStore = create((set) => ({
  slide: 0,
  setSlide: (slide: number) => set({ slide }),
}));
