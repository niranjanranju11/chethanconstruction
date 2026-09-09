# 11 — Deployment Guide

## 1. GitHub
Recommended repository:

```text
chethan-construction
```

Push:
- frontend source.
- backend source.
- docs.
- Docker files.
- GitHub Actions.

Never push `.env` files containing secrets.

## 2. Frontend deployment
GitHub Pages can host a static React frontend, provided routing is configured correctly. For a production SPA, another static host may simplify SPA fallback configuration.

If using GitHub Pages:
- Build with Vite.
- Configure correct base path if using a project site.
- Configure SPA routing fallback strategy.
- Use HTTPS.
- Configure custom domain if desired.

## 3. Backend deployment
The Spring Boot API needs a server/container environment.

Possible providers:
- Render.
- Railway.
- AWS.
- Azure.
- Google Cloud.
- Other provider chosen by the owner.

Use Docker for portability.

## 4. Database
Use managed PostgreSQL where possible.

Production:
- Strong password.
- SSL.
- Automated backups.
- Restricted network access.
- Monitoring.

## 5. R2
Create:
- R2 bucket.
- API credentials with minimum required permissions.
- CORS configuration suitable for upload flow.
- Optional custom media domain.

Do not put R2 secrets in frontend code.

## 6. Domain
Example:
`chethanconstruction.in`

Configure:
- Frontend domain.
- API subdomain such as `api.chethanconstruction.in`.
- Optional media subdomain such as `media.chethanconstruction.in`.

Use HTTPS everywhere.

## 7. Deployment order
1. Create PostgreSQL.
2. Configure Flyway migrations.
3. Create R2 bucket/credentials.
4. Deploy backend.
5. Verify health endpoint.
6. Deploy frontend.
7. Configure frontend API URL.
8. Configure custom domain.
9. Create first admin account securely.
10. Test admin upload.
11. Test public project display.
12. Test enquiry.
13. Verify backups and logs.

## 8. Docker
Backend should include:
- Multi-stage build.
- Non-root runtime user.
- Health check where appropriate.

Frontend can be built to static assets.

## 9. CI/CD
GitHub Actions:
- Frontend lint/test/build.
- Backend test/build.
- Optional Docker build.
- Dependency/security checks.

Do not automatically deploy production on every branch. Use protected main/release process.

## 10. Backup
At minimum:
- PostgreSQL automated backup.
- Periodic restore test.
- Media backup/recovery strategy documented.

## 11. Monitoring
Monitor:
- API availability.
- Database.
- R2 storage usage.
- Application errors.
- Upload failures.
- Domain certificate.

## 12. Free-tier warning
Hosting/provider free tiers can change, sleep, throttle, or have usage limits. The system must not assume any provider is free forever.
