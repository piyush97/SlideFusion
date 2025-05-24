"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { component } from "@/config";
import { useSlideStore } from "@/store/useSlideStore";
import { LayoutTemplate, Palette, Type } from "lucide-react";
import LayoutSelector from "./tabs/LayoutSelector";
import ComponentCard from "./tabs/components/ComponentPreview";
import ThemePicker from "./tabs/components/ThemePicker";

const EditorSidebar = () => {
  const { currentTheme } = useSlideStore();

  return (
    <div className="fixed right-0 z-10 transform translate-y-1/2 top-1/2">
      <div className="flex flex-col items-center p-2 space-y-4 border border-r-0 shadow-lg rounded-xl border-background-70">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full"
            >
              <LayoutTemplate className="w-5 h-5" />
              <span className="sr-only">Choose Layout</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" align="center" className="w-[480px] p-0">
            <LayoutSelector />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full"
            >
              <Type className="w-5 h-5" />
              <span className="sr-only">Choose Layout</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="center"
            className="w-[480px] p-0"
            style={{
              backgroundColor: currentTheme.backgroundColor,
              color: currentTheme.fontColor,
            }}
          >
            <ScrollArea className="h-[400px]">
              <div className="flex flex-col p-5 space-y-6">
                {component.map((group, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="px-1 text-sm font-medium text-muted-foreground">
                      {group.name}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {group.components.map((item) => (
                        <ComponentCard key={item.componentType} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full"
            >
              <Palette className="w-5 h-5" />
              <span className="sr-only">Change Theme</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" align="center" className="p-0 w-80">
            <ThemePicker />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default EditorSidebar;
