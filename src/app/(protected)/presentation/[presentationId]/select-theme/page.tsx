"use client";

import ThemePreview from "./_components/ThemePreview";

export const runtime = 'edge'; // Required for Cloudflare Pages

export default function SelectThemePage() {
  return <ThemePreview />;
}
