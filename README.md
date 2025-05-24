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
[![tRPC](https://img.shields.io/badge/tRPC-11-blue?style=flat-square&logo=trpc)](https://trpc.io/)
[![Prisma](https://img.shields.io/badge/Prisma-6.8-green?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🚀 Technologies](#-technologies)
- [🏗️ Architecture Overview](#️-architecture-overview)
- [🔄 Recent Updates](#-recent-updates)
- [🌟 Performance & Optimization](#-performance--optimization)
- [🛡️ Security & Privacy](#️-security--privacy)
- [⚡ Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🐳 Docker Support](#-docker-support)
- [📖 API Documentation](#-api-documentation)
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

- **[tRPC 11](https://trpc.io/)** - End-to-end typesafe APIs with automatic TypeScript inference
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless functions
- **[Prisma 6.8](https://www.prisma.io/)** - Next-generation ORM with type safety
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[OpenAI API](https://openai.com/)** - GPT-4 for content generation and DALL-E for images
- **[LemonSqueezy](https://lemonsqueezy.com/)** - Payment processing and subscription management

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

   # LemonSqueezy (for payments)
   LEMONSQUEEZY_API_KEY=your_lemonsqueezy_api_key
   LEMONSQUEEZY_SIGNING_SECRET=your_signing_secret

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_WAITLIST_MODE=false  # Toggle waitlist functionality
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

- Project CRUD operations via tRPC
- OpenAI integration for AI features
- LemonSqueezy payment processing
- Database interactions with Prisma
- End-to-end type safety
- Error handling and validation

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
LEMONSQUEEZY_API_KEY=your_lemonsqueezy_api_key
LEMONSQUEEZY_SIGNING_SECRET=your_signing_secret
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_WAITLIST_MODE=false
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
LEMONSQUEEZY_API_KEY=your_lemonsqueezy_key
LEMONSQUEEZY_SIGNING_SECRET=your_signing_secret
NEXT_PUBLIC_WAITLIST_MODE=false
```

For comprehensive Docker instructions, see [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md).

### 📋 Deployment Checklist

Before deploying to production:

- [ ] Set all required environment variables
- [ ] Configure production database with proper SSL
- [ ] Set up Clerk production keys and webhooks
- [ ] Configure OpenAI API limits and billing
- [ ] Set up LemonSqueezy payment webhooks
- [ ] Test with production data and real payments
- [ ] Set up monitoring and analytics
- [ ] Configure domain and SSL certificates
- [ ] Enable proper CORS and security headers
- [ ] Set up database backups and monitoring

## 🏗️ Architecture Overview

SlideFusion is built with a modern, type-safe architecture that prioritizes developer experience and application performance:

### 🔧 Core Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
├─────────────────────────────────────────────────────────────┤
│  Next.js 15 App Router + React 19 + TypeScript             │
│  ├── Client Components (tRPC Hooks)                        │
│  ├── Server Components (Static Content)                    │
│  ├── Zustand State Management                              │
│  └── Tailwind CSS + Shadcn UI                             │
├─────────────────────────────────────────────────────────────┤
│                        API Layer                            │
├─────────────────────────────────────────────────────────────┤
│  tRPC v11 - End-to-End Type Safety                        │
│  ├── User Router (Authentication & Profiles)               │
│  ├── Project Router (CRUD Operations)                      │
│  ├── OpenAI Router (AI Content Generation)                 │
│  └── LemonSqueezy Router (Payments & Subscriptions)        │
├─────────────────────────────────────────────────────────────┤
│                       Data Layer                            │
├─────────────────────────────────────────────────────────────┤
│  Prisma ORM + PostgreSQL                                   │
│  ├── Type-Safe Database Queries                            │
│  ├── Automatic Migrations                                  │
│  └── Schema-First Development                              │
├─────────────────────────────────────────────────────────────┤
│                   External Services                         │
├─────────────────────────────────────────────────────────────┤
│  ├── Clerk (Authentication & User Management)              │
│  ├── OpenAI (GPT-4 & DALL-E for AI Features)             │
│  └── LemonSqueezy (Payment Processing)                     │
└─────────────────────────────────────────────────────────────┘
```

### 🚀 Key Architecture Benefits

- **Type Safety**: Complete TypeScript coverage from database to UI
- **Performance**: Optimized with React 19 concurrent features and Next.js 15
- **Developer Experience**: Auto-completion, IntelliSense, and compile-time error checking
- **Scalability**: Modular architecture with clear separation of concerns
- **Maintainability**: Self-documenting code with strong typing

### 🔄 Data Flow

1. **Client Interaction**: User interacts with React components
2. **tRPC Hooks**: Type-safe API calls using `api.router.procedure.useQuery/useMutation`
3. **Server Procedures**: tRPC routes handle business logic with Zod validation
4. **Database Operations**: Prisma ORM executes type-safe database queries
5. **Response Handling**: Automatic serialization and type inference back to client
6. **State Updates**: Zustand manages local state with tRPC cache invalidation

## 📖 API Documentation

SlideFusion uses tRPC for type-safe API development with automatic TypeScript inference and real-time synchronization between server and client.

### 🔧 tRPC Router Structure

```typescript
// API routes available at /api/trpc/[trpc]
export const appRouter = createTRPCRouter({
  user: userRouter, // User authentication & profiles
  project: projectRouter, // Project CRUD operations
  openai: openaiRouter, // AI content generation
  lemonSqueezy: lemonSqueezyRouter, // Payment processing
});
```

### 🔐 User Router (`api.user.*`)

```typescript
// Authentication & user management
api.user.authenticate.useQuery(); // Get current user & auth status
```

### 📋 Project Router (`api.project.*`)

```typescript
// Project management operations
api.project.getAll.useQuery(); // Get all user projects
api.project.getRecent.useQuery(); // Get recent projects
api.project.getDeleted.useQuery(); // Get deleted projects
api.project.getById.useQuery({ projectId }); // Get project by ID

api.project.create.useMutation(); // Create new project
api.project.updateSlides.useMutation(); // Update project slides
api.project.updateTheme.useMutation(); // Update project theme
api.project.delete.useMutation(); // Soft delete project
api.project.recover.useMutation(); // Recover deleted project
api.project.deleteMany.useMutation(); // Bulk delete projects
```

### 🤖 OpenAI Router (`api.openai.*`)

```typescript
// AI-powered content generation
api.openai.generateCreativePrompt.useMutation(); // Generate presentation outlines
api.openai.generateLayouts.useMutation(); // Generate slide layouts
```

### 💳 LemonSqueezy Router (`api.lemonSqueezy.*`)

```typescript
// Payment & subscription management
api.lemonSqueezy.buySubscription.useMutation(); // Purchase subscription
```

### 📝 Usage Examples

**Creating a Project:**

```typescript
const createProject = api.project.create.useMutation({
  onSuccess: (data) => {
    if (data.status === 200) {
      router.push(`/presentation/${data.data.id}`);
      toast.success("Project created successfully!");
    }
  },
  onError: (error) => {
    toast.error(`Failed to create project: ${error.message}`);
  },
});

// Usage in component
const handleCreate = () => {
  createProject.mutate({
    title: "My Presentation",
    outlines: outlineCards,
  });
};
```

**Fetching Projects:**

```typescript
const { data: projects, isLoading, error } = api.project.getAll.useQuery();

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error.message} />;
```

**Real-time Updates:**

```typescript
const utils = api.useUtils();

const updateSlides = api.project.updateSlides.useMutation({
  onSuccess: () => {
    // Invalidate and refetch project data
    utils.project.getById.invalidate({ projectId });
    utils.project.getAll.invalidate();
  },
});
```

### 🛡️ Error Handling

All tRPC procedures include comprehensive error handling:

```typescript
// Server-side error responses
return { status: 400, error: "Validation failed" };
return { status: 403, error: "User not authenticated" };
return { status: 404, error: "Resource not found" };
return { status: 500, error: "Internal server error" };

// Client-side error handling
api.project.create.useMutation({
  onError: (error) => {
    // Automatically typed error with message
    console.error("Project creation failed:", error.message);
    toast.error(`Error: ${error.message}`);
  },
});
```

### 🔄 Cache Management

tRPC provides intelligent cache management with utilities:

```typescript
const utils = api.useUtils();

// Invalidate specific queries
utils.project.getAll.invalidate();
utils.project.getById.invalidate({ projectId });

// Optimistic updates
utils.project.getAll.setData(undefined, (old) => {
  return old ? [...old, newProject] : [newProject];
});

// Prefetch data
utils.project.getById.prefetch({ projectId });
```

## 🤝 Contributing

We welcome contributions to SlideFusion! Here's how you can help:

### 🚀 Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/slidefusion.git
   cd slidefusion
   ```

2. **Install dependencies**

   ```bash
   bun install  # Recommended
   # or npm install / yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Fill in your API keys and database URL
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start development server**
   ```bash
   bun dev
   ```

### 📝 Contribution Guidelines

- **Code Style**: We use ESLint and Prettier for consistent formatting
- **Commit Messages**: Follow conventional commit format
- **Testing**: Add tests for new features and bug fixes
- **Documentation**: Update README and add JSDoc comments
- **Type Safety**: Maintain full TypeScript coverage

### 🔧 Adding New Features

When adding new features:

1. **tRPC Procedures**: Add new routes in `src/server/routers/`
2. **Database Changes**: Update Prisma schema and create migrations
3. **Frontend Components**: Use tRPC hooks for data fetching
4. **Error Handling**: Implement proper error boundaries
5. **Testing**: Add unit and E2E tests

### 🐛 Bug Reports

Please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots if applicable

### 💡 Feature Requests

We're always looking for ways to improve SlideFusion:

- AI/ML enhancements
- New presentation templates
- Collaboration features
- Export formats
- Accessibility improvements

## 🔄 Recent Updates

### ✅ tRPC Migration Complete (May 2025)

SlideFusion has been successfully migrated from Next.js Server Actions to tRPC for enhanced type safety and developer experience:

**🚀 What Changed:**

- **Server Actions → tRPC**: All API calls now use type-safe tRPC procedures
- **Server Components → Client Components**: Enhanced interactivity with React hooks
- **Manual Error Handling → Automatic Type Safety**: Compile-time error checking
- **Custom Cache Logic → Built-in Cache Management**: Intelligent invalidation and updates

**📈 Benefits:**

- **100% Type Safety**: From database to UI with automatic TypeScript inference
- **Better DX**: Auto-completion, IntelliSense, and real-time error detection
- **Improved Performance**: Optimistic updates and smart caching
- **Easier Debugging**: Clear error messages and stack traces
- **Future-Proof**: Scalable architecture for new features

**🔧 Migration Details:**

- Converted 15+ components to use tRPC hooks
- Updated all CRUD operations for projects, users, and AI features
- Implemented proper error boundaries and loading states
- Added cache invalidation for real-time updates
- Maintained backward compatibility during transition

## 🌟 Performance & Optimization

SlideFusion is built with performance and scalability in mind:

### ⚡ Frontend Optimizations

- **React 19 Concurrent Features**: Automatic batching and concurrent rendering
- **Next.js 15 App Router**: Optimized routing with server components where appropriate
- **Turbopack**: Ultra-fast development builds and hot module replacement
- **Lazy Loading**: Components and routes loaded on demand
- **Image Optimization**: Next.js automatic image optimization and WebP conversion
- **Bundle Splitting**: Automatic code splitting for optimal loading

### 🗄️ Database Performance

- **Prisma Query Optimization**: Efficient queries with automatic relation loading
- **Connection Pooling**: Optimized database connections
- **Indexing Strategy**: Proper database indexes for fast queries
- **Query Caching**: Smart caching with tRPC and React Query

### 🚀 API Performance

- **tRPC Batching**: Multiple requests batched into single HTTP calls
- **Response Streaming**: Efficient data transfer with streaming responses
- **Edge Optimization**: Cloudflare edge deployment support
- **Rate Limiting**: Built-in protection against abuse

### 📊 Monitoring & Analytics

- **Error Tracking**: Comprehensive error monitoring and reporting
- **Performance Metrics**: Real-time application performance monitoring
- **User Analytics**: Understanding user behavior and feature usage
- **Database Monitoring**: Query performance and optimization insights

## 🛡️ Security & Privacy

Security is a top priority in SlideFusion:

### 🔐 Authentication Security

- **Clerk Integration**: Enterprise-grade authentication with MFA support
- **Session Management**: Secure JWT tokens with automatic refresh
- **Role-Based Access**: Fine-grained permissions and access control
- **OAuth Providers**: Secure integration with Google, GitHub, etc.

### 🔒 Data Protection

- **Database Security**: Encrypted connections and secure hosting
- **API Security**: Input validation with Zod schemas
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Rate Limiting**: Protection against brute force attacks

### 🛠️ Privacy Compliance

- **GDPR Compliance**: User data export and deletion capabilities
- **Data Minimization**: Only collect necessary user information
- **Transparent Policies**: Clear privacy policy and terms of service
- **User Control**: Users can manage their data and privacy settings
