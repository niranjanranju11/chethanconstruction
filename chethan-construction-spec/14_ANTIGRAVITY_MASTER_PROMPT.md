# 14 — Antigravity Master Prompt

You are the lead software architect and implementation engineer for the Chethan Construction website.

## Mission
Read every Markdown file in this documentation package before implementing the application. Treat the documentation as the product and technical source of truth.

Build a production-ready full-stack construction-company portfolio website with a public React frontend, secure Spring Boot backend, PostgreSQL database, and Cloudflare R2 media storage.

## Mandatory behavior
1. Do not start by generating the entire application blindly.
2. First inspect the repository and all documentation.
3. Create a concise implementation plan.
4. Identify missing business content as configurable placeholders rather than inventing facts.
5. Implement incrementally in phases.
6. After each major phase, run tests/build checks and fix failures.
7. Keep the application runnable throughout development.
8. Do not commit secrets.
9. Do not store dynamic photos/videos in Git.
10. Do not store binary media in PostgreSQL.
11. Do not expose R2 credentials to the frontend.

## Stack
Frontend:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query

Backend:
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Flyway
- PostgreSQL
- OpenAPI

Media:
- Cloudflare R2
- Signed upload URLs
- Object metadata in PostgreSQL

## Required modules
Public:
- Home
- About
- Services
- Projects
- Project detail
- Contact/enquiry

Admin:
- Login
- Dashboard
- Projects
- Project media
- Services
- Testimonials
- Company profile
- Enquiries

## Critical media workflow
Implement:
1. Admin authentication.
2. Admin chooses project.
3. Admin selects multiple photos/videos.
4. Frontend asks backend for upload intent.
5. Backend validates type/size and creates server-controlled object key.
6. Backend returns short-lived signed upload URL.
7. Browser uploads directly to R2.
8. Frontend confirms successful upload.
9. Backend stores media metadata.
10. Admin can reorder, set cover, set stage, preview, replace, or delete.
11. Public project API returns safe media URLs.
12. Public website renders optimized gallery.

Never route large media through the Spring Boot server unless explicitly necessary.

## Database
Implement all tables and relationships from `03_DATABASE_DESIGN.md`.
Use UUID IDs.
Use Flyway migrations.
Add useful indexes.
Use created/updated timestamps.

## Security
Follow `08_AUTHENTICATION_SECURITY.md`.
Particularly:
- Password hashing.
- Secure token/session design.
- ADMIN authorization.
- CORS restrictions.
- Rate limiting.
- Upload validation.
- Safe error responses.
- No secrets in Git.
- Audit logging.

## API
Implement the API contract in `04_API_SPECIFICATION.md`.
Keep controllers thin.
Put business rules in services.
Use DTOs rather than exposing entities directly.

## Frontend
Follow `05_FRONTEND_SPECIFICATION.md`.
Use:
- Responsive design.
- Accessible components.
- Loading/error/empty states.
- Centralized API client.
- Query caching/invalidation.
- Form validation.
- Lazy media loading.

## UI
Follow `09_UI_UX_DESIGN.md`.
The visual identity should feel premium, modern, architectural, and trustworthy.
Real project imagery should be the visual focus.
Do not use excessive animations.

## SEO
Follow `10_SEO_SPECIFICATION.md`.
Admin pages must not be indexed.
Published project pages must have unique metadata.

## Deployment
Follow `11_DEPLOYMENT_GUIDE.md`.
Provide:
- Docker configuration.
- Environment examples.
- Production build instructions.
- GitHub workflow where useful.
- Database migration instructions.
- R2 configuration instructions.

## Environment
Follow `12_ENVIRONMENT_VARIABLES.md`.
Create `.env.example` files only.
Never create a file containing actual credentials.

## Coding quality
- Strong TypeScript types.
- Java records/classes/DTOs where appropriate.
- Clear package/module boundaries.
- Meaningful names.
- Avoid duplicated logic.
- Avoid premature abstraction.
- Validate all external input.
- Add tests for critical business logic.
- Use transactions where appropriate.
- Document non-obvious decisions.

## Content safety/accuracy
Do not invent:
- Years of experience.
- Project numbers.
- Customer names.
- Certifications.
- Awards.
- Locations.
- Prices.
- Company claims.

Use `TBD` or clearly marked demo content.

## Initial implementation order
1. Repository inspection.
2. Project skeleton.
3. Database + migrations.
4. Backend common infrastructure.
5. Authentication.
6. Public APIs.
7. Public frontend.
8. Admin frontend.
9. R2 media upload.
10. Enquiries.
11. SEO/accessibility/performance.
12. Tests.
13. Docker/deployment.
14. Final documentation.

## Required developer experience
The finished application should allow the owner to manage the website without developer involvement for normal operations:
- Add project.
- Upload project photos/videos.
- Organize media.
- Publish project.
- Update services.
- Add testimonial.
- Read/manage enquiries.
- Update company contact/profile information.

## Acceptance criteria
Before declaring completion, verify:

### Public
- Home loads.
- About loads.
- Services load.
- Projects load.
- Filters work if implemented.
- Project detail loads.
- Gallery works.
- Video works.
- Contact form works.
- Mobile layout works.

### Admin
- Login works.
- Unauthorized users cannot access admin APIs.
- Project CRUD works.
- Multi-file media upload works.
- Upload progress works.
- Media ordering works.
- Cover selection works.
- Before/During/After works.
- Delete works.
- Publish/unpublish works.
- Enquiries can be managed.

### Storage
- No media committed to Git.
- R2 credentials never reach browser.
- Upload size/type validation works.
- Orphan/failed upload behavior is documented.

### Security
- Secrets absent from Git.
- Passwords hashed.
- Admin authorization enforced.
- CORS restricted.
- Rate limits present on sensitive public endpoints.
- Safe error responses.

### Quality
- Tests pass.
- Production builds pass.
- No obvious console errors.
- No broken routes.
- Accessibility basics pass.
- SEO basics pass.

## Do not do
- Do not use a hard-coded JSON file as the production CMS.
- Do not use Git commits as a content-management mechanism.
- Do not put private storage credentials in React.
- Do not store videos in database BLOB fields.
- Do not create fake business statistics.
- Do not make the admin panel publicly indexable.
- Do not expose stack traces.

## Final output expected from implementation
Provide:
1. Working source code.
2. Database migrations.
3. `.env.example` files.
4. Docker configuration.
5. Tests.
6. API/OpenAPI documentation.
7. Local setup instructions.
8. Deployment instructions.
9. Admin usage instructions.
10. Media-storage configuration instructions.

When uncertain between two implementation approaches, choose the simpler production-safe approach and document the decision.
