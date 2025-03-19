import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type CreativeAIStore = {
  outlines: OutlineCard[] | [];
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  setCurrentAIPrompt: (prompt: string) => void;
  currentAIPrompt: string;
};

export const useCreativeAIStore = create<CreativeAIStore>()(
  persist(
    (set) => ({
      outlines: [],
      addMultipleOutlines: (outlines: OutlineCard[]) =>
        set((state) => ({ outlines: [...outlines, ...state.outlines] })),
      addOutline: (outline: OutlineCard) =>
        set((state) => ({ outlines: [...state.outlines, outline] })),
      setCurrentAIPrompt: (prompt: string) => set({ currentAIPrompt: prompt }),
      currentAIPrompt: "",
    }),
    {
      name: "creative-ai",
    }
  )
);
