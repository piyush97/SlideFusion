import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aceternity.com",
        port: "",
        pathname: "/images/products/thumbnails/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        port: "",
        pathname: "/private/**", // Adjust pathname if needed, using a wildcard for now
      },
    ],
  },
  // Configure for Vercel deployment
  output: "standalone",
  distDir: ".next", // Make sure the output directory is .next
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
    // Add Turbopack configuration
    turbo: {
      // Updated Turbopack configuration using proper rules API
      rules: {
        // Define loaders for specific file extensions if needed
        ".svg": ["file"],
      },
    },
  },
  // Support for environment variables
  env: {
    NEXTJS_ENV: process.env.NEXTJS_ENV,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
  },
  // Add webpack configuration for optimizing bundle size
  webpack: (config, { dev, isServer }) => {
    // Split chunks to reduce individual bundle sizes
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        maxInitialRequests: 100, // Increased to allow more chunks
        maxAsyncRequests: 100, // Increased to allow more chunks
        minSize: 20000, // 20KB minimum size
        cacheGroups: {
          // React and related packages
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: "npm.react",
            priority: 50,
          },
          // Heavy visualization libraries
          recharts: {
            test: /[\\/]node_modules[\\/](recharts|d3-[^/]+)[\\/]/,
            name: "npm.dataviz",
            priority: 45,
          },
          // UI component libraries
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|cmdk|lucide-react|class-variance-authority|tailwind-merge)[\\/]/,
            name: "npm.ui-components",
            priority: 40,
          },
          // Form libraries
          forms: {
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
            name: "npm.forms",
            priority: 35,
          },
          // Date handling
          dates: {
            test: /[\\/]node_modules[\\/](date-fns|react-day-picker)[\\/]/,
            name: "npm.dates",
            priority: 30,
          },
          // General vendor splitting for node_modules - with more granular packages
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module: { context: string }) {
              // Extract npm package name
              const matches = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              );
              const packageName = matches ? matches[1] : "unknown";

              // Limit the length of chunk names to avoid issues
              const normalizedName = packageName.replace("@", "").split("/")[0];
              return `npm.${normalizedName.substring(0, 20)}`;
            },
            priority: 20,
            minSize: 10000, // 10KB
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
