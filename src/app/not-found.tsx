"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="mb-2 text-3xl font-bold text-gray-800 dark:text-gray-200">
          404 - Page Not Found
        </h2>

        <p className="mb-6 text-gray-600 dark:text-gray-300">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="px-6 py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
