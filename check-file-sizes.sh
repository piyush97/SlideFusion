#!/bin/bash

# Script to check for files exceeding Cloudflare Pages size limit (25MB)
# Run this before deployment to identify problematic files

SIZE_LIMIT_BYTES=$((25 * 1024 * 1024)) # 25MB in bytes
NEXT_OUTPUT_DIR=".next"

echo "🔍 Scanning $NEXT_OUTPUT_DIR for files larger than 25MB..."

find "$NEXT_OUTPUT_DIR" -type f -size +${SIZE_LIMIT_BYTES}c | while read -r file; do
  size_bytes=$(stat -f %z "$file")
  size_mb=$(echo "scale=2; $size_bytes / 1024 / 1024" | bc)
  
  echo "⚠️  Found large file: $file ($size_mb MiB)"
done

echo "✅ Scan complete"

# Check specifically for large webpack packs
large_packs=$(find "$NEXT_OUTPUT_DIR/cache/webpack" -name "*.pack" -size +${SIZE_LIMIT_BYTES}c)

if [ -n "$large_packs" ]; then
  echo "❗ Found large webpack pack files that exceed Cloudflare's 25MB limit:"
  echo "$large_packs"
  echo ""
  echo "Consider adjusting the webpack configuration in next.config.ts to split these chunks further."
  exit 1
else
  echo "✅ No large webpack pack files found."
  exit 0
fi
