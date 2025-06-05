// Re-export all configuration modules for easy importing
export {
  APP_DESCRIPTION,
  APP_NAME,
  CreatePageCard,
  DASHBOARD_SIDEBAR_ITEMS,
  DATA,
  DEFAULT_ANIMATION_DELAY,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_PLACEHOLDER_IMAGE,
  DESKTOP_BREAKPOINT,
  IS_WAITLIST_MODE,
  MOBILE_BREAKPOINT,
  ROUTES,
  TABLET_BREAKPOINT,
  WAITLIST_PATH,
} from "./app";

export { COMPONENT_GROUPS } from "./components";
export { LAYOUT_GROUPS } from "./layouts";
export { THEMES } from "./themes";

// Backward compatibility exports
import {
  containerVariants as containerVar,
  itemVariant as itemVar,
} from "./animations";
import { COMPONENT_GROUPS } from "./components";
import { LAYOUT_GROUPS } from "./layouts";
import { THEMES } from "./themes";

export const themes = THEMES;
export const layouts = LAYOUT_GROUPS;
export const component = COMPONENT_GROUPS;
export const containerVariants = containerVar;
export const itemVariant = itemVar;

// Combined exports for backward compatibility
export const SLIDE_LAYOUT_GROUPS = LAYOUT_GROUPS;
export const SLIDE_COMPONENT_GROUPS = COMPONENT_GROUPS;
