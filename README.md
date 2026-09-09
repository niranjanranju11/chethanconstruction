# Chethan Construction — Web Application & CMS

A full-stack, enterprise-grade company profile and portfolio management system for **Chethan Construction**.

Built with a public-facing dynamic showcase and an authenticated administrative CMS to manage projects, services, testimonials, enquiries, and high-resolution media with direct Cloudflare R2 presigned uploads.

---

## System Architecture

- **Frontend**: React 19 / Vite / TypeScript / Tailwind CSS / TanStack Query / React Router / Lucide Icons
- **Backend**: Java 21 / Spring Boot 3.4 / Spring Security / Spring Data JPA / Flyway / OpenAPI Swagger
- **Database**: PostgreSQL 16 (UUID primary keys, full relational integrity, Flyway migrations)
- **Object Storage**: Cloudflare R2 (S3-compatible, direct client upload via short-lived presigned URLs)

---

## Directory Structure

```text
chethan_construction/
├── backend/                   # Spring Boot 3 + Java 21 REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/chethanconstruction/
│   │   │   └── resources/
│   │   │       ├── db/migration/  # Flyway SQL migrations
│   │   │       └── application.yml
│   │   └── test/
│   └── pom.xml
├── frontend/                  # Vite + React + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── api/               # Centralized Axios API client & endpoints
│   │   ├── components/        # Reusable UI & architectural design components
│   │   ├── layouts/           # Public & Admin layouts
│   │   ├── pages/             # Public & Admin views
│   │   └── types/             # Full TypeScript interfaces
│   ├── package.json
│   └── vite.config.ts
├── chethan-construction-spec/ # Original specification package
├── docker-compose.yml         # PostgreSQL local service
├── .env.example               # Complete environment variable template
└── README.md
```

---

## Quick Start (Local Development)

### 1. Backend (Java 21 + Spring Boot)

```bash
cd backend
mvn clean spring-boot:run
```
- API Base: `http://localhost:8080/api/v1`
- Swagger UI Documentation: `http://localhost:8080/swagger-ui.html`
- Health Check: `http://localhost:8080/api/v1/health`

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```
- Public Website: `http://localhost:5173/`
- Admin Portal: `http://localhost:5173/admin`
- Default Admin Credentials (configurable via `.env`):
  - Email: `admin@chethanconstruction.com`
  - Password: `AdminPassword123!`
