"use client";

import { Button } from "@/components/ui/button";
import { useSlideStore } from "@/store/useSlideStore";
import { Home, Play, Share } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import PresentationMode from "./PresentationMode";

type Props = { presentationId: string; title: string };

const Navbar = ({ presentationId, title }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`,
    );
    toast.success("Link copied to clipboard");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full h-20 py-4 border-b px-7"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link href={"/dashboard"} passHref>
        <Button
          variant={"outline"}
          className="flex items-center gap-2"
          style={{ backgroundColor: currentTheme.backgroundColor }}
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      </Link>
      <Link
        href="/presentation/template-market"
        className="hidden text-lg font-semibold sm:block"
      >
        {title}
      </Link>
      <div className="flex items-center gap-4">
        <Button
          style={{ backgroundColor: currentTheme.backgroundColor }}
          variant="outline"
          onClick={handleCopy}
        >
          <Share className="w-4 h-4" />
        </Button>
        {/* <SellTemplate /> */}
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={() => setIsPresentationMode(true)}
        >
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>
      {isPresentationMode && (
        <PresentationMode onClose={() => setIsPresentationMode(false)} />
      )}
    </nav>
  );
};

export default Navbar;
