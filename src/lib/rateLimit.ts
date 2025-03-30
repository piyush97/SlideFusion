/**
 * Simple in-memory rate limiting utility for server actions
 * For production use, consider using Redis or another distributed cache
 */

// Store for rate limit data
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

type RateLimitStore = {
  [key: string]: RateLimitEntry;
};

const store: RateLimitStore = {};

// Clean up expired entries periodically (every 5 minutes)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    Object.keys(store).forEach((key) => {
      if (store[key].resetAt <= now) {
        delete store[key];
      }
    });
  }, 5 * 60 * 1000);
}

interface RateLimitOptions {
  // Maximum number of requests allowed in the time window
  limit: number;
  // Time window in seconds
  windowSizeInSeconds: number;
  // Optional identifier function (defaults to using the user ID)
  identifierFn?: (userId: string) => string;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: Date;
}

/**
 * Check if a request exceeds the rate limit
 * @param userId The user identifier (e.g., Clerk user ID)
 * @param action The action identifier (e.g., 'generate-ai-prompt')
 * @param options Rate limiting options
 * @returns Rate limit check result
 */
export function checkRateLimit(
  userId: string,
  action: string,
  options: RateLimitOptions
): RateLimitResult {
  const {
    limit = 10,
    windowSizeInSeconds = 60,
    identifierFn = (id) => id,
  } = options;

  const identifier = identifierFn(userId);
  const key = `${identifier}:${action}`;
  const now = Date.now();
  const windowSizeMs = windowSizeInSeconds * 1000;

  // Initialize or retrieve the entry
  if (!store[key] || store[key].resetAt <= now) {
    store[key] = {
      count: 1,
      resetAt: now + windowSizeMs,
    };

    return {
      success: true,
      limit,
      remaining: limit - 1,
      resetAt: new Date(now + windowSizeMs),
    };
  }

  // Check if limit is exceeded
  if (store[key].count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      resetAt: new Date(store[key].resetAt),
    };
  }

  // Increment count and return
  store[key].count += 1;
  return {
    success: true,
    limit,
    remaining: limit - store[key].count,
    resetAt: new Date(store[key].resetAt),
  };
}
