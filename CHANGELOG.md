# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

## [1.1.0] — 2026-04-09

### Changed
- Extracted all hardcoded external URLs (Calendly, LinkedIn, Instagram, crisis hotlines)
  into a single `src/config/constants.ts` — single source of truth going forward
- Tightened TypeScript: `noUnusedLocals` and `noUnusedParameters` now `true`
  — dead code is a build error, not a silent warning
- Removed redundant `optimizeDeps` block from `vite.config.ts` (Vite handles
  `framer-motion`, `react`, `react-dom` automatically)
- Normalised crisis hotline phone numbers in `constants.ts` (consistent formatting
  across `CrisisCenter` and `Footer`)

### Added
- `src/config/constants.ts` — centralised external link config
- `CHANGELOG.md` — this file
- `ROLLBACK.md` — rollback runbook for Vercel + git
- `db/` — forward-looking database migration scaffolding (Supabase/PostgreSQL target)
  - `db/migrations/0001_initial_schema.sql`
  - `db/migrations/0002_insights_cms.sql`
  - `db/migrate.sh`
  - `db/README.md`

---

## [1.0.0] — 2026-04-06

> Tagged retrospectively from commit `8f09799`.

### Added
- Comprehensive project documentation in `README.md`

---

## [0.3.0] — 2026-03-04

### Changed
- Replaced broken Radix-based `LiquidButton` with custom `HoverGlowButton`
  (mouse-tracking glow, polymorphic `button`/`a`, size variants)
- Redesigned `Footer`: staggered Framer Motion entrance, Lao Tzu quote,
  3-section grid (Navigate / Resources / Connect)

---

## [0.2.0] — 2026-03-03

### Added
- Animated `BackgroundCircles` component (concentric rotating rings, blur masks,
  colour variants including `suha` brand theme) to Hero section

---

## [0.1.0] — 2026-03-03

### Added
- Initial project: React 18 + Vite + TypeScript + Tailwind CSS
- `Header` with sticky scroll-blur, responsive hamburger menu, Calendly CTA
- `Hero` with headline "Mental Health is a Skill", HoverGlowButton CTA
- `Services` with Discovery Call (Free) and Therapy Session (₹1,000) cards
- `Insights` — 10 editorial cards ("The Kahneman Library") across cognitive
  psychology topics (System 1/2, PTSD, burnout, neuroplasticity, attachment)
- `CrisisCenter` — India crisis hotlines: Vandrevala Foundation, AASRA, iCall
- `Footer` with copyright, navigation, social links
- Custom Tailwind palette: cream, slate-blue, cool-grey, peach
- Typography: DM Sans (body), Playfair Display (headings)
