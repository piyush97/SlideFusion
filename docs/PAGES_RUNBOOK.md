# Static showcase on GitHub Pages

This repository publishes a static portfolio showcase only. It is separate
from the Next.js product and must not be represented as a live application.

## Before the first run

1. A repository administrator selects **GitHub Actions** as the Pages source
   in the repository’s Pages settings.
2. Confirm the protected deployment environment named `github-pages` is
   available, if the repository’s policy requires one.
3. Run `npm ci && npm run build` from `portfolio-site/`, then run
   `./scripts/check-pages-static.sh`. It verifies the generated static entry
   point, artifact boundary, Pages action usage, local-service references, and
   local asset links without starting an application or contacting external
   services.

## Publish and verify

The workflow runs after a push to `main` that changes `portfolio-site/`, its
workflow, or the guard script. It can also be started manually from the
Actions tab. Its only uploaded artifact is `portfolio-site/dist`.

After a successful deploy, open the deployment URL reported by the workflow.
Until an administrator configures a public address in GitHub, use the default
Pages URL form `https://<owner>.github.io/<repository>/`; this is a placeholder,
not an asserted live link.

## Domain boundary

No repository custom-domain configuration is part of this change. Do not add a
repository domain file or a domain setting to the static sources. If a custom
domain becomes necessary, the external domain owner and repository
administrator must approve and configure it through GitHub’s Pages settings;
that operation is deliberately outside this repository workflow.

## Recovery

If the workflow fails, inspect the **Verify the static showcase boundary**
step first. Fix the static files or workflow configuration, rerun the local
guard, and then re-run the failed workflow. Do not bypass the guard or add
runtime credentials to make the static showcase work.

## Sources

- [GitHub Docs: configuring a publishing source for Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Docs: deploying with custom GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Docs: managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
