#!/bin/bash

# Cloudflare Pages deployment script that handles size limitations

# Build the Next.js application
echo "🏗️ Building Next.js application..."
npm run build

# Create a temporary directory for deployment
TEMP_DIR=$(mktemp -d)
echo "📁 Created temporary directory: $TEMP_DIR"

# Copy .next directory to temp directory, excluding webpack cache
echo "📋 Copying build files (excluding webpack cache)..."
rsync -av --progress .next/ $TEMP_DIR/ --exclude cache/webpack

# Run the file size check on the cleaned directory
echo "🔍 Checking file sizes in the cleaned directory..."
LARGE_FILES=$(find "$TEMP_DIR" -type f -size +25M)

if [ -n "$LARGE_FILES" ]; then
  echo "⚠️ Large files found:"
  echo "$LARGE_FILES" | while read -r file; do
    size_bytes=$(stat -f %z "$file")
    size_mb=$(echo "scale=2; $size_bytes / 1024 / 1024" | bc)
    echo "⚠️  Found large file: $file ($size_mb MiB)"
  done
  echo "❌ Deployment aborted due to large files"
  exit 1
fi

# If no large files were found, proceed with deployment
echo "✅ No large files found, proceeding with deployment..."
echo "🚀 Deploying to Cloudflare Pages..."
npx wrangler pages deploy $TEMP_DIR --project-name=slidefusion --config=wrangler.jsonc

# Clean up
echo "🧹 Cleaning up temporary directory..."
rm -rf $TEMP_DIR

echo "✅ Deployment complete!"
