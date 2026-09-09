# 05 — Frontend Specification

## 1. Technology
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Form library may be React Hook Form
- Validation may use Zod

## 2. Public layout
- Header.
- Main content.
- Footer.
- Mobile navigation.
- Floating WhatsApp CTA only when configured.

## 3. Home
Hero:
- High-quality construction image/video.
- Short value proposition.
- `Get a Quote`.
- `View Projects`.

Featured projects:
- 3–6 configurable projects.
- Cover image.
- Type.
- Location.
- Status.

Avoid excessive animation.

## 4. Projects page
Features:
- Category filter.
- Status filter.
- Search if project count becomes large.
- Responsive cards.
- Pagination or infinite loading.

## 5. Project detail
Display:
- Title.
- Location.
- Type.
- Area.
- Status.
- Description.
- Project facts.
- Media gallery.
- Before/During/After tabs or sections.
- Videos.
- Enquiry CTA.

Media viewer should support:
- Fullscreen.
- Keyboard navigation where practical.
- Lazy loading.
- Accessible labels.

## 6. Contact
Display:
- Phone.
- WhatsApp.
- Email.
- Address.
- Map link/embed if configured.
- Enquiry form.

## 7. Loading states
Every async page needs:
- Skeleton/loading state.
- Empty state.
- Error state.
- Retry action where appropriate.

## 8. Error handling
Never display raw API errors or stack traces.
Show human-readable messages.

## 9. Images
- Use responsive image sizes.
- Lazy load below-the-fold media.
- Provide width/height or aspect-ratio to reduce layout shift.
- Use modern formats where supported.
- Use thumbnails for galleries.

## 10. Accessibility
- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Alt text.
- Form labels.
- Sufficient contrast.
- Reduced-motion support.

## 11. SEO
Use React Helmet or equivalent carefully, plus server/static metadata strategy suitable for deployment.
Each project needs unique title/description/canonical URL.

## 12. API client
Centralize:
- Base URL.
- Auth headers.
- Error handling.
- Query invalidation.

Do not scatter raw `fetch` calls throughout components.

## 13. Environment
Frontend only receives public configuration, such as:
- API base URL.
- Public site URL.
- Public media/CDN URL if required.

Never expose secrets with Vite `VITE_` variables.

## 14. Responsive breakpoints
Design mobile-first and test at:
- 320px
- 375px
- 768px
- 1024px
- 1440px+

## 15. Visual direction
Premium construction/architecture style:
- Strong photography.
- Clean typography.
- Neutral base.
- One restrained accent color.
- Large spacing.
- Subtle motion.
- Professional project cards.

Do not use generic stock-heavy visuals once real project photos are available.
