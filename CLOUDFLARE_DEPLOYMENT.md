# Cloudflare Pages Deployment Guide

This document outlines the process for deploying SlideFusion to Cloudflare Pages.

## Prerequisites

- Cloudflare account with Pages enabled
- Project already set up on Cloudflare Pages dashboard
- Node.js and npm installed locally

## Deployment Process

We've created optimized scripts for deploying to Cloudflare Pages. Choose one of the following methods:

### Method 1: Automated Deployment (Recommended)

Run the deploy script which handles build, optimization and deployment:

```bash
npm run deploy
```

This script:

1. Builds the Next.js application
2. Creates a temporary directory excluding webpack cache files
3. Checks for files exceeding Cloudflare's 25MB limit
4. Deploys the optimized build to Cloudflare Pages

### Method 2: Manual Step-by-Step Deployment

For more control over the process:

```bash
npm run deploy-manual
```

This runs each step individually and provides more verbose output.

### Preview Deployment

To preview your deployment locally before pushing to production:

```bash
npm run preview-cf
```

## Troubleshooting

If you encounter issues during deployment, run:

```bash
npm run cf-troubleshoot
```

This script checks:

- Wrangler configuration
- Large files exceeding Cloudflare's limits
- Node.js and package versions
- Next.js build setup

### Common Issues

1. **Files exceeding 25MB limit**: Cloudflare Pages has a 25MB per-file limit. Our webpack configuration should prevent this, but if it occurs, check `cf-troubleshoot.sh` output.

2. **Webpack cache files**: The webpack cache directory can contain large files that exceed Cloudflare's limits. Our deploy script excludes these.

3. **Configuration conflicts**: Ensure your `wrangler.jsonc` has the correct configuration for Pages, with `pages_build_output_dir` set to `.next`.

## Configuration Details

### Key Files

- **wrangler.jsonc**: Cloudflare Pages configuration
- **next.config.ts**: Next.js and webpack optimization settings
- **deploy.sh**: Optimized deployment script
- **check-file-sizes.sh**: Script to identify large files
- **cf-troubleshoot.sh**: Deployment troubleshooting helper

### Webpack Optimization

We've implemented a carefully tuned webpack configuration in `next.config.ts` that:

- Splits chunks to stay under Cloudflare's 25MB limit
- Breaks dependencies into logical groups based on type
- Optimizes bundle size for better performance

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
