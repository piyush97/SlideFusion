"use client";
import { updateSlides } from "@/actions/project";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutSlides, Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import { EllipsisVertical, Trash } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 } from "uuid";
import { MasterRecursiveComponent } from "./Content";

type Props = {
  isEditable: boolean;
};

type DropZoneProps = {
  index: number;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => void;
  isEditable: boolean;
};

export const DropZone: React.FC<DropZoneProps> = ({
  index,
  onDrop,
  isEditable,
}) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ["SLIDE", "LAYOUT"],
    drop: (item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    }) => {
      onDrop(item, index);
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  if (!isEditable) return null;

  return (
    <div
      className={cn(
        "h-4 my-2 rounded-md transition-all duration-200",
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        canDrop ? "border-blue-300" : ""
      )}
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
    >
      {isOver && canDrop && (
        <div className="flex items-center justify-center h-full text-green-600">
          Drop here
        </div>
      )}
    </div>
  );
};

type DraggableSlideProps = {
  index: number;
  slide: Slide;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string) => void;
  isEditable: boolean;
};

const DraggableSlide: React.FC<DraggableSlideProps> = ({
  index,
  slide,
  moveSlide,
  handleDelete,
  isEditable,
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: { index, type: "SLIDE" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditable,
  });

  drag(ref);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, drop] = useDrop({
    accept: ["SLIDE", "LAYOUT"],
    hover(item: { index: number; type: string }) {
      if (!ref.current || !isEditable) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (item.type === "SLIDE") {
        if (dragIndex === hoverIndex) {
          return;
        }
        moveSlide(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  drag(drop(ref));

  const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } =
    useSlideStore();

  return (
    <div
      ref={ref}
      className={cn(
        "w-full rounded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px]",
        "shadow-xl transition-shadow duration-300",
        "flex flex-col",
        index === currentSlide ? "ring-2 ring-blue-500 ring-offset-2" : "",
        slide.className,
        isDragging ? "opacity-50" : "opacity-100"
      )}
      style={{ backgroundImage: currentTheme.gradientBackground }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="flex-grow w-full h-full overflow-hidden">
        <MasterRecursiveComponent
          content={slide.content}
          isEditable={isEditable}
          isPreview={false}
          slideId={slide.id}
          onContentChange={(newContent, contentId) => {
            console.log("content changed", slide, contentId, newContent);
            if (isEditable) {
              updateContentItem(slide.id, contentId, newContent);
            }
          }}
        />
      </div>
      {isEditable && (
        <Popover>
          <PopoverTrigger className="absolute top-2 left-2" asChild>
            <Button size="sm" variant="outline">
              <EllipsisVertical className="w-5 h-5" />
              <span className="sr-only">Slide options</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-fit">
            <div className="flex space-x-2">
              <Button variant="ghost" onClick={() => handleDelete(slide.id)}>
                <Trash className="w-5 h-5 text-red-500" />
                <span className="sr-only">Delete Slide</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

const Editor = ({ isEditable }: Props) => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const {
    currentSlide,
    getOrderedSlides,
    slides,
    project,
    removeSlide,
    addSlideAtIndex,
    reorderSlides,
  } = useSlideStore();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const orderedSlides = getOrderedSlides();
  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex);
    }
  };

  const handleDrop = (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => {
    if (!isEditable) return;
    if (item.type === "layout") {
      addSlideAtIndex(
        {
          ...item.component,
          id: v4(),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    } else if (item.type === "SLIDE" && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  };

  const handleDelete = (id: string) => {
    if (isEditable) {
      console.log("Deleting", id);
      removeSlide(id);
    }
  };

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  useEffect(() => {
    if (typeof window !== "undefined") setLoading(false);
  }, []);

  const saveSlides = useCallback(() => {
    if (isEditable && project) {
      (async () => {
        setIsSaving(true);
        await updateSlides(project.id, JSON.parse(JSON.stringify(slides)));
        setIsSaving(false);
      })();
    }
  }, [slides, isEditable, project]);

  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    if (isEditable) {
      autoSaveTimeoutRef.current = setTimeout(() => {
        console.log("Auto-saving...");
        saveSlides();
      }, 2000);
    }
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [slides, isEditable, project, saveSlides]);

  return (
    <div className="relative flex flex-col flex-1 h-full max-w-3xl px-4 mx-auto mb-20">
      {isEditable && (
        <div
          className={`absolute top-0 right-0 transition-opacity duration-300 z-10 ${
            isSaving ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center px-3 py-1 text-green-800 bg-green-100 rounded-md shadow-sm">
            <svg
              className="w-4 h-4 mr-2 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-sm">Saving...</span>
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex flex-col w-full px-4 space-y-6">
          <Skeleton className="w-full h-52" />
          <Skeleton className="w-full h-52" />
          <Skeleton className="w-full h-52" />
        </div>
      ) : (
        <ScrollArea className="flex-1 mt-8">
          <div className="px-4 pt-2 pb-4 space-y-4">
            {isEditable && (
              <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />
            )}
            {orderedSlides.map((slide, index) => (
              <React.Fragment key={slide.id || index}>
                <DraggableSlide
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                  handleDelete={() => handleDelete(slide.id)}
                  isEditable={isEditable}
                />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
