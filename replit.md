# Sushit — AI Engineer Portfolio

A terminal-inspired personal portfolio for Sushit, an AI Engineer focused on LLM reliability, safety tooling, and agentic systems.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/sushit-portfolio/src/App.tsx` — single-page portfolio content, project data, filtering, and section structure
- `artifacts/sushit-portfolio/src/index.css` — terminal visual system, responsive layout, motion, and accessibility styles
- `artifacts/sushit-portfolio/index.html` — page metadata and OpenGraph basics
- `attached_assets/Pasted--Prompt-for-Open-Design-Paste-everything-below-into-Ope_1786005407224.txt` — original product and content brief

## Architecture decisions

- The portfolio is presentation-first and intentionally has no backend or database.
- Project content is kept in a structured array so new work can be added without rewriting the page markup.
- The interface uses the requested terminal aesthetic with a restrained motion layer and reduced-motion support.

## Product

- Hero identity and thesis for AI Engineering roles
- About and current-signal context
- Filterable project showcase split across infra/eval/reliability and agentic systems
- Open-source contributions, skills, and contact links

## User preferences

- Keep the visual language technical, understated, and open-source-grade rather than generic student-portfolio styling.
- Preserve the exact palette `#0A0F08`, `#8AFF57`, and `#CAFF3C` when extending the site.

## Gotchas

- The Vite artifact workflow supplies `PORT` and `BASE_PATH`; use the managed workflow for previewing.
- Verify mobile layouts when adding project metadata or navigation items because the terminal layout intentionally compresses on small screens.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
