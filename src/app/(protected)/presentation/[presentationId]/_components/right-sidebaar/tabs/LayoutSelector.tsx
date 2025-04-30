"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { layouts } from "@/global/constants";
import { Layout } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";

const DraggableLayoutItem = ({
  component,
  icon,
  layoutType,
  name,
  type,
}: Layout) => {
  return <div>DraggableLayoutItem</div>;
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
            {/* Fixed typo: mb-b -> mb-6 (or use your preferred margin) */}
            <h3 className="mb-3 text-sm font-medium">{group.name}</h3>
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
