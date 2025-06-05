"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LayoutTemplate, Palette, Settings, Type } from "lucide-react";
import EnhancedComponentSelector from "./tabs/EnhancedComponentSelector";
import LayoutSelector from "./tabs/LayoutSelector";
import SlideCustomizationPanel from "./tabs/SlideCustomizationPanel";
import ThemePicker from "./tabs/components/ThemePicker";

const EditorSidebar = () => {
  return (
    <div className="fixed right-0 z-10 transform translate-y-1/2 top-1/2">
      <div className="flex flex-col items-center p-2 space-y-4 border border-r-0 shadow-lg rounded-xl border-background-70 bg-background/95 backdrop-blur-sm">
        {/* Layout Selector */}
        <TooltipProvider>
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <LayoutTemplate className="w-5 h-5" />
                    <span className="sr-only">Choose Layout</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent
                side="left"
                align="center"
                className="w-[480px] p-0"
              >
                <LayoutSelector />
              </PopoverContent>
            </Popover>
            <TooltipContent side="left">
              <p>Choose slide layouts</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Component Selector */}
        <TooltipProvider>
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Type className="w-5 h-5" />
                    <span className="sr-only">Add Components</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent
                side="left"
                align="center"
                className="w-[480px] p-0"
              >
                <EnhancedComponentSelector />
              </PopoverContent>
            </Popover>
            <TooltipContent side="left">
              <p>Add text, tables, and more</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Theme Picker */}
        <TooltipProvider>
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Palette className="w-5 h-5" />
                    <span className="sr-only">Change Theme</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent side="left" align="center" className="p-0 w-80">
                <ThemePicker />
              </PopoverContent>
            </Popover>
            <TooltipContent side="left">
              <p>Customize presentation theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Slide Customization Panel */}
        <TooltipProvider>
          <Tooltip>
            <Popover>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="sr-only">Customize Slide</span>
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent
                side="left"
                align="center"
                className="w-[480px] p-0"
              >
                <SlideCustomizationPanel />
              </PopoverContent>
            </Popover>
            <TooltipContent side="left">
              <p>Adjust slide settings and options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default EditorSidebar;
