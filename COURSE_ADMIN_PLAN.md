# Digital Residency Program: admin + backend plan (Step 3)

Status: **plan only, nothing built yet.** Written 2026-10-27 on branch `feature/course-page`.
SQL for this plan: [`supabase/course_schema.sql`](supabase/course_schema.sql) (not run yet).

## 1. What exists today (audit)

| Area | Today | Matters for the course because |
|---|---|---|
| Admin routes | `app/admin/(protected)/*`: homepage, about, services, videos, logos, testimonials, tutorials, media, settings, leads, content-videos | The course admin joins this list, same shell (`components/admin/AdminShell.tsx`) and look |
| Login | Supabase email+password, `/admin/login`; `proxy.ts` sends anyone not logged in back to login | Reused as is |
| Who counts as admin | **Any logged-in Supabase user.** RLS uses `auth.role() = 'authenticated'` | Fine for page copy, **not fine for ID images and applications.** If sign-ups are ever open in Supabase, a stranger could read them. New `admin_users` allow-list + `is_admin()` fixes this for course tables |
| How admin saves | Browser Supabase client writes straight to `page_content` (e.g. `HomepageManager.tsx`) | Same pattern for page copy |
| How the site reads | Server components read Supabase on every request (`ƒ` routes, no cache) | Edits show at once, no redeploy, no revalidation needed |
| Storage | One public bucket `media` | Course videos/photos use it. ID images need a new **private** bucket |
| Leads | `leads` table, public insert only, `/admin/leads` list | Model for the applications list |
| Server-only secrets | None yet (only the public anon key) | Applications + ID upload need `SUPABASE_SERVICE_ROLE_KEY` on the server (Vercel env) |

## 2. Content: every word, number, date and price editable

- **One JSON document per course** in `course_pages` (`draft` + `published`). The shape is exactly `lib/course/site.ts` today: hero, problem, future (Before/After), demo, proof, roadmap, how, who, fit, instructor, price, schedule (dates + early bird), walkaway (cards, market lines, counted values), join (labels, years), faq, final, sections, plus `seo` and `layout`.
- **`site.ts` stays as the fallback.** The page deep-merges `published` over `site.ts`, so a missing field never shows blank.
- **`layout`**: order of sections and show/hide per section.
- **Computed, never typed**: total value (sum of counted values), half payment (price / 2), early bird saving, countdown phase.
- **Validation** (zod) in the editor: required fields, max lengths, numbers are numbers, dates are real dates and early bird end ≤ registration end ≤ class start.

### Draft, preview, publish, rollback
1. Admin edits → saved to `draft` (autosave).
2. **Preview** button opens `/courses/digital-residency-program?preview=1` (admin-only, reads `draft`).
3. **Publish** copies `draft` → `published` and stores a copy in `course_page_versions`.
4. **History** list → "Restore" puts an old version back into `draft` (then publish).

## 3. Admin screens (new)

Added to the existing sidebar under a **Courses** group. All work on phone.

| Route | What it does |
|---|---|
| `/admin/courses/digital-residency` | Content editor, one collapsible panel per section, same order as the page. Lists (chips, cards, rows, FAQ, rotations) can be added, removed, reordered. Media fields: upload to `media` or paste a URL / YouTube link (welcome video). Top bar: Save draft · Preview · Publish · History |
| `/admin/courses/applications` | Counts at top (new, paid, approved). Search, filter by status / student vs BMDC. Open one: all fields, ID image (signed URL, 60 s), change status, notes, "WhatsApp" button with a template, delete (row + image). Export CSV |
| `/admin/courses/analytics` | Funnel for the last 7 / 30 days: views → join clicks → form starts → submits → paid |

## 4. Join form backend

1. Form posts to **`/api/course/apply`** (server route).
2. Server checks: zod validation, hidden honeypot field, rate limit (max 3 per hour per hashed IP), registration still open (from `schedule`).
3. ID image (optional): jpg/png/webp, ≤ 5 MB → private bucket `course-ids`.
4. Row saved in `course_applications` with `price_phase` (early / regular).
5. Browser then opens WhatsApp with the filled message (as now) and shows a success state.
6. Privacy note under the form; admin can delete a record and its image.

## 5. Analytics (small, privacy-friendly)
`course_events`: view, cta_join, cta_whatsapp, form_start, form_submit. A random browser id, no names, no IPs.

## 6. Build order (Step 4), each part shown on localhost before the next

| Part | Work | Done when |
|---|---|---|
| 4a | Run SQL · page reads `published` with `site.ts` fallback · content editor (all sections) · draft / preview / publish / history | Change any text, price or date in admin → page changes after Publish |
| 4b | `/api/course/apply` + private upload · applications admin | Real test application with ID image appears in admin; image opens; status/notes/delete/CSV work |
| 4c | Event tracking + funnel screen | Counts move when clicking through the page |

## 7. What Shadly must do

1. **Run the SQL** (`supabase/course_schema.sql`) in Supabase → SQL editor. It only adds new tables; nothing existing changes.
2. **Service role key** for 4b: copy it from Supabase → Project Settings → API, and add it yourself as `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` and in Vercel → Environment Variables. Do not paste it in chat.
3. Check in Supabase → Authentication → Providers → Email that **"Allow new users to sign up" is OFF**.

## 8. Open questions
- Should the existing admin screens also move to the `admin_users` allow-list (safer), or stay as they are for now?
- Preview URL: `?preview=1` on the real page is simplest. OK?
