# BYKM Trading PLC — Full Stack Website

**Tech Stack:** NestJS · Next.js · TypeORM · SQLite · TypeScript · Tailwind CSS

---

## Project Structure

```
bykm/
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── entities/         # TypeORM entities
│   │   │   ├── contact-submission.entity.ts
│   │   │   ├── project.entity.ts
│   │   │   └── service.entity.ts
│   │   ├── modules/
│   │   │   ├── contact/      # Contact form module
│   │   │   ├── projects/     # Projects CRUD module
│   │   │   └── services/     # Business services module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Next.js 14 App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx    # Root layout with Navbar + Footer
│   │   │   ├── page.tsx      # Home page
│   │   │   ├── about/        # About / Company Overview
│   │   │   ├── services/     # 5 Business Pillars
│   │   │   ├── projects/     # Project Gallery & Pipeline
│   │   │   └── contact/      # Contact Form (react-hook-form + zod)
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ui/Toaster.tsx
│   │   ├── lib/api.ts        # Typed API client
│   │   └── styles/globals.css
│   ├── Dockerfile
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── docker-compose.yml
└── README.md
```

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- npm 9+

### 1. Backend

```bash
cd backend
npm install
npm run start:dev
```

API runs at: `http://localhost:3001/api`
Swagger docs: `http://localhost:3001/api/docs`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at: `http://localhost:3000`

---

## Docker (Production)

```bash
docker-compose up --build -d
```

- Frontend: `http://localhost:3000`
- Backend:  `http://localhost:3001/api`

---

## API Endpoints

### Contact
| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| POST   | /api/contact              | Submit contact form          |
| GET    | /api/contact              | List all submissions         |
| GET    | /api/contact/stats        | Submission statistics        |
| GET    | /api/contact/:id          | Get submission by ID         |
| PATCH  | /api/contact/:id/status   | Update submission status     |

### Projects
| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | /api/projects             | All projects (filter: pillar, status) |
| GET    | /api/projects/featured    | Featured projects            |
| GET    | /api/projects/:id         | Project by ID                |
| POST   | /api/projects             | Create project               |
| PUT    | /api/projects/:id         | Update project               |
| DELETE | /api/projects/:id         | Delete project               |

### Services
| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | /api/services             | All services (filter: pillarKey) |
| GET    | /api/services/pillars     | Business pillars list        |
| GET    | /api/services/:id         | Service by ID                |

---

## Database

Uses **SQLite** via TypeORM (zero-config for development).
- Dev DB: `./backend/bykm.db` (auto-created)
- Seed data: Projects and Services auto-seed on first run

For production, change `type: 'sqlite'` to `type: 'postgres'` in `app.module.ts`
and add `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` env vars.

---

## Environment Variables

### Backend (`backend/.env`)
```
PORT=3001
DB_PATH=./bykm.db
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

## Features

- **NestJS** with modular architecture, DTOs, validation pipes
- **TypeORM** with SQLite (dev) / PostgreSQL (prod) support
- **Next.js 14** App Router with server components
- **TypeScript** end-to-end
- **react-hook-form + zod** for type-safe form validation
- **Tailwind CSS** with custom BYKM brand design system
- **Swagger/OpenAPI** auto-generated docs
- **Docker** multi-stage builds for frontend & backend
- Auto-seeding of Projects and Services on first run
- CORS configured for cross-origin requests
- Global validation pipe (whitelist + transform)

---

## Brand Design System

Colors:
- Navy: `#1a237e` (primary brand)
- Forest Green: `#2e7d32` (Green Legacy)
- Gold: `#c8a84b` (accents)

Fonts:
- Display: Playfair Display
- Body: Lato
- Mono: JetBrains Mono

---

*BYKM Trading PLC © 2018–2026. All Rights Reserved.*
*Synergizing Progress, Sustaining Nature, Architecting the New Ethiopia.*
"# bykmBe" 
