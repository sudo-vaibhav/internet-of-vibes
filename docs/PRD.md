# PRD — JIT Internet (Per-User, On-Demand Synthetic Web)

This document captures the product requirements for building a per-user, on-demand synthetic web that generates deterministic, safe, static HTML/CSS pages and sites.

> Source: provided by the project owner on 2025‑08‑10. This file is canonical for product intent; keep engineering docs in sync when behavior changes.

## 0) Inspiration & Prior Art

- Websim — https://websim.com
- YouTube — https://www.youtube.com/watch?v=pdWS-ZJ3K8Y

## 1) Vision & Problem Statement

Vision: Give every user a private, living “internet” that materializes instantly to answer their curiosity—search results, sites, and pages that don’t exist until the moment they’re needed, yet remain consistent over time.

Problem: Today’s web is noisy, SEO-skewed, and slow to navigate. LLM chat collapses everything into text, losing the exploratory, hyperlink-native affordances of the web. We want both: the speed and focus of AI with pages, navigation, search, and memory—without scraping or relying on existing sites.

One-liner: Your own internet, generated just-in-time—coherent, consistent, and evolving with you.

## 2) Goals & Non-Goals

Goals (V1):
- Provide a Google-like search page per user that lists AI-generated SERP results (titles, snippets, synthetic domains).
- Clicking a result generates a full HTML+CSS page on the fly.
- Pattern-based templates (Site Template + Route Pattern Templates) for layout and coherence.
- Deterministic generation (stable seeds) so revisits are consistent unless evolved.
- Sanitized output with strict allowlist: HTML/CSS, and optionally safe JS from trusted CDNs under CSP+SRI (off by default).
- Lightweight persistence so each user’s “internet” accumulates.

Goals (V1.1): Template authoring
- Introduce Jinja-like templating for page structure/blocks to increase reuse and readability while staying deterministic and sanitized.

Goals (V1.5): Predictive Page Generation
- Background agent that pre-generates likely-next pages within quotas, stored and served instantly.

Goals (V1.6): Synthetic Image Assets
- Optional AI images bound to pattern-declared slots with accessibility and safety guardrails.

Goals (V1.7): Publish to shared internet
- “Publish” action converts a synthetic page into a public, shared artifact (immutable version) accessible to all users.
- Claiming rules: first-claim wins for a canonical path; include rate limiting and abuse prevention to deter scalping.

Non-Goals (V1):
- Arbitrary JavaScript execution or dynamic third‑party embeds outside the allowlist and CSP/SRI policy.
- Real-world data accuracy or referencing real brands/news.
- Multi-user shared worlds (initially personal; publishing enables shared read-only artifacts).
- Monetization beyond minimal gating (post-MVP).

## 3) Users & Use Cases
- Primary: curious builders/knowledge workers preferring structured exploration.
- Examples: exploratory learning, design inspiration, world-building guides, spec scaffolding, predictive speed; publish selected pages to the shared internet when ready.

## 4) Product Principles
- Hyperlink-native. Pattern-first coherence. Deterministic enough. Static & safe. Anticipate intent. Speed wins. Minimal, safe JS only by allowlist.

## 5) User Journeys (MVP)
- A: Search → click → generated page with internal links.
- B: Return to site → coherent templates reused.
- C: Predictive generation (opt-in) → instant serve from cache with badge.
- D: Controls: Pin/Regenerate/Evolve/Export/Report; predictive caps.
- E (Publish): From a generated page, click “Publish” → confirm → page is versioned, sanitized, SRI/CSP-compliant, rate-limited claim recorded; public link returned.

## 6) Scope & Requirements
- Functional: SERP, site/pattern templating, page generation, template enforcement (critic), predictive generation, persistence, deterministic domains, sanitization & safety, determinism, analytics, publish flow with claim registry and rate limiting.
- Non-Functional: latency, cost, availability, scalability, security (CSP, SRI, allowlist), anti-scalping controls.

## 7) System Architecture
- Core services: SERP Generator, Domain Resolver, Template Engines, Page Generator, Critic/Linters, Sanitizer, Predictive Planner/Scheduler, Storage, CDN, Observability, Publish Service (claim registry + artifact freezer).
- Image pipeline: prompt composer → generator → safety/sanitizer → processor → deduper → storage/CDN.
- Safe JS policy: allowlist of trusted CDNs (e.g., esm.run/jsdelivr/unpkg—exact list TBD), Subresource Integrity (SRI) required, CSP nonces or hashes, optional sandboxed iframe for untrusted content (disabled by default).

