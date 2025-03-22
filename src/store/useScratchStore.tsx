import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type OutlineStore = {
  outlines: OutlineCard[];
  addOutline: (outline: OutlineCard) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  resetOutlines: () => void;
};

const useScratchStore = create(persist<OutlineStore>(
  (set) => ({
    outlines: [],
    addOutline: (outline: OutlineCard) => set((state) => ({ outlines: [...state.outlines, outline] })),
    addMultipleOutlines: (outlines: OutlineCard[]) => set((state) => ({ outlines: [...state.outlines, ...outlines] })),
    resetOutlines: () => set({ outlines: [] }),
  }),
  {
    name: 'scratch-store',
  }
));

export default useScratchStore;
