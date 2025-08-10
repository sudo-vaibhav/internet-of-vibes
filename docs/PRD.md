# PRD — JIT Internet (Per-User, On-Demand Synthetic Web)

This document captures the product requirements for building a per-user, on-demand synthetic web that generates deterministic, safe, static HTML/CSS pages and sites.

> Source: provided by the project owner on 2025‑08‑10. This file is canonical for product intent; keep engineering docs in sync when behavior changes.

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
- Sanitized static output (HTML/CSS only).
- Lightweight persistence so each user’s “internet” accumulates.

Goals (V1.5): Predictive Page Generation
- Background agent that pre-generates likely-next pages within quotas, stored and served instantly.

Goals (V1.6): Synthetic Image Assets
- Optional AI images bound to pattern-declared slots with accessibility and safety guardrails.

Non-Goals (V1):
- JavaScript execution on generated pages.
- Real-world data accuracy or referencing real brands/news.
- Multi-user shared worlds (initially personal).
- Monetization beyond minimal gating (post-MVP).

## 3) Users & Use Cases
- Primary: curious builders/knowledge workers preferring structured exploration.
- Examples: exploratory learning, design inspiration, world-building guides, spec scaffolding, predictive speed.

## 4) Product Principles
- Hyperlink-native. Pattern-first coherence. Deterministic enough. Static & safe. Anticipate intent. Speed wins.

## 5) User Journeys (MVP)
- A: Search → click → generated page with internal links.
- B: Return to site → coherent templates reused.
- C: Predictive generation (opt-in) → instant serve from cache with badge.
- D: Controls: Pin/Regenerate/Evolve/Export/Report; predictive caps.

## 6) Scope & Requirements
- Functional: SERP, site/pattern templating, page generation, template enforcement (critic), predictive generation, persistence, deterministic domains, sanitization & safety, determinism, analytics.
- Non-Functional: latency, cost, availability, scalability, security.

## 7) System Architecture
- Core services: SERP Generator, Domain Resolver, Template Engines, Page Generator, Critic/Linters, Sanitizer, Predictive Planner/Scheduler, Storage, CDN, Observability.
- Image pipeline: prompt composer → generator → safety/sanitizer → processor → deduper → storage/CDN.

## 8) Data Model (sketch)
- Entities: User, Site, SiteTemplate, RoutePatternTemplate, Page, PrefetchedPage, ImageAsset, ImageStyleGuide, SearchQuery, SERPResult, GenerationRun.

## 9) Template & Style Continuity
- Hierarchy: Site Template → Route Pattern Template → Page Content; image style guide and slots; critic enforcement; evolution/versioning.

## 10) Predictive Generation Spec
- Inputs, planner outputs, scheduler, serving, guardrails.

## 11) Prompting & Determinism
- Roles: LLM-A/B/B2/C/D/E; seed rule and constraints.

## 12) URL & Navigation Semantics
- Per-user namespace `/u/{uid}/s/{domain}/{path?}`; pattern detection; canonicalization; shareable links later.

## 13) Safety, Legal, Ethics
- Synthetic-only content, no real brands/people, disclaimers, sanitization, CSP, rate limits.

## 14) Performance & Cost Controls
- Caching tiers, model ladder, partial reuse, predictive and image budgets.

## 15) Instrumentation & KPIs
- North-stars, efficiency, safety.

## 16) Admin & Ops
- Kill-switches, version pinning, allow/deny lists, audit logs.

## 17) Milestones
- A: SERP → Page, deterministic domains, sanitization, cache, analytics.
- B: Route patterns, IA, controls, a11y lint.
- C: Predictive planner/scheduler, caps, badges, dashboards, cost.

## 18) Testing Strategy
- Unit, golden prompts, fuzzing, a11y, load, predictive eval, image QA.

## 19) Open Questions & Risks
- Pattern explosion, drift vs novelty, predictive misfires, privacy expectations, no-JS constraint.

## 20) Future Directions (Post‑V1)
- JS‑lite widgets, world seeds, sharing/forking, authoring tools, generative sitemaps, long-horizon planner, Synthetic Maps preview.

## 21) Acceptance Criteria (V1/V1.5/V1.6)
- Explicit acceptance metrics for V1, V1.5, V1.6.
