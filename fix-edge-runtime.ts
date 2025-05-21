#!/usr/bin/env node

/**
 * This script adds the Edge runtime configuration to all the necessary route files.
 * Run with: bun run fix-edge-runtime.ts
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { join, resolve } from "path";

// List of routes that need to be updated based on the error message
const routesToUpdate = [
  "/api/webhook/subscription",
  "/callback",
  "/create-page",
  "/dashboard",
  "/presentation/[presentationId]/select-theme",
  "/presentation/[presentationId]",
  "/settings",
  "/signin/[[...signin]]",
  "/signup/[[...signup]]",
  "/trash",
];

const appDir = resolve("./src/app");

async function findRouteFiles(routePath: string): Promise<string[]> {
  const normalizedPath = routePath.replace(/^\/?/, "");
  const segments = normalizedPath.split("/");

  // Handle dynamic route segments and catch-all routes
  const routePattern = segments
    .map((segment) => {
      if (segment.startsWith("[") && segment.endsWith("]")) {
        if (segment.startsWith("[[") && segment.endsWith("]]")) {
          return "[[...";
        }
        return "[";
      }
      return segment;
    })
    .join("/");

  // Try different patterns for finding the right files
  const possibleDirs = [
    join(appDir, normalizedPath),
    join(appDir, "(auth)", normalizedPath),
    join(appDir, "(protected)", normalizedPath),
    join(appDir, "(protected)", "(pages)", normalizedPath),
    join(appDir, "(protected)", "(dashboardPages)", normalizedPath),
  ];

  const files: string[] = [];

  for (const dir of possibleDirs) {
    try {
      const entries = await readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (
          !entry.isDirectory() &&
          (entry.name === "page.tsx" ||
            entry.name === "route.ts" ||
            entry.name === "route.tsx")
        ) {
          files.push(join(dir, entry.name));
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read, continue
    }
  }

  return files;
}

async function updateFile(filePath: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, "utf-8");

    // Skip if already has edge runtime
    if (
      content.includes("runtime = 'edge'") ||
      content.includes('runtime = "edge"')
    ) {
      console.log(`✅ ${filePath} already has edge runtime`);
      return false;
    }

    // Add edge runtime after imports or at the top if no imports
    let updatedContent;
    if (content.includes("export const dynamic")) {
      // Add after dynamic export
      updatedContent = content.replace(
        /export const dynamic.*?;/,
        (match) =>
          `${match}\nexport const runtime = 'edge'; // Required for Cloudflare Pages`
      );
    } else {
      // Add at the beginning of the file after any imports
      const importStatements = content.match(/^import.*?;(\r?\n|$)/gm) || [];
      const lastImportIndex =
        content.lastIndexOf(importStatements[importStatements.length - 1]) +
        importStatements[importStatements.length - 1].length;

      if (importStatements.length > 0) {
        updatedContent =
          content.slice(0, lastImportIndex) +
          "\nexport const runtime = 'edge'; // Required for Cloudflare Pages\n" +
          content.slice(lastImportIndex);
      } else {
        updatedContent =
          "export const runtime = 'edge'; // Required for Cloudflare Pages\n\n" +
          content;
      }
    }

    await writeFile(filePath, updatedContent);
    console.log(`✅ Updated ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error);
    return false;
  }
}

async function main() {
  let updatedCount = 0;
  let processedCount = 0;

  for (const route of routesToUpdate) {
    const files = await findRouteFiles(route);

    if (files.length === 0) {
      console.warn(`⚠️ No files found for route ${route}`);
      continue;
    }

    for (const file of files) {
      processedCount++;
      const updated = await updateFile(file);
      if (updated) updatedCount++;
    }
  }

  console.log(`\n✅ Updated ${updatedCount} out of ${processedCount} files`);
}

main().catch(console.error);
