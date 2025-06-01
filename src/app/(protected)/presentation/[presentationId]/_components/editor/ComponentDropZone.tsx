"use client";
import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

type ComponentDropZoneProps = {
  slideId: string;
  parentId: string;
  index: number;
  className?: string;
  children?: React.ReactNode;
};

const ComponentDropZone: React.FC<ComponentDropZoneProps> = ({
  slideId,
  parentId,
  index,
  className,
  children,
}) => {
  const { addComponentInSlide } = useSlideStore();

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "CONTENT_ITEM",
    drop: (item: {
      type: string;
      componentType: string;
      name: string;
      component: ContentItem;
      icon: string;
    }) => {
      console.log("Dropping component:", item);

      // Create a new component with unique ID
      const newComponent: ContentItem = {
        ...item.component,
        id: uuidv4(),
      };

      // Add the component to the slide
      addComponentInSlide(slideId, newComponent, parentId, index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "transition-all duration-200 min-h-[20px]",
        isOver && canDrop
          ? "border-2 border-blue-500 border-dashed bg-blue-50 dark:bg-blue-950/30"
          : "",
        canDrop && !isOver
          ? "border border-gray-300 border-dashed opacity-50"
          : "",
        className
      )}
    >
      {isOver && canDrop && (
        <div className="flex items-center justify-center text-blue-600 text-sm p-2">
          Drop component here
        </div>
      )}
      {children}
    </div>
  );
};

export default ComponentDropZone;
