-- Adds the contact fields the course form now asks for.
-- Run once in Supabase: SQL Editor -> New query -> paste -> Run. Safe to run twice.
alter table course_applications add column if not exists whatsapp text check (whatsapp is null or char_length(whatsapp) <= 20);
alter table course_applications add column if not exists email text check (email is null or char_length(email) <= 120);
notify pgrst, 'reload schema';
