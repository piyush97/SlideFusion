# Portfolio claim and evidence matrix

| Claim | Evidence in this repository | Bound or caveat | External source |
| --- | --- | --- | --- |
| The product is a Next.js application. | [`package.json`](../package.json) declares `next`; [`src/app`](../src/app) contains App Router routes. | This evidence describes the repository implementation, not an assertion that a public service is running. | [Next.js documentation](https://nextjs.org/docs) |
| The project uses TypeScript and React. | [`package.json`](../package.json) declares `typescript`, `react`, and `react-dom`; [`tsconfig.json`](../tsconfig.json) configures TypeScript. | Dependency declarations do not prove a particular hosted version. | [TypeScript documentation](https://www.typescriptlang.org/docs/) · [React documentation](https://react.dev/learn) |
| The repository contains an AI-assisted presentation workflow. | [`src/actions/openai.ts`](../src/actions/openai.ts), [`src/components/global/editor`](../src/components/global/editor), and [`src/config/layouts.ts`](../src/config/layouts.ts) are direct implementation evidence. | AI features require local environment configuration; the static showcase does not execute them. | [OpenAI API documentation](https://platform.openai.com/docs/overview) |
| The repository has automated quality checks. | [`package.json`](../package.json) exposes Jest, Cypress, lint, and build scripts. | Script presence is not a claim that every check has passed for a future commit. | [Jest documentation](https://jestjs.io/docs/getting-started) · [Cypress documentation](https://docs.cypress.io/app/get-started/why-cypress) |
| The public portfolio surface is static and can be deployed by GitHub Pages. | [`portfolio-site`](../portfolio-site) is the sole artifact path in [the workflow](../.github/workflows/deploy-pages.yml); [`scripts/check-pages-static.sh`](../scripts/check-pages-static.sh) enforces the boundary. | The default Pages URL is configured by GitHub; this repository does not assert a custom public address. | [GitHub Docs: custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) |

## Evidence-use rules

- Use repository evidence for implementation claims and official documentation
  for platform behavior.
- Do not convert dependencies, source files, or a Pages deployment into claims
  about uptime, customer use, performance, security certification, or feature
  availability.
- The static showcase may link to source-controlled assets, but it must not
  require credentials, APIs, a database, authentication, or a locally running
  service.
