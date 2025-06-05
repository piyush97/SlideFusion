import { ContentItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useDrag } from "react-dnd";

type Props = {
  type: string;
  componentType: string;
  name: string;
  component: ContentItem;
  icon: string;
};

const ComponentCard = ({ item }: { item: Props }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CONTENT_ITEM",
    item: {
      type: "component",
      componentType: item.componentType,
      label: item.name,
      component: item.component,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className={cn("border", isDragging ? "opacity-50" : "opacity-100")}
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
    >
      <div
        className={cn(
          "flex flex-col items-center cursor-grab active:cursor-grabbing gap-2 p-2 rounded-lg hover:bg-primary-10 transition-all duration-200",
          "text-center w-full",
          "hover:scale-105 transform",
        )}
      >
        <div className="w-full aspect-[16/9] rounded-md border bg-gray-100 dark:bg-gray-700 p-2 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl text-primary">{item.icon}</span>
          </div>
        </div>
        <span className="text-xs font-medium text-gray-500"> {item.name}</span>
      </div>
    </div>
  );
};

export default ComponentCard;
