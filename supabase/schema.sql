-- Benzadid Intelligence — Admin Panel Schema
-- Run this once in Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS / CREATE OR REPLACE).

-- ============================================================
-- 1. PORTFOLIO / DEMO VIDEOS  (single source, replaces 3 duplicated arrays)
-- ============================================================
create table if not exists portfolio_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tag text,                                   -- e.g. "Healthcare"
  video_url text,                             -- Supabase Storage URL for uploaded file
  youtube_id text,                            -- alternative to video_url: paste a YouTube link/id instead
  live_link text,                             -- the actual deployed website link
  tier text check (tier in ('essential', 'premium', null)),  -- website pricing tier tag, null = no tier
  placement text[] not null default '{}',     -- e.g. {'homepage','work_page','service_website'}
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 2. TUTORIAL VIDEOS  (replaces duplicated Work page / Guidance page arrays)
-- ============================================================
create table if not exists tutorials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tag text,
  youtube_id text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 3. CONTENT / AD / STORYTELLING VIDEOS (replaces duplicated Work/Content page arrays)
-- ============================================================
create table if not exists content_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('ad', 'storytelling')),
  platform text,                              -- youtube / linkedin / instagram etc, for badge styling
  video_url text,
  youtube_id text,
  href text,                                  -- optional external link
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 4. CLIENT LOGOS
-- ============================================================
create table if not exists client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  group_name text not null check (group_name in ('worked_with', 'trusted_by')),
  no_invert boolean not null default false,   -- some logos shouldn't be color-inverted on dark bg
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 5. SERVICES  (the 5 core services — website/automation/content/audit/guidance)
-- ============================================================
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  number text,
  title text not null,
  big_headline text[] not null default '{}',  -- 2 lines
  pain text not null default '',
  description text not null default '',
  cta_label text,
  cta_href text,
  features text[] not null default '{}',
  pricing text,                               -- short display string e.g. "Starting from $400"
  best_for text,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 6. WEBSITE PRICING TIERS (Essential / Premium cards)
-- ============================================================
create table if not exists pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null default 'website',
  key text not null check (key in ('essential', 'premium')),
  name text not null,
  price numeric not null,
  best_for text,
  recommended boolean not null default false,
  sort_order int not null default 0,
  unique (service_slug, key)
);

create table if not exists pricing_tier_features (
  id uuid primary key default gen_random_uuid(),
  tier_id uuid not null references pricing_tiers(id) on delete cascade,
  label text not null,
  sub text,
  sort_order int not null default 0
);

-- ============================================================
-- 7. PRICING COMPARISON TABLE (feeds off the same tiers, but its own row copy)
-- ============================================================
create table if not exists comparison_rows (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null default 'website',
  feature text not null,
  essential_value text,        -- 'true' / 'false' / a custom string, rendered accordingly
  premium_value text,
  premium_only boolean not null default false,
  sort_order int not null default 0
);

-- ============================================================
-- 8. CUSTOM PLAN BANNER BULLETS (per service, currently website-only)
-- ============================================================
create table if not exists custom_plan_points (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null default 'website',
  point text not null,
  sort_order int not null default 0
);

-- ============================================================
-- 9. TESTIMONIALS
-- ============================================================
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  role text,
  avatar_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 10. SITE SETTINGS (single-row key-value store)
-- ============================================================
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 11. PAGE CONTENT (key-value JSON per page/section — hero, pain hook, about timeline, etc.)
-- ============================================================
create table if not exists page_content (
  id uuid primary key default gen_random_uuid(),
  page text not null,          -- 'home' | 'about' | 'work' | 'contact'
  section text not null,       -- 'hero' | 'pain_hook' | 'timeline' | ...
  content jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  unique (page, section)
);

