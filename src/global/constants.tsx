import { Home, LayoutTemplate, SettingsIcon } from "lucide-react";

export const APP_NAME = "Pitch Perfect - AI based Presentation Tool";
export const APP_DESCRIPTION =
  "Pitch Perfect is an AI based Presentation Tool that helps you create engaging presentations.";

export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  templates: "/templates",
  settings: "/settings",
  presentation: "/presentation",
  signin: "/signin",
  signup: "/signup",
  signout: "/signout",
};

export const DATA = {
  user: {
    name: "Piyush",
    email: "piyush@company.com",
    avatar: "/avatarss/piyush.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: ROUTES.dashboard,
      icon: Home,
    },
    {
      title: "Templates",
      url: ROUTES.templates,
      icon: LayoutTemplate,
    },
    {
      title: "Settings",
      url: ROUTES.settings,
      icon: SettingsIcon,
    },
  ],
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};
