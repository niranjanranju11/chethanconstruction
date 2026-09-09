# 03 — Database Design

Use PostgreSQL and UUID identifiers.

## 1. users

```text
id UUID PK
email VARCHAR(255) UNIQUE NOT NULL
password_hash TEXT NOT NULL
role VARCHAR(50) NOT NULL
enabled BOOLEAN NOT NULL DEFAULT TRUE
created_at TIMESTAMP WITH TIME ZONE NOT NULL
updated_at TIMESTAMP WITH TIME ZONE NOT NULL
last_login_at TIMESTAMP WITH TIME ZONE NULL
```

Roles:
- ADMIN

Do not store plaintext passwords.

## 2. company_profile

```text
id UUID PK
company_name VARCHAR(255) NOT NULL
tagline VARCHAR(500)
short_description TEXT
full_description TEXT
phone VARCHAR(50)
whatsapp VARCHAR(50)
email VARCHAR(255)
address TEXT
service_area TEXT
google_maps_url TEXT
logo_media_id UUID NULL
hero_media_id UUID NULL
created_at TIMESTAMP WITH TIME ZONE NOT NULL
updated_at TIMESTAMP WITH TIME ZONE NOT NULL
```

## 3. services

```text
id UUID PK
name VARCHAR(255) NOT NULL
slug VARCHAR(255) UNIQUE NOT NULL
short_description TEXT
description TEXT
image_url TEXT
display_order INT NOT NULL DEFAULT 0
published BOOLEAN NOT NULL DEFAULT TRUE
created_at TIMESTAMP WITH TIME ZONE NOT NULL
updated_at TIMESTAMP WITH TIME ZONE NOT NULL
```

## 4. projects

```text
id UUID PK
title VARCHAR(255) NOT NULL
slug VARCHAR(255) UNIQUE NOT NULL
short_description TEXT
description TEXT
location VARCHAR(255)
project_type VARCHAR(100)
area VARCHAR(100)
start_date DATE
completion_date DATE
status VARCHAR(30) NOT NULL
featured BOOLEAN NOT NULL DEFAULT FALSE
published BOOLEAN NOT NULL DEFAULT FALSE
seo_title VARCHAR(255)
seo_description VARCHAR(500)
created_at TIMESTAMP WITH TIME ZONE NOT NULL
updated_at TIMESTAMP WITH TIME ZONE NOT NULL
```

Status:
- UPCOMING
- ONGOING
- COMPLETED

## 5. project_media

```text
id UUID PK
project_id UUID NOT NULL FK projects(id)
storage_key TEXT NOT NULL UNIQUE
public_url TEXT
media_type VARCHAR(20) NOT NULL
stage VARCHAR(20) NOT NULL DEFAULT 'GENERAL'
original_filename VARCHAR(500)
mime_type VARCHAR(100)
size_bytes BIGINT
width INT
height INT
duration_seconds NUMERIC
thumbnail_url TEXT
display_order INT NOT NULL DEFAULT 0
cover BOOLEAN NOT NULL DEFAULT FALSE
created_at TIMESTAMP WITH TIME ZONE NOT NULL
```

media_type:
- IMAGE
- VIDEO

stage:
- BEFORE
- DURING
- AFTER
- GENERAL

Index:
- project_id
- project_id + display_order
- project_id + stage

## 6. testimonials

```text
id UUID PK
customer_name VARCHAR(255) NOT NULL
customer_role_or_context VARCHAR(255)
quote TEXT NOT NULL
photo_url TEXT
rating SMALLINT
published BOOLEAN NOT NULL DEFAULT TRUE
display_order INT NOT NULL DEFAULT 0
created_at TIMESTAMP WITH TIME ZONE NOT NULL
updated_at TIMESTAMP WITH TIME ZONE NOT NULL
```

Do not publish a testimonial without appropriate permission.

## 7. enquiries

```text
id UUID PK
name VARCHAR(255) NOT NULL
phone VARCHAR(50) NOT NULL
email VARCHAR(255)
project_type VARCHAR(100)
location VARCHAR(255)
budget VARCHAR(100)
message TEXT NOT NULL
status VARCHAR(30) NOT NULL DEFAULT 'NEW'
internal_notes TEXT
created_at TIMESTAMP WITH TIME ZONE NOT NULL
updated_at TIMESTAMP WITH TIME ZONE NOT NULL
```

Status:
- NEW
- CONTACTED
- IN_PROGRESS
- CLOSED
- SPAM

## 8. audit_logs

```text
id UUID PK
user_id UUID NULL
action VARCHAR(100) NOT NULL
entity_type VARCHAR(100)
entity_id UUID
details JSONB
ip_hash_or_redacted_value TEXT NULL
created_at TIMESTAMP WITH TIME ZONE NOT NULL
```

Avoid storing unnecessary personal data.

## 9. Migrations
Use Flyway or Liquibase. Prefer Flyway for simplicity.

Never modify production schema manually without a migration.

## 10. Referential integrity
- Deleting a project should delete its media metadata.
- Actual R2 objects must also be deleted safely.
- Use transactional application logic for DB + storage cleanup.
- Consider soft-delete if business requirements require recovery.

## 11. Seed data
Development may contain clearly marked demo data. Production must require explicit owner content.
