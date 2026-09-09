# 06 — Admin Panel Specification

## Route
`/admin/login`

Authenticated area:
- `/admin`
- `/admin/projects`
- `/admin/projects/new`
- `/admin/projects/:id/edit`
- `/admin/services`
- `/admin/testimonials`
- `/admin/company`
- `/admin/enquiries`
- `/admin/media`

## Dashboard
Show:
- Total published projects.
- Ongoing projects.
- New enquiries.
- Recently added projects.
- Recent activity.

Do not expose sensitive data unnecessarily.

## Login
Fields:
- Email.
- Password.

Requirements:
- Secure password handling.
- Rate limiting.
- Generic failed-login message.
- Logout.
- Session/token expiry.
- No tokens in insecure local storage if an httpOnly secure-cookie architecture is feasible.

## Project editor

Fields:
- Title.
- Location.
- Project type.
- Area.
- Description.
- Start date.
- Completion date.
- Status.
- Featured.
- Published.
- SEO title.
- SEO description.

## Media uploader
Required UX:
- Drag and drop.
- File picker.
- Multiple selection.
- Upload progress.
- Per-file status.
- Retry failed upload.
- Cancel before completion.
- Preview images.
- Video thumbnail/preview where available.
- Delete.
- Reorder.
- Set cover.
- Stage selection.

Accepted initial types:
Images:
- JPEG
- PNG
- WebP
- AVIF if processing/CDN supports it

Videos:
- MP4
- WebM where supported

Default recommended limits:
- Images: configurable, e.g. 10 MB/file.
- Videos: configurable, e.g. 250 MB/file.

Do not assume these limits are sufficient forever; make them environment-configurable.

## Project media organization

```text
Project
├── BEFORE
├── DURING
├── AFTER
└── GENERAL
```

## Services editor
CRUD + ordering + publish/unpublish.

## Testimonials editor
CRUD + ordering + publish/unpublish.

Require confirmation/permission for publishing customer names/photos.

## Company profile editor
Manage:
- Company name.
- Tagline.
- Descriptions.
- Contact details.
- Address.
- Service area.
- Logo.
- Hero media.
- Maps URL.
- Social links.

## Enquiries
Table:
- Date.
- Name.
- Phone.
- Project type.
- Status.

Details page:
- Full enquiry.
- Status selector.
- Internal notes.
- Contact action.

## Security UX
- Hide admin routes from public navigation.
- Protect every admin API server-side.
- Auto-logout/refresh behavior.
- Confirmation for destructive actions.
- Warn about unsaved changes.
