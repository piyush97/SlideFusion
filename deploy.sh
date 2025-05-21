#!/bin/bash

# Vercel Deployment Script

echo "🏗️ Building Next.js application for Vercel deployment..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Please check the error messages above."
  exit 1
fi

echo "✅ Build completed successfully!"
echo "🚀 Deploying to Vercel..."

# Use Vercel CLI to deploy
vercel deploy --prod

echo "✅ Deployment complete!"
