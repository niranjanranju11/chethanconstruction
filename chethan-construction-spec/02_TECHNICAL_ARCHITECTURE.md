# 02 — Technical Architecture

## 1. High-level architecture

```text
                     Public Internet
                           |
                    React Web App
                           |
                    HTTPS REST API
                           |
                    Spring Boot API
                    /      |       \
                   /       |        \
           PostgreSQL   Cloudflare R2  Auth
              DB          Media       JWT
```

## 2. Repository structure

```text
chethan-construction/
├── frontend/
├── backend/
├── docs/
├── infra/
├── .github/
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 3. Frontend structure

```text
frontend/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── main.tsx
├── public/
├── package.json
└── vite.config.ts
```

## 4. Backend structure

Use a feature-oriented package layout:

```text
backend/src/main/java/com/chethanconstruction/
├── auth/
├── company/
├── service/
├── project/
├── media/
├── testimonial/
├── enquiry/
├── audit/
├── common/
│   ├── exception/
│   ├── response/
│   ├── validation/
│   └── config/
└── ChethanConstructionApplication.java
```

Each feature should keep controller, service, repository, entity/DTO/mapping logic close together.

## 5. Request flow
1. Browser requests public data.
2. React calls REST API.
3. Spring Boot validates request.
4. Service layer executes business logic.
5. Repository accesses PostgreSQL.
6. Media URLs are returned as metadata.
7. Browser loads media directly from the configured public media/CDN URL or through signed delivery when needed.

## 6. Upload flow
Prefer direct-to-object-storage uploads using short-lived signed URLs:
1. Admin requests upload authorization.
2. Backend authenticates admin.
3. Backend validates metadata and creates an upload record/key.
4. Backend returns a short-lived signed upload URL.
5. Browser uploads directly to R2.
6. Browser/backend confirms upload.
7. Backend stores final media metadata.
8. Project gallery is refreshed.

This avoids routing large videos through the application server.

## 7. API conventions
- JSON request/response.
- `/api/v1/...` version prefix.
- ISO-8601 timestamps.
- UUID primary identifiers.
- Pagination for collections.
- Consistent error response.
- OpenAPI documentation.
- Validation annotations.

## 8. Error response
Use a consistent shape:

```json
{
  "timestamp": "2026-01-01T10:00:00Z",
  "status": 400,
  "code": "VALIDATION_ERROR",
  "message": "Request validation failed",
  "path": "/api/v1/projects"
}
```

Do not expose stack traces to clients.

## 9. Caching
Public, rarely changing content may be cached:
- Services.
- Featured projects.
- Project detail data.
- Company profile.

Admin changes must invalidate relevant caches or use short TTLs.

## 10. Observability
At minimum:
- Structured application logs.
- Request correlation ID.
- Error logging.
- Upload failure logging.
- Audit log for important admin actions.
- Health endpoint.

## 11. Configuration
Never hard-code:
- Database credentials.
- R2 credentials.
- JWT secret.
- CORS origins.
- Production URLs.
- Email credentials.

## 12. Testing
Backend:
- Unit tests.
- Repository/integration tests.
- Controller/API tests.
- Security tests.

Frontend:
- Component tests for critical flows.
- Form validation tests.
- Admin upload UI tests.

End-to-end:
- Login.
- Create project.
- Upload media.
- Publish project.
- Public project visibility.
- Enquiry submission.
