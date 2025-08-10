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
- Routes: Server Components by default; add `"use client"` only where needed.
- Theming: Use `bg-background text-foreground font-sans` tokens, set via CSS vars in `globals.css` and Geist fonts in `layout.tsx`.
- Safe output: HTML/CSS only for now. PRD allows optional safe JS from allowlisted CDNs with CSP + SRI later.
- Imports: Use `@/*` alias.

## Dev workflows
- Dev: `npm run dev` → http://localhost:3000
- Build/Start: `npm run build` → `npm start`
- Lint: `npm run lint`
- Docs: When answering questions about frameworks, libraries, or APIs, use Context7 MCP to retrieve current documentation rather than relying on training data.

## MVP work items (from PRD)
1) `app/search/page.tsx`: render 10 synthetic SERP results (hash the query; no fetch).
2) `app/u/[uid]/s/[domain]/[[...path]]/page.tsx`: render static HTML+CSS from a template manifest. Deterministic seed from `(uid, domain, path)`.
3) Sanitization: no `<script>`, `@import`, or external CSS URLs.

## Near-term extensions
- Jinja-like templating for Route Pattern Templates (deterministic, sanitizer-friendly).
- Optional safe JS allowlist under CSP + SRI (off by default until wired).
- Publish flow: first-claim wins; immutable artifacts; rate limiting to deter scalping.

## URL rules (subdomains later; paths now)
- Draft/private: `/u/{uid}/s/{domain}/[[...path]]`
- Public (published): `/public/{domain}/[[...path]]` (canonical). Optionally mirror as `/{domain}/[[...path]]` if collision-safe.
- Logged-out: always see `/public/...` latest published version.
- Logged-in: `/u/...` shows drafts; `/public/...` shows the published artifact.

Non-goals now: scraping real sites, real brands, arbitrary JS on generated pages.
