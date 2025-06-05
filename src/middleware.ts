import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { IS_WAITLIST_MODE, WAITLIST_PATH } from "./config";

const isPublicRoute = createRouteMatcher([
  "/signin(.*)",
  "/signup(.*)",
  "/(.*)",
  "/api/webhook(.*)",
  `${WAITLIST_PATH}(.*)`,
]);

export default clerkMiddleware(async (auth, req) => {
  const url = new URL(req.nextUrl.origin);

  // Handle waitlist mode redirects
  if (IS_WAITLIST_MODE) {
    // If trying to access auth routes in waitlist mode, redirect to waitlist
    if (
      req.nextUrl.pathname.startsWith("/signin") ||
      req.nextUrl.pathname.startsWith("/signup")
    ) {
      url.pathname = WAITLIST_PATH;
      return NextResponse.redirect(url);
    }
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
