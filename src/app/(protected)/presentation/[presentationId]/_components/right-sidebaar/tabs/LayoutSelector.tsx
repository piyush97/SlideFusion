"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { layouts } from "@/global/constants";
import { Layout } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { useDrag } from "react-dnd";
import LayoutPreviewItem from "./components/LayoutPreviewItem";

const DraggableLayoutItem = ({
  component,
  icon,
  layoutType,
  name,
  type,
}: Layout) => {
  const { currentTheme } = useSlideStore();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "LAYOUT",
    item: { type, layoutType, component },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: currentTheme.slideBackgroundColor,
      }}
      className="border rounded-lg"
    >
      <LayoutPreviewItem
        name={name}
        Icon={icon}
        type={type}
        component={component}
      />
    </div>
  );
};

const LayoutSelector = () => {
  const { currentTheme } = useSlideStore();
  return (
    <ScrollArea
      className="h-[400px]"
      style={{ backgroundColor: currentTheme.slideBackgroundColor }}
    >
      <div className="p-4">
        {layouts.map((group) => (
          <div key={group.name} className="mb-6">
            <h3 className="my-4 text-sm font-medium">{group.name}</h3>
            <div className="grid grid-cols-3 gap-2">
              {group.layouts.map((layout) => (
                <DraggableLayoutItem key={layout.layoutType} {...layout} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default LayoutSelector;
