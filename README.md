# SlideFusion

An AI-assisted presentation workspace for moving from an idea to an editable
slide deck. The product combines prompt-based outline generation with a
drag-and-drop editor, slide layouts, themes, and image generation.

> **Project status:** actively maintained portfolio project. The public demo is
> temporarily offline while the deployment is being restored; the repository is
> the source of truth for the current implementation.

## What it demonstrates

- A full-stack Next.js 15 application using TypeScript, React 19, tRPC, Prisma,
  and PostgreSQL.
- Authenticated project creation and persistence with Clerk.
- AI-assisted outline, layout, and image generation via OpenAI.
- A drag-and-drop presentation editor with layouts, themes, editable content,
  presentation mode, and soft-deleted projects.
- Unit and end-to-end test coverage with Jest and Cypress.

## Architecture

```text
Next.js App Router + React
        |
      tRPC
        |
Prisma + PostgreSQL
        |
Clerk · OpenAI · Lemon Squeezy
```

The API is organized as tRPC routers for users, projects, OpenAI generation,
and Lemon Squeezy billing. Client state for the editor is managed with Zustand;
Prisma provides the application data model and migrations.

## Run locally

### Prerequisites

- Node.js 20+ or Bun
- A PostgreSQL database
- A Clerk application (for authenticated workflows)
- An OpenAI API key (for AI generation)

```bash
git clone https://github.com/piyush97/SlideFusion.git
cd SlideFusion
bun install

cp .env.example .env.local
# Fill in the values needed for the features you plan to exercise.

bunx prisma migrate dev
bun dev
```

Visit `http://localhost:3000`. The marketing page can load without Clerk; set
the Clerk variables to use protected project and editor routes.

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local`. `DATABASE_URL` and Clerk
keys are required for authenticated workflows. `OPENAI_API_KEY` is required for
outline and image generation. Lemon Squeezy and Uploadcare settings are only
needed when exercising those integrations.

## Quality checks

```bash
bun run lint
bun test
bun run cypress:run
bun run build
```

## Deployment

The app is configured for Vercel and can also run in Docker. Before deploying,
set production environment variables, run database migrations, and configure
the Clerk and Lemon Squeezy webhooks. See [DEPLOYMENT.md](DEPLOYMENT.md) and
[DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md) for the existing deployment notes.

## Static portfolio showcase

`portfolio-site/` is a separate, static project showcase for GitHub Pages. It
is intentionally limited to public, non-interactive material and must not rely
on this application’s API routes, authentication, database, environment
variables, billing, AI generation, or any locally running service. It is not a
hosted substitute for the product.

The Pages workflow uploads only that directory and runs
`./scripts/check-pages-static.sh` before publishing. See the concise
[Pages runbook](docs/PAGES_RUNBOOK.md) and the
[claim/evidence matrix](docs/CLAIM_EVIDENCE_MATRIX.md) for publication and
portfolio-claim boundaries.

## Tech stack

Next.js · TypeScript · React · tRPC · Prisma · PostgreSQL · Clerk · OpenAI ·
Tailwind CSS · Zustand · Jest · Cypress

## License

Copyright © 2026 Piyush Mehta. See [LICENSE](LICENSE). The source is available
for viewing and evaluation; reuse requires written permission.
