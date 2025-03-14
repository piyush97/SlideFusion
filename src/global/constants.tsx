import { Home, LayoutTemplate, SettingsIcon } from "lucide-react";

export const APP_NAME = "Pitch Perfect - AI based Presentation Tool";
export const APP_DESCRIPTION =
  "Pitch Perfect is an AI based Presentation Tool that helps you create engaging presentations.";
export const DATA = {
  user: {
    name: "Piyush",
    email: "piyush@company.com",
    avatar: "/avatarss/piyush.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: LayoutTemplate,
    },
    {
      title: "Settings",
      url: "/settings",
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
