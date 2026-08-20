# SlideFusion Static Showcase

An isolated Vite + React + TypeScript portfolio demo. It contains a deterministic four-slide local-state experience and makes no runtime API calls or imports from the main SlideFusion application.

## Run

```sh
npm install
npm run dev
npm test
npm run build
```

Keyboard: use the left and right arrow keys to move between slides. Export and sign-in intentionally show an unavailable message: this is a static-only artifact. All deployment-facing paths are relative (`base: './'`), and `404.html` is included for hosts that serve it directly.
