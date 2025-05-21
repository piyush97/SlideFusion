#!/bin/bash
set -e

# Check for preview command
if [ "$1" = "preview" ]; then
  echo "Running Next.js build..."
  next build
  
  echo "Setting up for Cloudflare Pages deployment..."
  
  # Create temporary directory
  TEMP_DIR=$(mktemp -d)
  echo "Created temporary directory: $TEMP_DIR"
  
  # Copy the build directory
  echo "Copying .next build directory to temp location..."
  cp -r .next $TEMP_DIR/
  cp -r public $TEMP_DIR/public
  
  # Create a simple Cloudflare Pages worker
  mkdir -p $TEMP_DIR/functions
  
  # Create _worker.js file that will handle requests
  cat > $TEMP_DIR/functions/_worker.js << EOL
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve static assets from /.next/static
    if (url.pathname.startsWith('/_next/static')) {
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) {
        return asset;
      }
    }
    
    // Serve public files
    if (url.pathname.startsWith('/public/')) {
      const publicPath = url.pathname.replace('/public/', '/');
      const asset = await env.ASSETS.fetch(new Request(\`\${url.origin}\${publicPath}\`, request));
      if (asset.status !== 404) {
        return asset;
      }
    }
    
    // Default response
    return new Response("Next.js app is being configured for Cloudflare Pages deployment", {
      headers: { "Content-Type": "text/html" },
    });
  }
};
EOL
  
  # Create wrangler.toml in the temp directory
  cat > $TEMP_DIR/wrangler.toml << EOL
name = "pitch-perfect"
main = "functions/_worker.js"
compatibility_date = "2025-05-21"
compatibility_flags = ["nodejs_compat"]

[site]
bucket = "."
EOL
  
  # Change to the temporary directory
  cd $TEMP_DIR
  
  # Install dependencies without PnP
  echo "Installing wrangler..."
  npm install --no-package-lock --legacy-peer-deps wrangler@latest
  
  # Run wrangler
  echo "Running wrangler pages dev..."
  npx wrangler pages dev . --compatibility-date=2025-05-21 --compatibility-flag=nodejs_compat
  
  # Clean up
  echo "Cleaning up..."
  cd -
  rm -rf $TEMP_DIR
  exit 0
fi

# Regular build flow
echo "Running Next.js build with passed arguments"
next build "$@"

# Copy files only if not in a CI environment
if [ -z "$CI" ]; then
  cp -r ./public ./.next/standalone/public
  cp -r ./.next/static ./.next/standalone/.next/static
fi