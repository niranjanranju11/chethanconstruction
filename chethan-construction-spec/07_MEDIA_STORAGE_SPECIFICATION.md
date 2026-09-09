# 07 — Media Storage Specification

## 1. Primary recommendation
Use Cloudflare R2 for project photos/videos.

Important: the free allowance is not unlimited lifetime storage. Design the system so storage usage is visible and costs can be controlled. Check current Cloudflare pricing before production deployment because provider pricing/limits can change.

## 2. Why object storage
Do not store photo/video binaries in PostgreSQL.
Do not commit uploaded media into GitHub.
Do not depend on the frontend's `public/` directory for dynamic uploads.

## 3. Bucket structure

Recommended object keys:

```text
company/
  logo/
  hero/

projects/
  {projectId}/
    {mediaId}/
      original.ext
      thumbnail.ext
      web.ext
```

The database stores the object key and metadata.

## 4. Upload security
Backend must:
- Authenticate admin.
- Validate file size.
- Validate declared MIME type.
- Validate extension.
- Prefer content/signature validation.
- Generate server-controlled storage keys.
- Never trust user-provided object keys.
- Use short-lived signed URLs.
- Restrict upload to intended bucket/prefix.
- Prevent path traversal.

## 5. Image processing
Prefer creating optimized derivatives:
- Thumbnail.
- Medium.
- Large/web display.

Keep original only if business requirements need it.

## 6. Video processing
For v1:
- Accept a controlled set of formats.
- Store original.
- Generate poster thumbnail where practical.
- Stream using object storage/CDN.
- Consider transcoding later.

Do not automatically process huge videos on the API server.

## 7. Deletion
When media is deleted:
1. Mark/remove DB metadata safely.
2. Delete object from R2.
3. Remove derivative objects.
4. Record audit event.

Handle partial failures with a cleanup/reconciliation strategy.

## 8. Storage lifecycle
Future option:
- Move old originals to cheaper storage.
- Delete unused temporary objects.
- Keep thumbnails/optimized versions.

## 9. Backups
Database backups and media backups are separate concerns.
Define a recovery plan before production.

## 10. Important business rule
The owner must understand that "free" provider tiers have limits. Photos may remain inexpensive for a long time, but continuous video uploads can exceed free storage/operations. Add an admin storage-usage view or at least monitoring.

## 11. CDN/public access
Use a custom media domain if practical:
`media.example-domain.in`

Do not expose storage credentials.

## 12. Orphan cleanup
Implement a scheduled/manual process that finds:
- DB media records missing from storage.
- Storage objects without DB records.

This becomes important as the system grows.
