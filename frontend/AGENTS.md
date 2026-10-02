# AGENTS — AI Coding Agent Instructions

Purpose: give AI coding agents the minimal, actionable context they need to be productive in this repository.

Quick commands
- Dev: `npm run dev` (runs `next dev`)
- Build: `npm run build` (runs `next build`)
- Start: `npm run start` (runs `next start`)
- Lint: `npm run lint` (runs `next lint`)

Environment
- Primary runtime env: `NEXT_PUBLIC_API_URL` (default: `http://localhost:3001/api`). See `next.config.js` for fallback behavior.

Tech stack & conventions
- Next.js (App Router, `src/app` directory)
- TypeScript, Tailwind CSS, Mantine UI, Redux Toolkit
- Images: remote patterns configured in `next.config.js` (bykmgroup.com and localhost)
- Output: `next` configured with `output: 'standalone'`

Key locations (examples to inspect)
- App entry & layout: [src/app/layout.tsx](src/app/layout.tsx#L1)
- Routes and pages: [src/app](src/app)
- Shared UI components: [src/components](src/components)
- API helpers: [src/lib/api.ts](src/lib/api.ts#L1)
- Redux store: [src/lib/redux/store.ts](src/lib/redux/store.ts#L1)
- Global styles: [src/styles/globals.css](src/styles/globals.css#L1)
- Build scripts and deps: [package.json](package.json#L1)
- Framework config: [next.config.js](next.config.js#L1), [tsconfig.json](tsconfig.json#L1)

Agent guidelines
- Prefer small, focused changes and open a PR for larger work.
- Link to existing files rather than copying long docs (see "Link, don't embed").
- When adding routes, follow the `src/app` layout conventions and keep server/client boundaries explicit (use `use client` when needed).
- For environment changes, update `next.config.js` and document new variables in this file.
- Run `npm run build` locally to verify production behavior when changing Next.js configuration.

Suggested next customizations
- Add a short `CONTRIBUTING.md` with branch/PR guidelines and local setup if you want agents to follow team conventions.
- Create small skills or prompts for common tasks (e.g., "add i18n string", "add admin CRUD page") that reference example files in `src/admin`.

If anything here is unclear or you'd like a different format, tell me what to include or exclude.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
