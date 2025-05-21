# Deployment Guide

This guide covers deployment options for SlideFusion in various environments.

## Deployment Options

SlideFusion supports multiple deployment options:

1. **Cloudflare Pages** - Recommended for production
2. **Docker** - Good for consistent environments and CI/CD pipelines
3. **Standalone Server** - Traditional Node.js deployment
4. **Local Development** - For development and testing

## 1. Cloudflare Pages Deployment

Cloudflare Pages provides a globally distributed, serverless platform ideal for Next.js applications.

### Automated Deployment

The easiest way to deploy to Cloudflare Pages:

```bash
npm run deploy
```

This script:

- Builds the Next.js application
- Removes webpack cache files that exceed size limits
- Checks for other large files
- Deploys to Cloudflare Pages

For detailed instructions, see [Cloudflare Pages Deployment Guide](./CLOUDFLARE_DEPLOYMENT.md).

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