-- ============================================================
-- 12. LEADS (contact form submissions)
-- ============================================================
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  interested_service text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Public (anon) can READ published content only.
-- Only authenticated users (the admin login) can INSERT/UPDATE/DELETE, and can read everything incl. unpublished.
-- Leads: public can INSERT (submit the form) but not read; only admin can read/update.
-- ============================================================

alter table portfolio_videos enable row level security;
alter table tutorials enable row level security;
alter table content_videos enable row level security;
alter table client_logos enable row level security;
alter table services enable row level security;
alter table pricing_tiers enable row level security;
alter table pricing_tier_features enable row level security;
alter table comparison_rows enable row level security;
alter table custom_plan_points enable row level security;
alter table testimonials enable row level security;
alter table site_settings enable row level security;
alter table page_content enable row level security;
alter table leads enable row level security;

-- Public read (published only) policies
drop policy if exists "public read published portfolio_videos" on portfolio_videos;
create policy "public read published portfolio_videos" on portfolio_videos for select using (published = true);

drop policy if exists "public read published tutorials" on tutorials;
create policy "public read published tutorials" on tutorials for select using (published = true);

drop policy if exists "public read published content_videos" on content_videos;
create policy "public read published content_videos" on content_videos for select using (published = true);

drop policy if exists "public read published client_logos" on client_logos;
create policy "public read published client_logos" on client_logos for select using (published = true);

drop policy if exists "public read services" on services;
create policy "public read services" on services for select using (true);

drop policy if exists "public read pricing_tiers" on pricing_tiers;
create policy "public read pricing_tiers" on pricing_tiers for select using (true);

drop policy if exists "public read pricing_tier_features" on pricing_tier_features;
create policy "public read pricing_tier_features" on pricing_tier_features for select using (true);

drop policy if exists "public read comparison_rows" on comparison_rows;
create policy "public read comparison_rows" on comparison_rows for select using (true);

drop policy if exists "public read custom_plan_points" on custom_plan_points;
create policy "public read custom_plan_points" on custom_plan_points for select using (true);

drop policy if exists "public read published testimonials" on testimonials;
create policy "public read published testimonials" on testimonials for select using (published = true);

drop policy if exists "public read site_settings" on site_settings;
create policy "public read site_settings" on site_settings for select using (true);

drop policy if exists "public read page_content" on page_content;
create policy "public read page_content" on page_content for select using (true);

-- Public can submit leads, but not read them
drop policy if exists "public insert leads" on leads;
create policy "public insert leads" on leads for insert with check (true);

-- Authenticated (admin) full access on every table
drop policy if exists "admin full access portfolio_videos" on portfolio_videos;
create policy "admin full access portfolio_videos" on portfolio_videos for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access tutorials" on tutorials;
create policy "admin full access tutorials" on tutorials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access content_videos" on content_videos;
create policy "admin full access content_videos" on content_videos for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access client_logos" on client_logos;
create policy "admin full access client_logos" on client_logos for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access services" on services;
create policy "admin full access services" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access pricing_tiers" on pricing_tiers;
create policy "admin full access pricing_tiers" on pricing_tiers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access pricing_tier_features" on pricing_tier_features;
create policy "admin full access pricing_tier_features" on pricing_tier_features for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access comparison_rows" on comparison_rows;
create policy "admin full access comparison_rows" on comparison_rows for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access custom_plan_points" on custom_plan_points;
create policy "admin full access custom_plan_points" on custom_plan_points for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access testimonials" on testimonials;
create policy "admin full access testimonials" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access site_settings" on site_settings;
create policy "admin full access site_settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access page_content" on page_content;
create policy "admin full access page_content" on page_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full access leads" on leads;
create policy "admin full access leads" on leads for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET for uploaded images/videos
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select using (bucket_id = 'media');

drop policy if exists "admin upload media" on storage.objects;
create policy "admin upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "admin update media" on storage.objects;
create policy "admin update media" on storage.objects for update to authenticated using (bucket_id = 'media');

drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media" on storage.objects for delete to authenticated using (bucket_id = 'media');
