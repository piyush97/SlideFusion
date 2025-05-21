#!/bin/bash

# Cloudflare Pages Deployment Troubleshooter
# This script helps diagnose issues with Cloudflare Pages deployments

echo "🔍 Cloudflare Pages Deployment Troubleshooter"
echo "==============================================="
echo ""

# Check wrangler installation
echo "📦 Checking wrangler installation..."
if command -v npx wrangler &> /dev/null; then
  WRANGLER_VERSION=$(npx wrangler --version)
  echo "✅ Wrangler is installed: $WRANGLER_VERSION"
else
  echo "❌ Wrangler is not installed. Please run: npm install -g wrangler"
  exit 1
fi

# Check Node.js version
echo "🟢 Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "ℹ️ Node.js version: $NODE_VERSION"

# Check npm version
echo "📦 Checking npm version..."
NPM_VERSION=$(npm --version)
echo "ℹ️ npm version: $NPM_VERSION"

# Check Next.js version
echo "⚡ Checking Next.js version..."
NEXT_VERSION=$(grep "\"next\":" package.json | awk -F: '{print $2}' | sed 's/[", ]//g')
echo "ℹ️ Next.js version: $NEXT_VERSION"

# Check if .next directory exists
echo "📂 Checking if .next directory exists..."
if [ -d ".next" ]; then
  echo "✅ .next directory exists"
else
  echo "❌ .next directory does not exist. Run 'npm run build' first."
  exit 1
fi

# Check wrangler.jsonc
echo "📄 Checking wrangler.jsonc configuration..."
if [ -f "wrangler.jsonc" ]; then
  echo "✅ wrangler.jsonc exists"
  
  # Check for pages_build_output_dir
  if grep -q "pages_build_output_dir" wrangler.jsonc; then
    echo "✅ pages_build_output_dir is configured"
  else
    echo "❌ pages_build_output_dir is not configured in wrangler.jsonc"
  fi
  
  # Check for incompatible settings
  if grep -q "\"main\":" wrangler.jsonc && grep -q "\"pages_build_output_dir\":" wrangler.jsonc; then
    echo "⚠️ Warning: Both 'main' and 'pages_build_output_dir' are set in wrangler.jsonc, which can cause conflicts"
  fi
else
  echo "❌ wrangler.jsonc does not exist"
fi

# Check for large files
echo "📏 Checking for files exceeding Cloudflare's 25MB limit..."
LARGE_FILES=$(find .next -type f -size +25M)
if [ -n "$LARGE_FILES" ]; then
  echo "⚠️ Large files found:"
  echo "$LARGE_FILES" | while read -r file; do
    size_bytes=$(stat -f %z "$file")
    size_mb=$(echo "scale=2; $size_bytes / 1024 / 1024" | bc)
    echo "⚠️ $file ($size_mb MiB)"
  done
else
  echo "✅ No large files found"
fi

# Check webpack cache
echo "🧠 Checking webpack cache..."
if [ -d ".next/cache/webpack" ]; then
  WEBPACK_CACHE_SIZE=$(du -sh .next/cache/webpack | awk '{print $1}')
  echo "ℹ️ Webpack cache size: $WEBPACK_CACHE_SIZE"
  
  # Check for large webpack files
  LARGE_WEBPACK_FILES=$(find .next/cache/webpack -type f -size +25M)
  if [ -n "$LARGE_WEBPACK_FILES" ]; then
    echo "⚠️ Large webpack cache files found (these will be excluded by deploy.sh):"
    echo "$LARGE_WEBPACK_FILES" | while read -r file; do
      size_bytes=$(stat -f %z "$file")
      size_mb=$(echo "scale=2; $size_bytes / 1024 / 1024" | bc)
      echo "⚠️ $file ($size_mb MiB)"
    done
  else
    echo "✅ No large webpack cache files found"
  fi
else
  echo "ℹ️ No webpack cache directory found"
fi

# Output some tips
echo ""
echo "📝 Troubleshooting tips:"
echo "1. If deployment fails due to file size, run './deploy.sh' which excludes webpack cache"
echo "2. Make sure wrangler.jsonc has 'pages_build_output_dir' set to '.next'"
echo "3. Ensure you've specified --project-name in your deployment command"
echo "4. If needed, run 'npm run deploy-manual' for a step-by-step approach"
echo ""
echo "🔗 Cloudflare Pages Documentation: https://developers.cloudflare.com/pages/"

# Final summary
echo ""
echo "✨ Troubleshooting complete"
