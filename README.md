<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/d99d4a5c-c3b7-4c3b-b544-4c4529ccdca6#gh-dark-mode-only">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/08428952-4c74-4919-9b8e-fe5d424917d3#gh-light-mode-only">
  <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="https://github.com/user-attachments/assets/08428952-4c74-4919-9b8e-fe5d424917d3">
</picture>

# 🎯 SlideFusion

**Transform Ideas into Impressive Presentations with AI**

SlideFusion is a cutting-edge AI-powered presentation tool that revolutionizes how you create business pitches and professional presentations. Leveraging advanced artificial intelligence, it helps entrepreneurs, business professionals, and teams create stunning presentations in minutes rather than hours.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.8-green?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🚀 Technologies](#-technologies)
- [⚡ Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🐳 Docker Support](#-docker-support)
- [📖 API Documentation](#-api-documentation)
- [🏗️ Architecture](#️-architecture)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

## 🌟 Features

### 🎨 AI-Powered Creation

- **Creative AI Generation**: Transform simple prompts into comprehensive presentation outlines with structured content
- **Auto-Generated Images**: AI creates contextually relevant visuals using DALL-E integration
- **Smart Content Adaptation**: Intelligent layout suggestions based on your content type and audience

### 🎯 Professional Design

- **Theme Selection**: 15+ professionally designed themes with customizable colors and fonts
- **Smart Layouts**: 13+ layout types including accent layouts, multi-column designs, and image-focused presentations
- **Responsive Design**: Optimized for both desktop presentations and mobile viewing
- **Dark/Light Mode**: Built-in theme switching for comfortable viewing in any environment

### 🔧 Advanced Functionality

- **Real-time Collaboration**: Multi-user editing with live updates and conflict resolution
- **Drag & Drop Interface**: Intuitive slide reordering and content management
- **Project Management**: Organize presentations with version history and recovery options
- **Presentation Mode**: Full-screen presentation view with keyboard navigation
- **Export Capabilities**: Multiple export formats for sharing and distribution

### 🛡️ Enterprise Ready

- **User Authentication**: Secure authentication powered by Clerk
- **Waitlist Mode**: Configurable waitlist functionality for staged rollouts
- **Database Integration**: Robust data persistence with Prisma and PostgreSQL
- **Error Handling**: Comprehensive error boundaries and user feedback systems

## 🚀 Technologies

### Frontend Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router and server components
- **[React 19](https://react.dev/)** - Latest React with concurrent features and improved hooks
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Type-safe JavaScript with latest features
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Zustand 5.0](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[React DnD 16.0](https://react-dnd.github.io/react-dnd/)** - Drag and drop functionality

### Backend & Database

- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless functions
- **[Prisma 6.8](https://www.prisma.io/)** - Next-generation ORM with type safety
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[OpenAI API](https://openai.com/)** - GPT-4 for content generation and DALL-E for images

### Authentication & Security

- **[Clerk](https://clerk.com/)** - Complete authentication solution with user management
- **[@clerk/nextjs](https://clerk.com/docs/nextjs)** - Next.js integration with server-side support

### UI Components & Design

- **[Radix UI](https://www.radix-ui.com/)** - Headless, accessible UI primitives
- **[Shadcn UI](https://ui.shadcn.com/)** - Beautiful components built on Radix
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Perfect dark mode support

### Development & Testing

- **[ESLint](https://eslint.org/)** - Code linting with Next.js configuration
- **[Jest 29](https://jestjs.io/)** - JavaScript testing framework
- **[Cypress 14](https://www.cypress.io/)** - End-to-end testing solution
- **[@testing-library](https://testing-library.com/)** - Simple and complete testing utilities

### Build & Deployment

- **[Turbopack](https://turbo.build/pack)** - Next-generation bundler for development
- **[Vercel](https://vercel.com/)** - Optimal deployment platform for Next.js
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Alternative deployment with edge optimization
- **[Docker](https://www.docker.com/)** - Containerization support with Bun runtime

## ⚡ Quick Start

Get SlideFusion running locally in under 5 minutes:

```bash
# Clone the repository
git clone https://github.com/slidefusion/slidefusion.git
cd slidefusion

# Install dependencies (use your preferred package manager)
bun install
# or npm install / yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Initialize the database
npx prisma migrate dev

# Start the development server
bun dev
# or npm run dev

# Open your browser
open http://localhost:3000
```

## 🔧 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js 18+** and package manager (npm/yarn/bun)
- **PostgreSQL database** (local or hosted)
- **OpenAI API key** for AI features
- **Clerk account** for authentication

### Environment Setup

1. **Clone and install dependencies**

   ```bash
   git clone https://github.com/slidefusion/slidefusion.git
   cd slidefusion
   bun install  # or npm install / yarn install
   ```

2. **Configure environment variables**

   Create `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/slidefusion"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
   CLERK_SECRET_KEY=sk_test_your_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/signin
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # OpenAI
   OPENAI_API_KEY=sk-your_openai_api_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # (Optional) Seed the database
   npx prisma db seed
   ```

4. **Start development server**

   ```bash
   # Standard development mode
   bun dev

   # With Turbopack (faster)
   bun run dev

   # With debugging
   bun run dev:inspect
   ```

### Available Scripts

```bash
# Development
bun dev              # Start dev server with Turbopack
bun run dev:webpack  # Start dev server with Webpack
bun run dev:inspect  # Start with Node.js inspector

# Building & Production
bun run build       # Build for production
bun start           # Start production server
bun run lint        # Run ESLint

# Testing
bun test            # Run Jest tests
bun run test:e2e    # Run Cypress tests
bun run test:e2e:ui # Open Cypress test UI

# Database
bun run postinstall # Generate Prisma client

# Deployment
bun run deploy      # Deploy to Vercel preview
bun run deploy:prod # Deploy to Vercel production
```

## 🧪 Testing

SlideFusion includes comprehensive testing setup with both unit and end-to-end testing capabilities.

### Testing Stack

- **Jest 29** - Unit and integration testing
- **Cypress 14** - End-to-end testing
- **@testing-library/react** - React component testing utilities
- **@testing-library/cypress** - Enhanced Cypress testing utilities

### Running Tests

```bash
# Unit Tests with Jest
bun test                    # Run all Jest tests
bun test --watch           # Run tests in watch mode
bun test --coverage        # Generate coverage report

# End-to-End Tests with Cypress
bun run cypress:open       # Open Cypress Test Runner (GUI)
bun run cypress:run        # Run Cypress tests headlessly
bun run test:e2e          # Run E2E tests with dev server
bun run test:e2e:ui       # Open E2E tests with dev server
```

### Test Coverage

The test suite covers:

**🏠 Home Page & Navigation**

- Hero section and CTA functionality
- Feature sections and content display
- Navigation and routing
- Waitlist mode vs normal mode behavior

**🔐 Authentication Flow**

- Sign in/Sign up workflows
- Protected route access
- User session management
- Clerk integration testing

**🎨 Presentation Features**

- Slide creation and editing
- Theme selection and customization
- AI content generation
- Drag & drop functionality

**🌙 Theme & UI Components**

- Dark/Light mode switching
- Responsive design testing
- Component interactions
- Accessibility features

**🔌 API Endpoints**

- Project CRUD operations
- OpenAI integration
- Database interactions
- Error handling

### Waitlist Mode Testing

All tests include comprehensive coverage for both waitlist enabled and disabled modes:

```typescript
// Example test structure
describe("Feature", () => {
  context("Waitlist Mode Enabled", () => {
    // Tests for waitlist behavior
  });

  context("Waitlist Mode Disabled", () => {
    // Tests for normal application behavior
  });
});
```

### Custom Cypress Commands

```typescript
// Available custom commands
cy.mockAuth(); // Mock Clerk authentication
cy.visitWithWaitlist(); // Visit with waitlist mode
cy.testThemeToggle(); // Test theme switching
```

### Test File Structure

```
cypress/
├── e2e/
│   ├── auth/              # Authentication tests
│   ├── home/              # Home page tests
│   ├── navigation/        # Navigation tests
│   ├── protected/         # Protected route tests
│   ├── api/               # API endpoint tests
│   └── waitlist/          # Waitlist functionality
├── fixtures/              # Test data
├── support/               # Custom commands & utilities
└── cypress.config.ts      # Cypress configuration
```

## 🚀 Deployment

SlideFusion supports multiple deployment options with optimized configurations for each platform.

### 🔷 Vercel Deployment (Recommended)

Vercel provides the optimal deployment experience for Next.js applications:

```bash
# Quick deploy to preview
bun run deploy

# Deploy to production
bun run deploy:prod

# Or use Vercel CLI
npm install -g vercel
vercel --prod
```

**Environment Variables for Vercel:**

```bash
DATABASE_URL=your_production_database_url
CLERK_SECRET_KEY=your_production_clerk_secret
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_production_clerk_public_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### ☁️ Cloudflare Pages

Optimized for edge performance with Cloudflare's global network:

```bash
# Build and deploy automatically
bun run deploy

# Local preview with Cloudflare
bun run preview-cf

# Troubleshoot deployment issues
bun run cf-troubleshoot
```

For detailed Cloudflare deployment instructions, see [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md).

### 🐳 Docker Support

Perfect for containerized deployments and development environments:

```bash
# Build Docker image
bun run docker:build

# Run container locally
bun run docker:run

# Development with Docker Compose
bun run docker:compose

# Production deployment
bun run docker
```

**Docker Environment Setup:**

```dockerfile
# Required environment variables in .env
CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_openai_key
```

For comprehensive Docker instructions, see [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md).

### 📋 Deployment Checklist

Before deploying to production:

- [ ] Set all required environment variables
- [ ] Configure production database
- [ ] Set up Clerk production keys
- [ ] Configure OpenAI API limits
- [ ] Test with production data
- [ ] Set up monitoring and analytics
- [ ] Configure domain and SSL

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Piyush Mehta - Lead Developer

---

Made with ❤️ using Next.js and OpenAI
