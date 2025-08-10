# AI agent guide for this repo (internet-of-vibes)

Purpose: Help agents move fast in this Next.js 15 App Router project using React 19 and Tailwind CSS v4.

## Project snapshot
- Framework: Next.js 15 (app router) with React 19.1
- Styling: Tailwind v4 via PostCSS plugin; theme tokens mapped from CSS variables
- Fonts: `next/font` (Geist) exposing CSS vars consumed by Tailwind tokens
- Types: TypeScript (strict), path alias `@/*` → project root
- Linting: ESLint (flat) extending `next/core-web-vitals` and `next/typescript`

Key files
- `app/layout.tsx`: Root layout, sets Geist fonts and `antialiased` body, imports `./globals.css`
- `app/page.tsx`: Home route example using `next/image` and Tailwind classes
- `app/globals.css`: Tailwind v4 entry (`@import "tailwindcss";`), defines CSS variables + `@theme inline` tokens
- `postcss.config.mjs`: Enables `@tailwindcss/postcss`
- `eslint.config.mjs`: Flat config using Next presets
- `tsconfig.json`: Strict TS, `@/*` paths, JSX preserve, bundler resolution
- `public/*.svg`: Static assets referenced via `/...`

## Architecture & conventions
- App Router: Place routes under `app/<route>/page.tsx`. Default components are Server Components; add `"use client"` only where interactivity/hooks are needed.
- Metadata: Export `metadata` from layouts/pages as in `app/layout.tsx`.
- Assets: Use `next/image` for images under `public/` (see `app/page.tsx`). Prefer `<Link />` for internal navigation.
- Styling theme: `globals.css` defines CSS vars `--background`/`--foreground` and maps them to Tailwind tokens via `@theme inline`:
  - Use `bg-background` / `text-foreground` and `font-sans` / `font-mono` (fonts wired to Geist via CSS vars in `layout.tsx`).
  - Dark mode follows `prefers-color-scheme`; no manual toggle present—avoid custom dark mode unless requirements change.
- Imports: You may import from root with `@/*` (e.g., `@/app/...`). Create new top-level dirs as needed and import via `@/dir/...`.

## Dev workflows
- Start dev (Turbopack): `npm run dev` → http://localhost:3000
- Build production: `npm run build` then `npm start`
- Lint: `npm run lint`
- Node version: Use a modern LTS (Node 18+). ESM config files are used.

## Implementation patterns to follow
- New page: create `app/about/page.tsx` (Server Component). For client behavior, add `"use client"` at top and use React hooks.
- Styling: Rely on tokens in `@theme inline` instead of hard-coded colors. Example: `className="bg-background text-foreground font-sans"`.
- Fonts: Geist is already set as CSS variables in `layout.tsx`; don’t import other fonts unless necessary.
- Images: Put files in `public/` and reference with `/path.svg` via `<Image src="/path.svg" ... />`.
- Config: Keep `next.config.ts` minimal unless required; it’s ESM typed (`NextConfig`).

## What’s NOT present (so don’t assume)
- No API routes, database, or custom server code
- No test setup yet
- No global state library or RPC layer

If you add new capabilities (API routes, components library, tests), document the patterns inline (README + brief comments) and respect the existing theming and routing.

---

## PRD alignment (JIT Internet)
- Full PRD: `docs/PRD.md` (canonical). Build features to this spec unless the repo diverges; document any deviations in README and code comments.
- Core MVP scope to enable in this Next.js app:
  1) Search page at `app/search/page.tsx` that renders 10 synthetic SERP results (title, snippet, synthetic domain, path). No external fetch needed for now; start with deterministic local generation by hashing the query.
  2) Dynamic site pages at `app/u/[uid]/s/[domain]/[[...path]]/page.tsx` that render HTML+CSS only (no JS) from a template manifest (server component). Use CSS variables and Tailwind tokens for theming.
  3) Determinism: derive a stable seed from `(uid, domain, path)`; persist later, but keep the seed path‑stable now.
  4) Sanitization: restrict output to static markup; avoid `<script>`, `@import`, external URLs in CSS.
- Naming & tokens:
  - Prefer `SiteTemplate`, `RoutePatternTemplate`, `Page` when creating types or manifests.
  - Keep theme tokens in CSS vars → Tailwind `@theme inline` like current `--color-background`/`--color-foreground`.
- Non-goals right now: no client JS execution on generated pages; no real‑web scraping; synthetic-only content and domains.

Ready to extend? Add minimal types in `@/types` and utilities in `@/lib` as needed; keep them importable via `@/*`.
