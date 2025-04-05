"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutSlides, Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 } from "uuid";

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
    accept: ["SLIDE", "layout"],
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
    >
      {isOver && canDrop && (
        <div className="flex items-center justify-center h-full text-green-600">
          Drop here{" "}
        </div>
      )}
    </div>
  );
};

type DraggableSlideProps = {
  index: number;
  slide: Slide;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (index: number) => void;
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

  const [isDragging] = useDrag({
    type: "SLIDE",
    item: { index, type: "SLIDE" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditable,
  });

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
      <div className="flex-grow w-full h-full overflow-hidden"></div>
    </div>
  );
};

const Editor = ({ isEditable }: Props) => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const {
    currentSlide,
    getOrderedSlides,
    slides,
    project,
    addSlideAtIndex,
    reorderSlides,
  } = useSlideStore();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  return (
    <div className="flex flex-col flex-1 h-full max-w-3xl px-4 mx-auto mb-20">
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
                <DraggableSlide />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
