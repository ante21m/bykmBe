# AGENTS — AI Coding Agent Instructions

Purpose: give AI coding agents the minimal, actionable context they need to be productive in this repository.

Quick commands
- Dev: `npm run dev` (runs `next dev`)
- Build: `npm run build` (runs `next build`)
- Start: `npm run start` (runs `next start`)
- Lint: `npm run lint` (runs `next lint`)

Environment
- Primary runtime env: `NEXT_PUBLIC_API_URL` (default: `http://localhost:3001/api`). See `next.config.js` for fallback behavior.
- `PORT` / `HOSTNAME` — read by `.next/standalone/server.js` at runtime. cPanel sets these from the app's environment.

Deploying
`output: 'standalone'` deliberately excludes two directories. Both must be copied into `.next/standalone` after the build, before uploading:

```
copy .next\static  ->  .next\standalone\.next\static
copy public        ->  .next\standalone\public
```

Omitting the first is a **500, not a 404**: Next throws on the missing directory and returns a plain-text `Internal Server Error` (21 bytes, no `X-Powered-By`) for every `/_next/static/*` request. The HTML still renders, so the page looks alive while every script, stylesheet and image fails — and LiteSpeed then caches that 500. Verified locally by deleting the copy and re-requesting an asset.

Upload the whole `.next/standalone` directory as the app root, and start with `node server.js` rather than `npm start`.

Tech stack & conventions
- Next.js (App Router, `src/app` directory)
- TypeScript, Tailwind CSS, Mantine UI, Redux Toolkit
- Images: remote patterns configured in `next.config.js` (bykmgroup.com and localhost)
- Output: `output: 'standalone'` is **on**. It produces `.next/standalone` with its own traced `node_modules` and a `server.js` entrypoint. See "Deploying" below — deploying it without the two copy steps is a hard failure, not a cosmetic one.
- `next.config.js` sends `Cache-Control: no-store` on `/admin/:path*` so the host cannot pin a 500 for an admin route.
- API requests use `fetchBaseQuery({ cache: 'no-store', credentials: 'include' })` in [src/lib/redux/api.ts](src/lib/redux/api.ts#L5) so the browser never replays a failed response.

Admin error handling
- Never render "not found" for a failed query. Use `describeQueryError(error)` from [src/lib/adminQueryError.ts](src/lib/adminQueryError.ts#L1) — only a genuine 404 is allowed to say not found. Use `QueryErrorState` for `[id]` pages and `QueryErrorInline` for list pages (both in [src/components/admin/QueryErrorState.tsx](src/components/admin/QueryErrorState.tsx#L1)).
- This matters because LiteSpeed answers a crashed Node process with a plain-text `Internal Server Error` body. `fetchBaseQuery` cannot parse it, so RTK Query reports `status: 'PARSING_ERROR'` and the real code survives only in `originalStatus`. Reading `error.status` directly loses the 500.
- On public pages use only `info.kind`, never `info.detail` — `detail` can carry a database message that should not be shown to visitors.
- Always `.unwrap()` a mutation before `router.push`. The forms await `onSave` unguarded, so an unguarded rejection is an unhandled promise rejection with no feedback. Wrap it in `try/catch` and render the error.
- Form save errors render inline above the form; modal action errors (deletes) use `addToast`.
- `<Toaster>` in [src/app/layout.tsx](src/app/layout.tsx#L130) must **wrap** the page tree, not sit beside it. It owns the toast context; rendered as a sibling, every `useToast()` caller silently gets a no-op default and no toast appears.

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
