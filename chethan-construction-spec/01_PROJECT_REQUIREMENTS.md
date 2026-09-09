# 01 — Project Requirements

## 1. Product vision
Create a premium, trustworthy digital profile for Chethan Construction that showcases completed and ongoing construction work and converts visitors into enquiries.

## 2. Primary users

### Public visitor
A potential residential or commercial customer who wants to:
- Understand the company.
- See services.
- Review previous work.
- Inspect project details and media.
- Contact the company or request a quote.

### Administrator
The company owner/authorized staff who needs to:
- Sign in securely.
- Manage projects.
- Upload project photos/videos.
- Organize media.
- Publish/unpublish projects.
- Manage services and testimonials.
- Review enquiries.
- Update company profile information.

## 3. Public pages
Required:
- `/`
- `/about`
- `/services`
- `/projects`
- `/projects/:slug`
- `/contact`

Optional later:
- `/testimonials`
- `/privacy`
- `/terms`

## 4. Home page requirements
Sections:
1. Header/navigation.
2. Hero with strong construction message and primary CTA.
3. Company introduction.
4. Services preview.
5. Featured projects.
6. Why choose us.
7. Business statistics, only when verified.
8. Testimonials.
9. CTA/contact section.
10. Footer.

Never invent project counts, years of experience, clients, certifications, awards, or claims.

## 5. About requirements
Support:
- Company story.
- Founder/team introduction.
- Vision.
- Mission.
- Values.
- Service area.
- Company image.

## 6. Services requirements
Each service:
- Name.
- Short summary.
- Detailed description.
- Image/icon.
- Display order.
- Published status.

Examples only; confirm with owner:
- Residential construction.
- Commercial construction.
- Renovation/remodeling.
- Civil works.
- Waterproofing.
- Site development.

## 7. Project requirements
Each project supports:
- Title.
- Slug.
- Short description.
- Detailed description.
- Location.
- Project type/category.
- Area.
- Start date.
- Completion date.
- Status: UPCOMING, ONGOING, COMPLETED.
- Featured flag.
- Cover media.
- Gallery.
- Before/During/After media.
- Published flag.
- SEO title/description.

## 8. Media requirements
Administrator can:
- Upload multiple photos.
- Upload videos.
- Associate media with a project.
- Select media stage: BEFORE, DURING, AFTER, GENERAL.
- Set display order.
- Mark one cover image.
- Delete media.
- Replace media.
- View upload progress.
- See validation errors.

Do not store binary media in PostgreSQL.

## 9. Enquiry requirements
Public enquiry fields:
- Name.
- Phone.
- Email, optional.
- Project type.
- Location, optional.
- Approximate budget, optional.
- Message.
- Consent checkbox if required.

Admin can:
- View enquiries.
- Filter by status.
- Mark NEW, CONTACTED, IN_PROGRESS, CLOSED, SPAM.
- Add internal notes.
- View creation date.

## 10. Admin requirements
- Secure login.
- Dashboard.
- Projects CRUD.
- Services CRUD.
- Testimonials CRUD.
- Company profile management.
- Media management.
- Enquiry management.
- Basic audit logging.

## 11. Non-functional requirements
- Responsive.
- Accessible.
- Fast.
- SEO-ready.
- Secure.
- Maintainable.
- API documented.
- Automated validation.
- Proper error messages.
- Production logging.
- Database migrations.

## 12. Explicit non-goals for v1
Do not build:
- Customer payments.
- Construction accounting.
- Employee payroll.
- Inventory management.
- Full CRM.
- Complex project scheduling.
- Public user accounts.

These can be future modules if required.
