# Docker Deployment Guide

This document outlines the process for building and deploying SlideFusion using Docker.

## Prerequisites

- Docker installed on your system
- Environment variables prepared in a `.env` file

## Environment Setup

Create a `.env` file in the project root with the following variables:

```
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_database_url
```

## Deployment Methods

### Method 1: Using the Convenience Scripts

We've created scripts to simplify Docker deployment. Choose one of the following methods:

```bash
# Build the Docker image
npm run docker:build

# Run the Docker container
npm run docker:run

# Use Docker Compose (recommended for development)
npm run docker:compose

# Build and run in one command
npm run docker
```

### Method 2: Manual Docker Commands

If you prefer manual Docker commands:

```bash
# Build the image
docker build \
  --build-arg CLERK_PUBLISHABLE_KEY="$CLERK_PUBLISHABLE_KEY" \
  --build-arg CLERK_SECRET_KEY="$CLERK_SECRET_KEY" \
  --build-arg DATABASE_URL="$DATABASE_URL" \
  -t slidefusion:latest .

# Run a container
docker run -p 3000:3000 \
  -e CLERK_PUBLISHABLE_KEY="$CLERK_PUBLISHABLE_KEY" \
  -e CLERK_SECRET_KEY="$CLERK_SECRET_KEY" \
  -e DATABASE_URL="$DATABASE_URL" \
  -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$CLERK_PUBLISHABLE_KEY" \
  slidefusion:latest
```

### Method 3: Docker Compose

For the most streamlined approach:

```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## Docker Configuration Details

### Key Files

- **Dockerfile**: Builds the application in multiple stages for optimal size
- **docker-compose.yml**: Configuration for running the containerized application
- **docker-build.sh**: Helper script for Docker operations

### Build Process

The Docker build uses a multi-stage process:

1. **deps stage**: Installs dependencies
2. **builder stage**: Compiles the application
3. **runner stage**: Creates a minimal production image

### Security Considerations

- The application runs as a non-root user (nextjs)
- Only necessary files are copied to the final image
- Environment variables are passed securely through build args

## Troubleshooting

### Common Issues

1. **Environment variables missing**: Ensure your `.env` file is properly set up with all required variables.

2. **Build errors**: If you encounter build errors, try running without Bun's frozen lockfile:
   ```bash
   docker build -t slidefusion:debug --progress=plain .
   ```

3. **Container crashes**: Check logs with:
   ```bash
   docker logs $(docker ps -q -f ancestor=slidefusion:latest)
   ```

## Production Deployment

For production deployment, consider:

1. Using a Docker registry to store and distribute your images
2. Setting up CI/CD pipelines for automated builds
3. Using orchestration tools like Kubernetes for scale
4. Implementing proper health checks and monitoring

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Bun Docker Documentation](https://bun.sh/guides/ecosystem/docker)
