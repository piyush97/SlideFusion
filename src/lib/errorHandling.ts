import { toast } from "sonner";
import { ApiResponse } from "./types";

/**
 * Error handling options
 */
interface ErrorHandlingOptions {
  // Default error message if none provided
  defaultMessage?: string;
  // Function to execute on 429 rate limit errors
  onRateLimit?: (resetInSeconds: number) => void;
  // Function to execute on auth errors (401/403)
  onAuthError?: () => void;
  // Function to execute after error handling
  onComplete?: () => void;
  // Whether to log errors to console
  logErrors?: boolean;
}

/**
 * Handles API errors consistently across the application
 * @param response The API response to handle
 * @param options Additional options for handling errors
 * @returns True if no error, false if error was handled
 */
export function handleApiError(
  response: ApiResponse,
  options: ErrorHandlingOptions = {}
): boolean {
  const {
    defaultMessage = "An unexpected error occurred",
    onRateLimit,
    onAuthError,
    onComplete,
    logErrors = true,
  } = options;

  // If no error or status is OK, return true (no error)
  if (!response.error && response.status >= 200 && response.status < 300) {
    if (onComplete) onComplete();
    return true;
  }

  // Log errors to console if enabled
  if (logErrors) {
    console.error(
      `API Error (${response.status}):`,
      response.error || defaultMessage
    );
  }

  // Handle specific error types
  switch (response.status) {
    case 429: // Rate Limit
      const match =
        response.error?.match(/try again in (\d+) seconds?/i) ||
        response.error?.match(/try again in (\d+) minutes?/i);
      const resetInSeconds = match ? parseInt(match[1]) : 60;

      toast.error("Rate limit exceeded", {
        description: response.error || "Please try again later",
      });

      if (onRateLimit) {
        onRateLimit(resetInSeconds);
      }
      break;

    case 401:
    case 403:
      toast.error("Authentication error", {
        description: response.error || "Please sign in again",
      });

      if (onAuthError) {
        onAuthError();
      }
      break;

    case 400:
      toast.error("Invalid request", {
        description: response.error || "Please check your input",
      });
      break;

    case 404:
      toast.error("Not found", {
        description: response.error || "The requested resource was not found",
      });
      break;

    default:
      toast.error("Error", {
        description: response.error || defaultMessage,
      });
  }

  if (onComplete) onComplete();
  return false;
}

/**
 * Format time in a human-readable way
 * @param seconds Time in seconds
 * @returns Formatted time string
 */
export function formatTimeRemaining(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } else if (seconds < 3600) {
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.ceil((seconds % 3600) / 60);
    return `${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minute${
      minutes !== 1 ? "s" : ""
    }`;
  }
}
