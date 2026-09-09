# 08 — Authentication & Security

## 1. Authentication
Use Spring Security.

Preferred architecture:
- Short-lived access token.
- Secure refresh mechanism using httpOnly, Secure, SameSite cookies where compatible.
- Token rotation/revocation for refresh tokens.

Do not store passwords or raw credentials in source code.

## 2. Passwords
Hash using a modern password hashing algorithm supported by Spring Security, such as BCrypt or Argon2.
Never log passwords.

## 3. Authorization
All admin endpoints require:
- Valid authenticated session/token.
- ADMIN role.

Public endpoints must not allow content modification.

## 4. CORS
Allow only configured frontend origins.
Never use unrestricted `*` with credentialed requests.

## 5. CSRF
If cookie-based authentication is used, implement CSRF protection appropriately.
If pure bearer-token APIs are used, document the threat model and storage strategy.

## 6. Rate limiting
Apply rate limits to:
- Login.
- Public enquiry.
- Upload-intent endpoint.
- Other abuse-prone endpoints.

## 7. File upload security
Reject:
- Executable files.
- Unknown file types.
- Oversized files.
- Suspicious filenames.
- Disallowed MIME types.

Use server-generated filenames/keys.

## 8. XSS prevention
- Escape user-generated text.
- Never render arbitrary HTML from project descriptions unless sanitized.
- Sanitize any rich text.

## 9. SQL injection
Use JPA/parameterized queries.
Never concatenate untrusted input into SQL.

## 10. Secrets
Secrets must exist only in:
- Local `.env`/secret manager.
- Hosting provider secret settings.

Never commit:
- DB passwords.
- R2 access keys.
- JWT secrets.
- SMTP passwords.
- API keys.

## 11. Security headers
Configure suitable:
- Content-Security-Policy.
- X-Content-Type-Options.
- Referrer-Policy.
- Frame-ancestors/frame protection.
- Strict-Transport-Security on HTTPS.

Test CSP against actual media/CDN requirements.

## 12. Audit logging
Log:
- Login success/failure at appropriate level.
- Project create/update/delete/publish.
- Media upload/delete.
- Company profile changes.
- User/role changes.

Avoid logging passwords, tokens, or unnecessary personal data.

## 13. Production errors
Return safe messages.
Keep stack traces in server logs only.

## 14. Dependency security
- Keep Java/Spring dependencies current.
- Run dependency vulnerability scans.
- Review GitHub Dependabot/security alerts.
