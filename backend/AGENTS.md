# AGENTS — AI Coding Agent Instructions

Purpose: give AI coding agents the minimal, actionable context they need to be productive in this repository.

Quick commands
- Build: `npm run build` (runs `nest build`)
- Start: `npm run start` (runs `node dist/main`)
- Dev: `npm run start:dev` (runs `nest start --watch`)
- Migrations: `npm run migration:show` / `migration:run` / `migration:revert`
- Lint: `npm run lint`

Environment
All config comes from [src/database/typeorm-options.ts](src/database/typeorm-options.ts#L42) via `buildTypeOrmOptions()`. That function is the single source of truth for the DB connection — [app.module.ts](src/app.module.ts) and [data-source.ts](src/database/data-source.ts) both call it, so the running server and the migration CLI can never point at different databases. Do not inline connection options anywhere else.

| Variable | Default | Notes |
|---|---|---|
| `DB_HOST` | `localhost` | Blank is treated as unset, not as an empty value. |
| `DB_PORT` | `5432` | Coerced to a number; blank or non-numeric falls back to 5432. |
| `DB_USERNAME` | `postgres` | |
| `DB_PASSWORD` | — | |
| `DB_DATABASE` | `bykm_group` | |
| `NODE_ENV` | `development` | Drives `synchronize` and `logging` below. |
| `DB_SYNC` | unset | Escape hatch only. `true` turns on `synchronize` in production, which can **drop or alter columns**. Use a migration instead. |
| `DB_MIGRATE` | `true` | Set `false` to stop pending migrations from running on boot. |
| `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SUPER_ADMIN_*` | — | See [.env.example](.env.example). |

Tech stack & conventions
- NestJS 10 + TypeORM 0.3 against PostgreSQL. Entities in [src/entities](src/entities).
- `synchronize: true` **only** outside production. Production schema changes go through migrations.
- `logging: true` in development, `['error', 'warn']` everywhere else, so a 500 leaves the failing SQL in the log without flooding it.

Schema changes
- Add a file in [src/database/migrations](src/database/migrations) named `<13-digit-timestamp>-<PascalCaseName>.ts`.
- Write SQL defensively: `ADD COLUMN IF NOT EXISTS`, `DROP COLUMN IF EXISTS`. These migrations run unattended on cPanel at boot.
- Provide a real `down()`. It is what `migration:revert` uses.
- The double quotes around camelCase identifiers are load-bearing. Unquoted folds to lowercase in Postgres; TypeORM looks for the quoted name.

Key locations
- Connection options: [src/database/typeorm-options.ts](src/database/typeorm-options.ts)
- CLI data source: [src/database/data-source.ts](src/database/data-source.ts) — must export exactly one `DataSource`, or the TypeORM CLI refuses to load it
- Bootstrap, cache headers, CORS: [src/main.ts](src/main.ts)
- Global error handling: [src/common/filters/all-exceptions.filter.ts](src/common/filters/all-exceptions.filter.ts)

Deployment notes
- `main.ts` sets `trust proxy` because cPanel puts LiteSpeed in front. Without it the throttler rate-limits every visitor as one client.
- `main.ts` sends `Cache-Control: no-store` on `/api/*` (excluding `/uploads`). LiteSpeed otherwise caches responses — including 500s — for 30 days and replays them after a correct deploy until the cache is purged by hand.
- Pending migrations run automatically on boot in production, so no SSH is needed to apply them.

Agent guidelines
- Prefer small, focused changes.
- Never add a second copy of the connection config.
- After changing anything under `src/database` or `src/main.ts`, run `npm run build` and confirm the log body is clean — a zero exit code alone does not mean there were no TypeScript errors.
- Verify behaviour against a running server where practical; a clean build is not evidence that a header or migration actually works.
