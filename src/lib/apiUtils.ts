import { ApiResponse } from "./types";

/**
 * Creates a standardized error response
 * @param message Error message to return
 * @param status HTTP status code
 * @returns Standardized API error response
 */
export function createErrorResponse(
  message: string,
  status: number = 500
): ApiResponse {
  console.error(`API Error (${status}): ${message}`);
  return {
    status,
    error: message,
  };
}

/**
 * Creates a standardized success response
 * @param data Data payload to return
 * @param status HTTP status code
 * @returns Standardized API success response
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200
): ApiResponse<T> {
  return {
    status,
    data,
  };
}

/**
 * Handles errors in server actions with proper logging and response formatting
 * @param error The caught error
 * @param defaultMessage Default error message if none can be extracted from the error
 * @returns Standardized error response
 */
export function handleServerActionError(
  error: unknown,
  defaultMessage: string = "An unexpected error occurred"
): ApiResponse {
  console.error("Server action error:", error);

  // Handle OpenAI API errors
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
  ) {
    // OpenAI API returns error with status and message
    if (
      "error" in error &&
      typeof error.error === "object" &&
      error.error !== null
    ) {
      const openaiError = error.error as { message?: string; type?: string };
      if (openaiError.message) {
        // For rate limits, pass through the 429 status
        if (error.status === 429) {
          return createErrorResponse(
            `OpenAI API rate limit exceeded. ${openaiError.message}`,
            429
          );
        }
        return createErrorResponse(
          `OpenAI API error: ${openaiError.message}`,
          error.status >= 400 && error.status < 600 ? error.status : 500
        );
      }
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return createErrorResponse(error.message);
  }

  // Handle string errors
  if (typeof error === "string") {
    return createErrorResponse(error);
  }

  // Default fallback
  return createErrorResponse(defaultMessage);
}

/**
 * Validates an input string against potential injection patterns
 * @param input String to validate
 * @param fieldName Field name for error messages
 * @returns ValidationResult object with isValid and optional error message
 */
export function validateInput(
  input: string,
  fieldName: string = "Input"
): { isValid: boolean; error?: string } {
  if (!input) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  // Check for potential SQL injection patterns
  const sqlInjectionPattern =
    /('|"|;|--|\/\*|\*\/|xp_|exec|select|update|delete|insert|from|where|union|drop|alter|create)/i;
  if (sqlInjectionPattern.test(input)) {
    return {
      isValid: false,
      error: `${fieldName} contains disallowed characters or patterns`,
    };
  }

  // Check for very long inputs that could be used for DoS
  if (input.length > 5000) {
    return {
      isValid: false,
      error: `${fieldName} exceeds maximum allowed length (5000 characters)`,
    };
  }

  return { isValid: true };
}