## 8) Data Model (sketch)
- Entities: User, Site, SiteTemplate, RoutePatternTemplate, Page, PrefetchedPage, ImageAsset, ImageStyleGuide, SearchQuery, SERPResult, GenerationRun, PublishClaim { page_id, canonical_key, owner_user_id, claimed_at, rate_limited_until, version }.


## 9) Template & Style Continuity
- Hierarchy: Site Template → Route Pattern Template → Page Content; image style guide and slots; critic enforcement; evolution/versioning.
- Templating: Jinja-like templates for Route Pattern layout/blocks. Variables and control flow must be deterministic and sanitizer-friendly.

## 10) Predictive Generation Spec
- Inputs, planner outputs, scheduler, serving, guardrails.

## 11) Prompting & Determinism
- Roles: LLM-A/B/B2/C/D/E; seed rule and constraints.

## 12) URL & Navigation Semantics
- Per-user namespace (private/draft): `/u/{uid}/s/{domain}/{path?}`
- Published public artifacts (subdomain constraint → path-based mounting for now):
  - Canonical: `/public/{domain}/{path?}` where `{domain}` is the deterministic pseudo-domain (e.g., `fakereddit.com`).
  - Convenience (optional): `/{domain}/{path?}` may resolve to the same artifact; canonical should point to `/public/...` to avoid collisions.
  - Future: subdomains `{domain}.internetofvibes.com/{path?}` once supported; keep redirects from `/public/...`.
- Login-state behavior:
  - Logged-out: resolve to the latest published immutable version at `/public/...`.
  - Logged-in: `/u/...` shows your working copy/draft; `/public/...` always shows the published artifact. Provide UI to switch/view public vs draft.
- Canonicalization: same (domain, path) → same published artifact version until a new publish occurs; drafts do not affect public view.

## 13) Safety, Legal, Ethics
- Synthetic-only content, no real brands/people, disclaimers, sanitization, CSP with strict allowlist, SRI required for external scripts, rate limits and claim registry for publishing.

## 14) Performance & Cost Controls
- Caching tiers, model ladder, partial reuse, predictive and image budgets. JS budget: keep optional safe JS small; measure TBT/TTI impact.

## 15) Instrumentation & KPIs
- North-stars, efficiency, safety. Add: publish conversion rate, successful vs blocked claims, scalping prevention efficacy.

## 16) Admin & Ops
- Kill-switches, version pinning, allow/deny lists, audit logs. Add: revoke/transfer publish claims; rotate CSP/SRI keys.

## 17) Milestones
- A: SERP → Page, deterministic domains, sanitization, cache, analytics.
- B: Route patterns, IA, controls, a11y lint.
- C: Predictive planner/scheduler, caps, badges, dashboards, cost.
- D: Jinja-like templating MVP and safe-JS allowlist plumbing (CSP/SRI), off by default.
- E: Publish flow (claim registry, rate limiting, immutable artifact store, public routes: `/public/{domain}/{path?}`).

## 18) Testing Strategy
- Unit, golden prompts, fuzzing, a11y, load, predictive eval, image QA.
- Security: CSP and SRI enforcement tests; script allowlist; publish claim rate-limit tests; path canonicalization.
- Routing: ensure `/public/{domain}/{path?}` resolves published artifacts; `/u/...` drafts do not leak to public; canonical links set.

## 19) Open Questions & Risks
- Pattern explosion, drift vs novelty, predictive misfires, privacy expectations, no-JS constraint softening.
- Allowlist governance and SRI management; publish abuse vectors (squatting/scalping); global canonical naming conflicts.

## 20) Future Directions (Post‑V1)
- JS‑lite widgets, world seeds, sharing/forking, authoring tools, generative sitemaps, long-horizon planner, Synthetic Maps preview.

## 21) Acceptance Criteria (V1/V1.5/V1.6/V1.7)
- V1/V1.5/V1.6 as previously stated.
- Publish (V1.7):
  - Publishing a page produces an immutable, sanitized artifact with CSP and SRI-compliant external scripts only from the allowlist.
  - First-claim wins recorded; rate limits prevent rapid multi-claim attempts; clear error on conflict.
  - Public route `/public/{domain}/{path?}` serves cached artifact with TTFB < 200 ms p95; `/u/...` continues to show drafts.
  - If no published artifact exists, `/public/...` returns 404 with guidance to view the draft (if authorized) or try later.
