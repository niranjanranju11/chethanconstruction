# 12 — Environment Variables

Never commit real production values.

## Backend

```env
SPRING_PROFILES_ACTIVE=dev

SERVER_PORT=8080

DB_URL=jdbc:postgresql://localhost:5432/chethan_construction
DB_USERNAME=postgres
DB_PASSWORD=change-me

JWT_SECRET=change-me
JWT_ACCESS_TOKEN_MINUTES=15
JWT_REFRESH_TOKEN_DAYS=7

CORS_ALLOWED_ORIGINS=http://localhost:5173

R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=change-me
R2_SECRET_ACCESS_KEY=change-me
R2_BUCKET=chethan-construction-media
R2_REGION=auto

MEDIA_PUBLIC_BASE_URL=https://media.example.com

MAX_IMAGE_SIZE_BYTES=10485760
MAX_VIDEO_SIZE_BYTES=262144000

APP_BASE_URL=http://localhost:8080
FRONTEND_BASE_URL=http://localhost:5173

LOG_LEVEL=INFO
```

## Frontend

Only public configuration:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_SITE_URL=http://localhost:5173
VITE_WHATSAPP_NUMBER=
```

Never put:
- R2 secret.
- JWT secret.
- DB password.
- private API key.

into frontend environment variables.

## Production rules
- Store secrets in hosting provider secret manager.
- Rotate credentials.
- Use separate dev/staging/prod credentials.
- Never reuse development admin passwords in production.

## `.gitignore`

Must include:
```text
.env
.env.*
!.env.example
node_modules/
dist/
target/
.idea/
.vscode/
*.log
```
