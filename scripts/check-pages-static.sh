#!/usr/bin/env bash
# Verifies that the Pages workflow remains limited to the static showcase.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
workflow="$root/.github/workflows/deploy-pages.yml"
site="$root/portfolio-site"
artifact="$site/dist"

fail() {
  printf 'Pages static check: %s\n' "$*" >&2
  exit 1
}

[[ -f "$workflow" ]] || fail "missing deployment workflow: .github/workflows/deploy-pages.yml"
[[ -f "$artifact/index.html" ]] || fail "missing static entry point: portfolio-site/dist/index.html (run npm run build in portfolio-site first)"

grep -Fq 'workflow_dispatch:' "$workflow" || fail 'workflow must support manual dispatch'
grep -Eq '^[[:space:]]*-[[:space:]]+main[[:space:]]*$' "$workflow" || fail 'workflow must trigger from the default branch (main)'
grep -Fq 'pages: write' "$workflow" || fail 'workflow must grant pages: write only where needed'
grep -Fq 'id-token: write' "$workflow" || fail 'workflow must grant id-token: write only where needed'
grep -Fq 'actions/upload-pages-artifact@v' "$workflow" || fail 'workflow must upload a Pages artifact'
grep -Fq 'path: ./portfolio-site/dist' "$workflow" || fail 'workflow artifact must be limited to portfolio-site/dist'
grep -Fq 'actions/deploy-pages@v' "$workflow" || fail 'workflow must use the official Pages deploy action'

if find "$root" \
  -path "$root/.git" -prune -o \
  -path '*/node_modules' -prune -o \
  -name 'CNAME' -print -quit | grep -q .; then
  fail 'repository custom-domain file is not allowed for this Pages showcase'
fi

domain_sources=("$workflow" "$root/README.md" "$site")
if [[ -d "$root/docs" ]]; then
  domain_sources+=("$root/docs")
fi
if rg -n -i -g '!**/node_modules/**' '(^|[^[:alnum:]_])cname([^[:alnum:]_]|$)' "${domain_sources[@]}" >/dev/null; then
  fail 'repository custom-domain configuration must not be referenced by showcase sources'
fi

if find "$site" -path '*/node_modules' -prune -o -type f \( -name '*.env' -o -name '*.pem' -o -name '*.key' \) -print -quit | grep -q .; then
  fail 'portfolio-site contains a forbidden secret-like file'
fi

if grep -RInE --exclude-dir=node_modules --include='*.html' --include='*.css' --include='*.js' --include='*.mjs' 'https?://(localhost|127\\.0\\.0\\.1|0\\.0\\.0\\.0)([:/]|$)' "$artifact" >/dev/null; then
  fail 'portfolio-site contains a local runtime-service link'
fi

while IFS= read -r -d '' html; do
  while IFS= read -r link; do
    link="${link#href=}"; link="${link#src=}"; link="${link#\"}"; link="${link%\"}"; link="${link#\'}"; link="${link%\'}"
    [[ -z "$link" || "$link" == \#* || "$link" == mailto:* || "$link" == tel:* || "$link" == data:* || "$link" == http://* || "$link" == https://* ]] && continue
    target="${link%%\#*}"
    [[ -z "$target" ]] && continue
    [[ -e "$(dirname "$html")/$target" ]] || fail "broken static link in ${html#$root/}: $link"
  done < <(grep -Eo "(href|src)=(\"[^\"]*\"|'[^']*')" "$html" || true)
done < <(find "$artifact" -type f -name '*.html' -print0)

printf 'Pages static check: passed\n'
