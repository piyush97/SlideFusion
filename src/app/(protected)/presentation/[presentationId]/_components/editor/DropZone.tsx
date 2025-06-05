import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import { useDrop } from "react-dnd";
import { v4 } from "uuid";

type Props = { index: number; parentId: string; slideId: string };

const DropZone = ({ index, parentId, slideId }: Props) => {
  const { addComponentInSlide } = useSlideStore();
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "CONTENT_ITEM",
    drop: (item: {
      type: string;
      componentType: string;
      label: string;
      component: ContentItem;
    }) => {
      if (item.type === "component") {
        addComponentInSlide(
          slideId,
          {
            ...item.component,
            id: v4(),
          },
          parentId,
          index,
        );
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        "h-8 w-full transition-all duration-200 border-2 border-dashed my-2 rounded-md",
        "border-gray-300 hover:border-blue-400",
        isOver && canDrop ? "border-blue-500 bg-blue-100" : "",
        canDrop ? "border-blue-300" : "",
        "flex items-center justify-center",
      )}
    >
      {isOver && canDrop && (
        <div className="flex items-center justify-center w-full h-full text-sm text-green-600 font-medium">
          Drop component here
        </div>
      )}
      {!isOver && canDrop && (
        <div className="flex items-center justify-center w-full h-full text-xs text-gray-400">
          Drop zone
        </div>
      )}
    </div>
  );
};

export default DropZone;
