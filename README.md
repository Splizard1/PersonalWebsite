# Personal Website

A full-stack personal portfolio and blog built with Spring Boot and Next.js.

[Visit my website](https://spliz.biz)

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

The frontend uses Next.js Server Components to fetch data at request time, with a 60-second revalidation cache on public endpoints. Admin routes are protected by a `proxy.ts` middleware that checks for an httpOnly session cookie.


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
