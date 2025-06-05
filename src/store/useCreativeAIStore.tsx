import type { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreativeAIStore = {
  outlines: OutlineCard[];
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  setCurrentAIPrompt: (prompt: string) => void;
  currentAIPrompt: string;
  resetOutlines: () => void;
};

export const useCreativeAIStore = create<CreativeAIStore>()(
  persist(
    (set) => ({
      outlines: [],
      addMultipleOutlines: (outlines: OutlineCard[]) =>
        set((state) => ({ outlines: [...outlines, ...state.outlines] })),
      addOutline: (outline: OutlineCard) =>
        set((state) => ({ outlines: [outline, ...state.outlines] })),
      setCurrentAIPrompt: (prompt: string) => set({ currentAIPrompt: prompt }),
      currentAIPrompt: "",
      resetOutlines: () => set({ outlines: [] }),
    }),
    {
      name: "creative-ai",
    },
  ),
);
