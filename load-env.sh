#!/bin/bash

# Script to load environment variables from .dev.vars for development
if [ -f .dev.vars ]; then
  echo "Loading environment variables from .dev.vars..."
  export $(grep -v '^#' .dev.vars | xargs)
  
  # Output loaded variables without showing their values (for security)
  echo "Loaded variables:"
  grep -v '^#' .dev.vars | cut -d= -f1 | xargs -I{} echo "- {}"
  
  echo "Environment variables loaded successfully."
else
  echo "No .dev.vars file found. Skipping environment variable loading."
fi
