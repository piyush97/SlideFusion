#!/bin/bash

# Script to build and run Docker container for SlideFusion

set -e

# Colors for console output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}SlideFusion Docker Build Script${NC}"
echo "==============================="

# Check if .env file exists
if [ ! -f .env ]; then
  echo -e "${RED}Error: .env file not found!${NC}"
  echo "Please create a .env file with the required environment variables:"
  echo "  CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key"
  echo "  CLERK_SECRET_KEY=your_clerk_secret_key"
  echo "  DATABASE_URL=your_database_url"
  exit 1
fi

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Function to check if Docker is running
check_docker() {
  if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running or not installed.${NC}"
    echo "Please start Docker Desktop or install Docker."
    exit 1
  fi
}

# Build Docker image
build_image() {
  echo -e "${BLUE}Building Docker image...${NC}"
  docker build \
    --build-arg CLERK_PUBLISHABLE_KEY="$CLERK_PUBLISHABLE_KEY" \
    --build-arg CLERK_SECRET_KEY="$CLERK_SECRET_KEY" \
    --build-arg DATABASE_URL="$DATABASE_URL" \
    -t slidefusion:latest .
}

# Run Docker container
run_container() {
  echo -e "${BLUE}Running Docker container...${NC}"
  docker run -p 3000:3000 \
    -e CLERK_PUBLISHABLE_KEY="$CLERK_PUBLISHABLE_KEY" \
    -e CLERK_SECRET_KEY="$CLERK_SECRET_KEY" \
    -e DATABASE_URL="$DATABASE_URL" \
    -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$CLERK_PUBLISHABLE_KEY" \
    slidefusion:latest
}

# Run Docker Compose
run_compose() {
  echo -e "${BLUE}Running Docker Compose...${NC}"
  docker-compose up -d
}

# Run Docker Compose for development
run_compose_dev() {
  echo -e "${BLUE}Running Docker Compose for development...${NC}"
  docker-compose -f docker-compose.dev.yml up -d
}

# Display usage
usage() {
  echo "Usage: $0 [build|run|compose|compose:dev|all]"
  echo "  build      - Build the Docker image"
  echo "  run        - Run the Docker container"
  echo "  compose    - Run with Docker Compose (production)"
  echo "  compose:dev - Run with Docker Compose (development)"
  echo "  all        - Build and run with Docker"
}

# Main logic
check_docker

case "$1" in
  build)
    build_image
    ;;
  run)
    run_container
    ;;
  compose)
    run_compose
    ;;
  compose:dev)
    run_compose_dev
    ;;
  all)
    build_image
    run_container
    ;;
  *)
    usage
    ;;
esac

echo -e "${GREEN}Done!${NC}"
