# Chethan Construction — Project Specification

## Purpose
This documentation package is the source of truth for building a production-ready company-profile and project-portfolio website for Chethan Construction.

The application must allow the public to view company information, services, projects, project media, testimonials, and contact/enquiry information. An authenticated administrator must be able to manage content and upload project photos/videos without changing source code.

## Recommended stack
- Frontend: React, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query
- Backend: Java 21, Spring Boot, Spring Security, Spring Data JPA
- Database: PostgreSQL
- Media: Cloudflare R2
- API documentation: OpenAPI/Swagger
- Source control: GitHub
- Containerization: Docker
- CI/CD: GitHub Actions where supported

## Documentation order
1. 01_PROJECT_REQUIREMENTS.md
2. 02_TECHNICAL_ARCHITECTURE.md
3. 03_DATABASE_DESIGN.md
4. 04_API_SPECIFICATION.md
5. 05_FRONTEND_SPECIFICATION.md
6. 06_ADMIN_PANEL_SPECIFICATION.md
7. 07_MEDIA_STORAGE_SPECIFICATION.md
8. 08_AUTHENTICATION_SECURITY.md
9. 09_UI_UX_DESIGN.md
10. 10_SEO_SPECIFICATION.md
11. 11_DEPLOYMENT_GUIDE.md
12. 12_ENVIRONMENT_VARIABLES.md
13. 13_DEVELOPMENT_ROADMAP.md
14. 14_ANTIGRAVITY_MASTER_PROMPT.md

## Implementation principles
- Do not hard-code business content that an administrator should manage.
- Keep public and admin applications logically separated.
- Never expose storage credentials or JWT secrets to the browser.
- Validate uploaded files on the server.
- Use database migrations.
- Use environment variables for deployment-specific configuration.
- Make the public site fast, responsive, accessible, and SEO-friendly.
- Prefer simple maintainable solutions over unnecessary complexity.

## Initial business placeholders
Use placeholders until the owner supplies the final values:
- Legal/company name: Chethan Construction
- Location/service area: TBD
- Phone: TBD
- WhatsApp: TBD
- Email: TBD
- Logo: TBD
- Tagline: TBD
- Social links: TBD

## Definition of done
A release is complete only when:
- Public pages work on mobile and desktop.
- Admin authentication is secure.
- Admin can create/edit/publish projects.
- Admin can upload/delete/reorder photos and videos.
- Uploaded media is stored outside Git.
- Project changes appear on the public site without rebuilding the frontend.
- Enquiries are persisted.
- Validation, error handling, logging, SEO, and deployment configuration are present.
- Secrets are not committed to GitHub.
