"use client";

import { Waitlist } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function WaitlistPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Simple header */}
      <header className="container flex items-center justify-between h-16 px-4 border-b md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-slide-blue to-slide-purple">
            <div className="w-5 h-1 bg-white rounded-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight">SlideFusion</span>
        </Link>
      </header>

      {/* Main content area with centered waitlist */}
      <main className="flex items-center justify-center flex-1 p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Join Our Waitlist</h1>
            <p className="text-muted-foreground">
              Be among the first to experience SlideFusion&apos;s AI-powered
              presentation tools.
            </p>
          </div>
          <div className="p-6 border shadow-sm bg-card rounded-xl">
            <Waitlist />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SlideFusion. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:underline"
            >
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
