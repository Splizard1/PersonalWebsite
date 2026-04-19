# Personal Website

A full-stack personal portfolio and blog built with Spring Boot and Next.js.

## Tech Stack

**Backend**
- Java 21, Spring Boot 3
- Spring Security (HTTP Basic auth)
- Spring Data JPA + Hibernate
- PostgreSQL

**Frontend**
- Next.js 16 (App Router, Server Components)
- TypeScript
- Tailwind CSS v4
- React

**Infrastructure**
- Deployed on Railway
- PostgreSQL managed database

## Features

- **Blog** — markdown posts with syntax highlighting, tags, read time, related posts, and comments
- **Projects** — portfolio with featured projects, tech stack, repo and live links
- **Admin panel** — protected dashboard to create, edit, publish, and delete posts and projects
- **Dark mode** — system-aware with manual toggle
- **Page transitions** — view transitions API

## Architecture

```
┌─────────────┐     REST API      ┌──────────────┐     ┌────────────┐
│  Next.js    │ ───────────────▶  │  Spring Boot │────▶│ PostgreSQL │
│  (Frontend) │ ◀───────────────  │  (Backend)   │     │    (DB)    │
└─────────────┘                   └──────────────┘     └────────────┘
```

The frontend uses Next.js Server Components to fetch data at request time, with a 60-second revalidation cache on public endpoints. Admin routes are protected by a `proxy.ts` middleware that checks for an httpOnly session cookie.

## Running Locally

**Prerequisites:** Java 21, Maven, Node.js 18+, PostgreSQL

**Backend**
```bash
# Set environment variables
export ADMIN_PASSWORD=yourpassword

# Run
./mvnw spring-boot:run
```

**Frontend**
```bash
cd frontend
cp .env.example .env.local  # then fill in values
npm install
npm run dev
```

**Environment variables**

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Password for the admin account |
| `DB_HOST` | PostgreSQL host |
| `DB_NAME` | Database name |
| `DB_USERNAME` | Database user |
| `DB_PASSWORD` | Database password |
| `NEXT_PUBLIC_API_URL` | Backend URL |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL |
| `FRONTEND_URL` | Frontend URL (used by backend for CORS) |

## Project Structure

```
├── src/                        # Spring Boot backend
│   └── main/java/com/spliz/website/
│       ├── config/             # Security, CORS
│       ├── controller/         # REST endpoints
│       ├── entity/             # JPA entities
│       ├── repository/         # Spring Data repositories
│       └── service/            # Business logic
│
└── frontend/                   # Next.js frontend
    ├── app/
    │   ├── admin/              # Admin panel (protected)
    │   ├── blog/               # Blog pages
    │   ├── components/         # Shared components
    │   └── projects/           # Project pages
    └── lib/
        ├── api.ts              # API client + types
        ├── auth.ts             # Auth utilities (server-only)
        └── env.ts              # Environment validation
```
