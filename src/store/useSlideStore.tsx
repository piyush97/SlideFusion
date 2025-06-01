import { ContentItem, Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the default theme used when no theme is selected
const defaultTheme: Theme = {
  name: "Default",
  fontFamily: "'Inter', sans-serif",
  fontColor: "#333333",
  backgroundColor: "#f0f0f0",
  slideBackgroundColor: "#ffffff",
  accentColor: "#3b82f6",
  type: "light",
};

// Interface defining the slide store state and actions
interface SlideState {
  // State properties
  slides: Slide[];
  currentSlide: number;
  project: Project | null;
  currentTheme: Theme;

  // State setters
  setSlides: (slides: Slide[]) => void;
  setProject: (project: Project | null) => void;
  setCurrentTheme: (theme: Theme) => void;
  setCurrentSlide: (index: number) => void;

  // Slide management actions
  getOrderedSlides: () => Slide[];
  reorderSlides: (fromIndex: number, toIndex: number) => void;
  removeSlide: (slideId: string) => void;
  addSlideAtIndex: (slide: Slide, index: number) => void;
  updateContentItem: (
    slideId: string,
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  addComponentInSlide: (
    slideId: string,
    component: ContentItem,
    parentId: string,
    index: number
  ) => void;
  updateSlide: (slideId: string, updatedSlide: Slide) => void;
}

// Create the slide store with persistence
export const useSlideStore = create<SlideState>()(
  persist(
    (set, get) => ({
      // Initial state
      slides: [],
      currentSlide: 0,
      project: null,
      currentTheme: defaultTheme,

      // State setters
      setSlides: (slides: Slide[]) => set({ slides }),
      setProject: (project: Project | null) => set({ project }),
      setCurrentTheme: (theme: Theme) => set({ currentTheme: theme }),
      setCurrentSlide: (index: number) => set({ currentSlide: index }),

      // Slide management actions
      getOrderedSlides: () => {
        const { slides } = get();
        return [...slides].sort((a, b) => a.slideOrder - b.slideOrder);
      },

      reorderSlides: (fromIndex: number, toIndex: number) => {
        const { slides } = get();
        const updatedSlides = [...slides];
        const [movedSlide] = updatedSlides.splice(fromIndex, 1);
        updatedSlides.splice(toIndex, 0, movedSlide);

        // Update slide order indices
        updatedSlides.forEach((slide, index) => {
          slide.slideOrder = index;
        });

        set({ slides: updatedSlides });
      },

      removeSlide: (slideId: string) => {
        const { slides } = get();
        const updatedSlides = slides.filter((slide) => slide.id !== slideId);

        // Re-index remaining slides
        updatedSlides.forEach((slide, index) => {
          slide.slideOrder = index;
        });

        set({ slides: updatedSlides });
      },

      addSlideAtIndex: (slide: Slide, index: number) => {
        set((state) => {
          const newSlides = [...state.slides];
          newSlides.splice(index, 0, { ...slide, id: uuidv4() });

          // Update slide order for all slides
          newSlides.forEach((s, i) => {
            s.slideOrder = i;
          });

          return { slides: newSlides, currentSlide: index };
        });
      },

      updateContentItem: (
        slideId: string,
        contentId: string,
        newContent: string | string[] | string[][]
      ) => {
        set((state) => {
          // Find the slide by ID
          const updatedSlides = state.slides.map((slide) => {
            if (slide.id !== slideId) return slide;

            // Define the recursive update function
            const updateContentRecursively = (
              item: ContentItem
            ): ContentItem => {
              if (item.id === contentId) {
                return { ...item, content: newContent };
              }

              if (
                Array.isArray(item.content) &&
                item.content.every((i) => typeof i !== "string")
              ) {
                return {
                  ...item,
                  content: item.content.map((subItem) =>
                    typeof subItem !== "string"
                      ? updateContentRecursively(subItem as ContentItem)
                      : subItem
                  ),
                };
              }

              return item;
            };

            // Apply the update to the slide content
            return {
              ...slide,
              content: updateContentRecursively(slide.content),
            };
          });

          return { slides: updatedSlides };
        });
      },
      addComponentInSlide(
        slideId: string,
        component: ContentItem,
        parentId: string
        // Removing the unused index parameter
      ) {
        set((state) => {
          const updatedSlides = state.slides.map((slide) => {
            if (slide.id !== slideId) return slide;

            const addComponentRecursively = (
              item: ContentItem
            ): ContentItem => {
              if (item.id === parentId) {
                const newComponent = { ...component, id: uuidv4() };
                const updatedContent =
                  Array.isArray(item.content) && item.content.length > 0
                    ? [...(item.content as ContentItem[]), newComponent]
                    : [newComponent];

                return { ...item, content: updatedContent };
              }

              if (
                Array.isArray(item.content) &&
                item.content.every((i) => typeof i !== "string")
              ) {
                return {
                  ...item,
                  content: item.content.map((subItem) =>
                    typeof subItem !== "string"
                      ? addComponentRecursively(subItem as ContentItem)
                      : subItem
                  ),
                };
              }

              return item;
            };

            return {
              ...slide,
              content: addComponentRecursively(slide.content),
            };
          });

          return { slides: updatedSlides };
        });
      },
      updateSlide: (slideId: string, updatedSlide: Slide) => {
        set((state) => {
          const updatedSlides = state.slides.map((slide) =>
            slide.id === slideId ? updatedSlide : slide
          );
          return { slides: updatedSlides };
        });
      },
    }),
    {
      name: "slides-storage",
    }
  )
);
