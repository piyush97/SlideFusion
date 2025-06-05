import { Button } from "@/components/ui/button";
import { IS_WAITLIST_MODE, WAITLIST_PATH } from "@/config";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-slide-blue to-slide-purple">
            <div className="w-5 h-1 bg-white rounded-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight">SlideFusion</span>
        </div>

        {/* Desktop menu */}
        <nav className="items-center hidden gap-6 md:flex">
          <a
            href="#features"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            How It Works
          </a>
          {!IS_WAITLIST_MODE && (
            <a
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Testimonials
            </a>
          )}
          <a
            href="#pricing"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Pricing
          </a>
        </nav>

        <div className="items-center hidden gap-4 md:flex">
          <ThemeToggle />
          <Link href={IS_WAITLIST_MODE ? WAITLIST_PATH : "/signin"}>
            <Button variant="outline">
              {IS_WAITLIST_MODE ? "Join Waitlist" : "Sign In"}
            </Button>
          </Link>
          {!IS_WAITLIST_MODE && (
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 p-4 border-b shadow-lg md:hidden top-16 bg-background animate-fade-in">
          <nav className="flex flex-col gap-4">
            <a
              href="#features"
              className="py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            {!IS_WAITLIST_MODE && (
              <a
                href="#testimonials"
                className="py-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
            )}
            <a
              href="#pricing"
              className="py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Link href={IS_WAITLIST_MODE ? WAITLIST_PATH : "/signin"}>
                <Button variant="outline" className="w-full">
                  {IS_WAITLIST_MODE ? "Join Waitlist" : "Sign In"}
                </Button>
              </Link>
              {!IS_WAITLIST_MODE && (
                <Link href="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
