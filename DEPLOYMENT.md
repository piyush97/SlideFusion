# Deployment Guide

This guide covers deployment options for SlideFusion in various environments.

## Deployment Options

SlideFusion supports multiple deployment options:

1. **Vercel** - Recommended for production
2. **Docker** - Good for consistent environments and CI/CD pipelines
3. **Standalone Server** - Traditional Node.js deployment
4. **Local Development** - For development and testing

## 1. Vercel Deployment

Vercel is the recommended platform for deploying Next.js applications, providing a seamless experience with zero configuration.

### Automated Deployment

The easiest way to deploy to Vercel:

```bash
npm run deploy      # Deploy to preview environment
npm run deploy:prod # Deploy to production
```

### Manual Deployment with Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your project in the Vercel dashboard at https://vercel.com/new
3. Configure the following settings:
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
4. Configure environment variables in the Vercel dashboard
5. Deploy!

### Environment Variables

The following environment variables should be configured in your Vercel project:

```
NEXTJS_ENV=production
DATABASE_URL=your_database_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
```

## 2. Docker Deployment

Docker provides consistent environments across development and production.

### Using Docker

```bash
# Build and run Docker container
npm run docker
```

For comprehensive Docker instructions, see [Docker Deployment Guide](./DOCKER_DEPLOYMENT.md).

## 3. Standalone Server Deployment

For traditional hosting environments:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Requirements

- Node.js 18+ or Bun 1.0+
- Properly configured environment variables
- Database connection (PostgreSQL recommended)

## 4. Local Development

For local development:

```bash
# Start development server
npm run dev
```

## Environment Variables

All deployment methods require proper environment variables:

```
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_database_url

# Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/callback
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/callback

# Optional: OpenAI for AI features
OPENAI_API_KEY=your_openai_api_key
```

## CI/CD Integration

For automated builds and deployments, we include:

- GitHub Actions workflows for CI/CD
- Automated testing before deployment
- Bundle size and performance checks

See `.github/workflows` for configuration details.

## Performance Considerations

For optimal performance:

1. **Content Delivery Network (CDN)**: All deployment methods benefit from a CDN. Cloudflare Pages includes this automatically.

2. **Database Location**: Keep the database close to your serverless functions for lower latency.

3. **Optimized Images**: Use Next.js image optimization and consider a service like Cloudinary or imgix.

4. **Monitoring**: Set up monitoring to track performance issues.

## Troubleshooting

For deployment issues:

1. **Cloudflare Pages**: Run `npm run cf-troubleshoot`
2. **Docker**: Check container logs with `docker logs container_name`
3. **General Issues**: Verify environment variables and database connection

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Docker Documentation](https://docs.docker.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
