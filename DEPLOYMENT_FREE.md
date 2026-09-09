# 100% Free Hosting Guide — Chethan Construction

This guide explains how to host the complete **Chethan Construction** web application (public website, admin portal, Spring Boot REST API, and media storage) with **$0 cost** and **no credit card required**.

---

## Architecture Summary (100% Free Tier)

| Component | Free Platform | Cost | Details |
| :--- | :--- | :--- | :--- |
| **Unified App (Frontend + Backend)** | **Render** or **Koyeb** | **$0 / month** | Runs Docker container (React 19 + Spring Boot 3.4) with free SSL (`https://...`) |
| **Database** | **Neon.tech** or **Render Postgres** | **$0 / month** | Free serverless PostgreSQL with Flyway automated migrations |
| **Media Storage** | **Cloudflare R2** or Container Disk | **$0 / month** | 10 GB free monthly storage with zero egress fees |
| **Domain & SSL** | Included free (`.onrender.com` / `.koyeb.app`) | **$0 / month** | Free automated HTTPS certificates |

---

## Method 1: 1-Click Free Deployment on Render (Easiest)

We have already configured [`Dockerfile`](file:///c:/Users/DELL/Desktop/Niranjan%20-%20Backup/my_projects/chethan_construction/Dockerfile) and [`render.yaml`](file:///c:/Users/DELL/Desktop/Niranjan%20-%20Backup/my_projects/chethan_construction/render.yaml) in the repository.

### Step 1: Push latest files to GitHub
Run the following in your project terminal:
```powershell
git add .
git commit -m "Add production Dockerfile, render.yaml, and SPA controller"
git push origin main
```

### Step 2: Deploy on Render
1. Visit **[render.com](https://render.com/)** and click **Sign Up** using your GitHub account (`niranjanranju11`).
2. On your Render dashboard, click **New +** and select **Blueprint**.
3. Select your repository: `niranjanranju11/chethan_construction`.
4. Render will automatically read `render.yaml` and set up:
   - **chethan-construction** (Free Web Service)
   - **chethan-db** (Free PostgreSQL Database)
5. Click **Apply**.
6. Wait 3–5 minutes while Docker builds both the React frontend and Spring Boot backend.
7. You will receive a live URL:
   - Public Website: `https://chethan-construction.onrender.com`
   - Admin Portal: `https://chethan-construction.onrender.com/admin/login`

---

## Method 2: Neon Serverless Postgres (Never Sleeps) + Render Free Web Service

Render's free database expires after 30 days. To have a **permanent free database that never expires**, use **Neon**:

### Step 1: Create Free Database on Neon
1. Go to **[neon.tech](https://neon.tech/)** and Sign In with GitHub (free forever, no credit card).
2. Create a project named `chethan-construction`.
3. Copy the **Connection String** (e.g., `postgres://user:password@ep-xyz.aws.neon.tech/neondb?sslmode=require`).

### Step 2: Deploy on Render as Web Service
1. In Render, click **New +** ➔ **Web Service**.
2. Connect `niranjanranju11/chethan_construction`.
3. Select **Docker** environment.
4. Set Instance Type to **Free**.
5. Under **Environment Variables**, add:
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `DB_URL` = `jdbc:postgresql://ep-xyz.aws.neon.tech/neondb?sslmode=require` *(Replace with your Neon host & credentials)*
   - `DB_USERNAME` = *(your Neon user)*
   - `DB_PASSWORD` = *(your Neon password)*
   - `JWT_SECRET` = *(generate any random 32-character string)*
   - `ADMIN_INITIAL_EMAIL` = `admin@chethanconstruction.com`
   - `ADMIN_INITIAL_PASSWORD` = `YourSecureAdminPassword123!`
   - `R2_MOCK_MODE` = `true` *(or enter Cloudflare R2 credentials for free 10GB cloud storage)*
6. Click **Deploy Web Service**.

---

## Method 3: Cloudflare R2 (10 GB Free Forever Object Storage)

If you want cloud-hosted media files rather than local container storage:
1. Go to **[cloudflare.com](https://dash.cloudflare.com/)** and sign up for a free account.
2. Under **R2 Object Storage**, click **Create Bucket** named `chethan-construction-media`.
3. Under R2 Settings, generate an **API Token** with `Object Read & Write` permissions.
4. Add these environment variables in your Render / hosting dashboard:
   - `R2_ENDPOINT` = `https://<account-id>.r2.cloudflarestorage.com`
   - `R2_ACCESS_KEY_ID` = `<your-access-key-id>`
   - `R2_SECRET_ACCESS_KEY` = `<your-secret-access-key>`
   - `R2_BUCKET` = `chethan-construction-media`
   - `R2_PUBLIC_BASE_URL` = `https://pub-<hash>.r2.dev` *(Enable Public Access R2.dev subdomain for free)*
   - `R2_MOCK_MODE` = `false`

Cloudflare provides **10 GB/month storage for free** with **zero egress costs**.

---

## Default Administrator Credentials
Once deployed, log into the CMS portal at:
- **URL**: `https://<your-deployed-domain>/admin/login`
- **Default Email**: `admin@chethanconstruction.com`
- **Default Password**: Set via `ADMIN_INITIAL_PASSWORD` (or `AdminPassword123!` if not overridden)
