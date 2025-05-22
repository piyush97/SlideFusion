<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/d99d4a5c-c3b7-4c3b-b544-4c4529ccdca6#gh-dark-mode-only">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/08428952-4c74-4919-9b8e-fe5d424917d3#gh-light-mode-only">
  <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="https://github.com/user-attachments/assets/08428952-4c74-4919-9b8e-fe5d424917d3">
</picture>

# SlideFusion

An AI-powered presentation tool that helps you pitch business ideas to prospective clients/investors using artificial intelligence.

## 🌟 Features

- **Creative AI Generation**: Generate entire presentation outlines with a single prompt
- **Theme Selection**: Choose from multiple professional themes with customizable colors and fonts
- **Smart Layouts**: Various layout types automatically adapted to your content
- **Auto-Generated Images**: AI generates contextually relevant images for your slides
- **Real-time Collaboration**: Work simultaneously with team members on presentations
- **Project Management**: Create, save, recover, and organize multiple presentations
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark/Light Mode**: Built-in theme switching for comfortable viewing

## 🚀 Technologies

### Frontend

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React DnD](https://react-dnd.github.io/react-dnd/) - Drag and drop functionality

### Backend

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Serverless functions
- [Prisma](https://www.prisma.io/) - ORM for database access
- [OpenAI API](https://openai.com/) - AI-powered content generation
- [Clerk](https://clerk.com/) - Authentication and user management

### UI Components

- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Shadcn UI](https://ui.shadcn.com/) - Component collection built on Radix

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/bun
- A database supported by Prisma (PostgreSQL recommended)
- OpenAI API key for AI features
- Clerk API keys for authentication

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/slidefusion/slidefusion.git
   cd slidefusion
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env.local
   ```

   Add your API keys and database connection string to `.env.local`

4. Set up the database

   ```bash
   npx prisma migrate dev
   ```

5. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Deployment

### Vercel Deployment

This project is optimized for deployment on Vercel. To deploy:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Configure your environment variables
4. Deploy!

Alternatively, you can deploy from the command line:

```bash
# Install Vercel CLI if you haven't already
npm install -g vercel

# Deploy to preview
npm run deploy

# Deploy to production
npm run deploy:prod
```

For more information, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🔧 Building for Production

```bash
npm run build
# or
yarn build
# or
bun build
```

For comprehensive deployment options and instructions, see:

[Deployment Guide](./DEPLOYMENT.md)

## ☁️ Cloudflare Pages Deployment

This project is configured for deployment to Cloudflare Pages. For detailed instructions, see:

[Cloudflare Pages Deployment Guide](./CLOUDFLARE_DEPLOYMENT.md)

```bash
# Automated deployment script (recommended)
npm run deploy

# Preview locally
npm run preview-cf

# Troubleshooting script
npm run cf-troubleshoot
```

## 🐳 Docker Support

This project includes Docker support for easy deployment with bun:

```bash
# Build the Docker image
npm run docker:build

# Run the Docker container
npm run docker:run

# Or use Docker Compose
npm run docker:compose

# Build and run in one command
npm run docker
```

For detailed Docker deployment instructions, see:

[Docker Deployment Guide](./DOCKER_DEPLOYMENT.md)

You can also use the script directly:

```bash
./docker-build.sh build  # Build the image
./docker-build.sh run    # Run a container
./docker-build.sh compose  # Run with Docker Compose
./docker-build.sh all    # Build and run
```

Make sure you have a `.env` file with the required environment variables:

- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL`

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Piyush Mehta - Lead Developer

---

Made with ❤️ using Next.js and OpenAI
