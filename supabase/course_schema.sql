-- ============================================================
-- Digital Residency Program: course page content, applications, analytics
-- Run once in the Supabase SQL editor, AFTER schema.sql.
-- Safe to re-run (idempotent). Nothing here touches existing tables.
-- ============================================================

-- ------------------------------------------------------------
-- 0. ADMIN ALLOW-LIST
-- Today every logged-in Supabase user is treated as admin.
-- Course data (applications, ID images) is sensitive, so course tables
-- check this list instead of "any authenticated user".
-- ------------------------------------------------------------
create table if not exists admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  added_at timestamptz not null default now()
);
alter table admin_users enable row level security;

create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admin_users where user_id = auth.uid());
$$;

drop policy if exists "admins read admin_users" on admin_users;
create policy "admins read admin_users" on admin_users for select using (is_admin());

-- Add Shadly as the first admin (uses the existing login account).
insert into admin_users (user_id, email)
select id, email from auth.users where email = 'benzadidintelligence@gmail.com'
on conflict (user_id) do nothing;

-- ------------------------------------------------------------
-- 1. PAGE CONTENT: one JSON document, draft + published
-- The site reads `published`; the admin edits `draft`.
-- Missing keys fall back to lib/course/site.ts, so the page is never blank.
-- ------------------------------------------------------------
create table if not exists course_pages (
  slug text primary key,                       -- 'digital-residency-program'
  draft jsonb not null default '{}',
  published jsonb not null default '{}',
  draft_updated_at timestamptz not null default now(),
  published_at timestamptz
);
alter table course_pages enable row level security;

drop policy if exists "public read published course_pages" on course_pages;
-- the public page only needs `published`; the draft column is not secret copy,
-- but reads go through a view so the draft never leaves the database
drop policy if exists "admin all course_pages" on course_pages;
create policy "admin all course_pages" on course_pages for all using (is_admin()) with check (is_admin());

create or replace view course_pages_public
with (security_invoker = false) as
  select slug, published, published_at from course_pages;
grant select on course_pages_public to anon, authenticated;

insert into course_pages (slug) values ('digital-residency-program')
on conflict (slug) do nothing;

-- Every publish keeps a full copy, for one-click rollback.
create table if not exists course_page_versions (
  id bigint generated always as identity primary key,
  slug text not null references course_pages (slug) on delete cascade,
  content jsonb not null,
  note text,
  published_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);
create index if not exists course_page_versions_slug_idx on course_page_versions (slug, created_at desc);
alter table course_page_versions enable row level security;
drop policy if exists "admin all course_page_versions" on course_page_versions;
create policy "admin all course_page_versions" on course_page_versions for all using (is_admin()) with check (is_admin());

-- ------------------------------------------------------------
-- 2. APPLICATIONS (PRIVATE)
-- The public never reads this table. Inserts come only from the
-- server route /api/course/apply (service role), after validation,
-- honeypot and rate-limit checks.
-- ------------------------------------------------------------
create table if not exists course_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  course_slug text not null default 'digital-residency-program',
  full_name text not null check (char_length(full_name) between 2 and 80),
  facebook_name text not null check (char_length(facebook_name) between 2 and 80),
  medical_college text not null check (char_length(medical_college) between 2 and 120),
  session text not null check (char_length(session) between 2 and 20),
  has_bmdc boolean not null,
  bmdc_number text check (bmdc_number is null or char_length(bmdc_number) <= 20),
  student_year text check (student_year is null or char_length(student_year) <= 20),
  id_image_path text,                          -- path inside the private 'course-ids' bucket
  agreed_at timestamptz not null,
  price_phase text check (price_phase in ('early', 'regular')),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'paid_half', 'paid_full', 'approved', 'refunded', 'rejected')),
  notes text,
  source text,                                 -- utm / referrer, for the funnel
  ip_hash text,                                -- hashed, only for rate limiting
  check ((has_bmdc and bmdc_number is not null) or (not has_bmdc and student_year is not null))
);
create index if not exists course_applications_created_idx on course_applications (created_at desc);
create index if not exists course_applications_status_idx on course_applications (status);
alter table course_applications enable row level security;
drop policy if exists "admin all course_applications" on course_applications;
create policy "admin all course_applications" on course_applications for all using (is_admin()) with check (is_admin());
-- no public policy at all: anon can neither read nor write

-- ------------------------------------------------------------
-- 3. PRIVATE BUCKET for BMDC card / student ID images
-- jpg, png, webp only; 5 MB max. Admin views through short-lived signed URLs.
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('course-ids', 'course-ids', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = false, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "admin read course-ids" on storage.objects;
create policy "admin read course-ids" on storage.objects for select
  using (bucket_id = 'course-ids' and is_admin());
drop policy if exists "admin delete course-ids" on storage.objects;
create policy "admin delete course-ids" on storage.objects for delete
  using (bucket_id = 'course-ids' and is_admin());
-- uploads happen only from the server route with the service role key

-- ------------------------------------------------------------
-- 4. SMALL FUNNEL ANALYTICS (no personal data)
-- ------------------------------------------------------------
create table if not exists course_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  course_slug text not null default 'digital-residency-program',
  event text not null check (event in ('view', 'cta_join', 'cta_whatsapp', 'form_start', 'form_submit')),
  section text,
  visitor text                                  -- random id kept in the browser, not linked to a person
);
create index if not exists course_events_idx on course_events (course_slug, event, created_at desc);
alter table course_events enable row level security;
drop policy if exists "public insert course_events" on course_events;
create policy "public insert course_events" on course_events for insert with check (true);
drop policy if exists "admin read course_events" on course_events;
create policy "admin read course_events" on course_events for select using (is_admin());

-- ------------------------------------------------------------
-- 5. PAYMENTS (PRIVATE): one row per instalment, admin bookkeeping only
-- ------------------------------------------------------------
alter table course_applications add column if not exists fee integer;  -- agreed fee (20000 / 24000, editable for discounts)

create table if not exists course_payments (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references course_applications (id) on delete cascade,
  amount integer not null check (amount > 0),
  paid_on date not null default current_date,
  method text not null check (method in ('bkash', 'nagad', 'rocket', 'bank', 'cash', 'other')),
  trx_id text check (trx_id is null or char_length(trx_id) <= 60),
  note text,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);
create index if not exists course_payments_app_idx on course_payments (application_id, paid_on);
create unique index if not exists course_payments_trx_uniq on course_payments (trx_id) where trx_id is not null;
alter table course_payments enable row level security;
drop policy if exists "admin all course_payments" on course_payments;
create policy "admin all course_payments" on course_payments for all using (is_admin()) with check (is_admin());

create or replace view course_payment_summary
with (security_invoker = true) as
  select a.id, a.full_name, a.status, a.fee,
         coalesce(sum(p.amount), 0) as paid,
         coalesce(a.fee, 0) - coalesce(sum(p.amount), 0) as due,
         max(p.paid_on) as last_paid_on
  from course_applications a
  left join course_payments p on p.application_id = a.id
  group by a.id;
