"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSlideStore } from "@/store/useSlideStore";
import { LayoutTemplate } from "lucide-react";
import LayoutSelector from "./tabs/LayoutSelector";

type Props = {};

const EditorSidebar = (props: Props) => {
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
      </div>
    </div>
  );
};

export default EditorSidebar;
