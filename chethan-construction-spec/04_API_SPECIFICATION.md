# 04 — API Specification

Base path: `/api/v1`

## Authentication

### POST `/auth/login`
Request:
```json
{
  "email": "admin@example.com",
  "password": "********"
}
```

Response should contain access token and safe user information.

### POST `/auth/refresh`
If refresh-token architecture is selected, rotate/refresh securely.

### POST `/auth/logout`
Invalidate server-side refresh token/session if such architecture is used.

## Public company

### GET `/company`
Returns published company profile.

### GET `/services`
Returns published services.

### GET `/projects`
Query parameters:
- `page`
- `size`
- `type`
- `status`
- `featured`
- `search`

Only published projects are returned publicly.

### GET `/projects/{slug}`
Returns one published project with media.

### GET `/testimonials`
Returns published testimonials.

### POST `/enquiries`
Creates public enquiry. Must have strong validation and abuse protection.

## Admin

All admin endpoints require authentication and ADMIN role.

### Projects
- GET `/admin/projects`
- GET `/admin/projects/{id}`
- POST `/admin/projects`
- PUT `/admin/projects/{id}`
- PATCH `/admin/projects/{id}/publish`
- DELETE `/admin/projects/{id}`

### Services
- GET `/admin/services`
- POST `/admin/services`
- PUT `/admin/services/{id}`
- DELETE `/admin/services/{id}`

### Testimonials
- GET `/admin/testimonials`
- POST `/admin/testimonials`
- PUT `/admin/testimonials/{id}`
- DELETE `/admin/testimonials/{id}`

### Company
- GET `/admin/company`
- PUT `/admin/company`

### Enquiries
- GET `/admin/enquiries`
- GET `/admin/enquiries/{id}`
- PATCH `/admin/enquiries/{id}/status`
- PATCH `/admin/enquiries/{id}/notes`

### Media
- POST `/admin/projects/{projectId}/media/upload-intent`
- POST `/admin/projects/{projectId}/media/{mediaId}/complete`
- PUT `/admin/media/{mediaId}`
- DELETE `/admin/media/{mediaId}`
- PUT `/admin/projects/{projectId}/media/reorder`

## Upload intent request example

```json
{
  "filename": "villa-front.jpg",
  "contentType": "image/jpeg",
  "sizeBytes": 3500000,
  "stage": "AFTER"
}
```

Response:
```json
{
  "mediaId": "uuid",
  "storageKey": "projects/uuid/media/uuid.jpg",
  "uploadUrl": "SIGNED_URL",
  "expiresInSeconds": 900
}
```

Never return R2 access keys.

## Pagination
Use:
```json
{
  "content": [],
  "page": 0,
  "size": 20,
  "totalElements": 100,
  "totalPages": 5
}
```

## Validation
- Required fields rejected with 400.
- Invalid UUID/slug returns appropriate error.
- Missing resource returns 404.
- Unauthorized returns 401.
- Forbidden returns 403.
- Rate-limited requests return 429.

## OpenAPI
Expose Swagger UI only where appropriate. In production, protect it or disable public access.
