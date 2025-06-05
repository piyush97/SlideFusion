import { Home, LayoutTemplate, SettingsIcon, TrashIcon } from "lucide-react";

// Application constants
export const APP_NAME = "SlideFusion - AI based Presentation Tool";
export const APP_DESCRIPTION =
  "SlideFusion is an AI based Presentation Tool that helps you create engaging presentations.";

// Feature flags
export const IS_WAITLIST_MODE =
  process.env.NEXT_PUBLIC_WAITLIST_MODE === "true";

// Navigation paths
export const WAITLIST_PATH = "/waitlist";

// Common placeholder image URL
export const DEFAULT_PLACEHOLDER_IMAGE =
  "https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Dashboard sidebar configuration
export const DASHBOARD_SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    url: "#",
    icon: "Home",
  },
  {
    title: "Projects",
    url: "#",
    icon: "LayoutTemplate",
  },
  {
    title: "Settings",
    url: "#",
    icon: "SettingsIcon",
  },
  {
    title: "Trash",
    url: "#",
    icon: "TrashIcon",
  },
];

// Animation configurations
export const DEFAULT_ANIMATION_DURATION = 0.3;
export const DEFAULT_ANIMATION_DELAY = 0.1;

// Layout breakpoints
export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;
export const DESKTOP_BREAKPOINT = 1280;

// Routes configuration
export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  templates: "/templates",
  settings: "/settings",
  presentation: "/presentation",
  signin: "/signin",
  signup: "/signup",
  signout: "/signout",
  trash: "/trash",
  waitlist: WAITLIST_PATH,
};

// User data for sidebar
export const DATA = {
  user: {
    name: "Piyush",
    email: "piyush@company.com",
    avatar: "/avatarss/piyush.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: ROUTES.dashboard,
      icon: Home,
    },
    {
      title: "Templates",
      url: ROUTES.templates,
      icon: LayoutTemplate,
    },
    {
      title: "Trash",
      url: ROUTES.trash,
      icon: TrashIcon,
    },
    {
      title: "Settings",
      url: ROUTES.settings,
      icon: SettingsIcon,
    },
  ],
};

// Create Page Card configuration
export const CreatePageCard: {
  title: string;
  highlightedText: string;
  description: string;
  type: string;
  highlight?: boolean;
}[] = [
  {
    title: "Use a",
    highlightedText: "Template",
    description: "Write a prompt and leave everything else for us to handle",
    type: "template",
  },
  {
    title: "Generate with",
    highlightedText: "Creative AI",
    description: "Write a prompt and leave everything else for us to handle",
    type: "creative-ai",
    highlight: true,
  },
  {
    title: "Start from",
    highlightedText: "Scratch",
    description: "Write a prompt and leave everything else for us to handle",
    type: "create-scratch",
  },
];
