begin;

create extension if not exists pgcrypto;

alter table public.profiles
  add column if not exists username text,
  add column if not exists must_change_password boolean not null default true;

create unique index if not exists profiles_username_unique
  on public.profiles (lower(username))
  where username is not null;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, display_name, username, must_change_password)
  values (
    new.id,
    'editor',
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1)),
    true
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create table if not exists public.cms_entries (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  group_name text not null,
  label text not null,
  description text,
  kind text not null default 'section' check (kind in ('section', 'collection', 'settings', 'gallery')),
  sort_order integer not null default 0,
  draft_value jsonb not null default '{}'::jsonb,
  published_value jsonb,
  is_locked boolean not null default true,
  updated_by uuid references auth.users(id) on delete set null,
  published_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists cms_entries_group_order_idx
  on public.cms_entries (group_name, sort_order);

create table if not exists public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.cms_entries(id) on delete cascade,
  entry_key text not null,
  value jsonb not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists content_revisions_entry_idx
  on public.content_revisions (entry_id, created_at desc);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  mime_type text not null,
  original_name text not null,
  size_bytes bigint not null check (size_bytes >= 0),
  alt_text text,
  uploaded_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now()
);

create index if not exists media_assets_created_idx
  on public.media_assets (created_at desc);

create table if not exists public.cms_audit_log (
  id bigint generated always as identity primary key,
  entry_id uuid references public.cms_entries(id) on delete set null,
  entry_key text,
  action text not null,
  changed_by uuid references auth.users(id) on delete set null default auth.uid(),
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_content_manager()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

revoke all on function public.is_content_manager() from public;
grant execute on function public.is_content_manager() to authenticated;

create or replace function public.set_cms_updated_by()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  new.updated_by = auth.uid();
  return new;
end;
$$;

drop trigger if exists cms_entries_set_updated on public.cms_entries;
create trigger cms_entries_set_updated
before update on public.cms_entries
for each row execute function public.set_cms_updated_by();

create or replace function public.audit_cms_entry()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.cms_audit_log (entry_id, entry_key, action, changed_by, old_value, new_value)
  values (
    new.id,
    new.key,
    case
      when old.published_value is distinct from new.published_value then 'publish'
      else 'draft_update'
    end,
    auth.uid(),
    old.draft_value,
    new.draft_value
  );
  return new;
end;
$$;

drop trigger if exists cms_entries_audit on public.cms_entries;
create trigger cms_entries_audit
after update on public.cms_entries
for each row
when (old.draft_value is distinct from new.draft_value or old.published_value is distinct from new.published_value)
execute function public.audit_cms_entry();

create or replace function public.publish_cms_entry(p_entry_key text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_entry public.cms_entries%rowtype;
begin
  if not public.is_content_manager() then
    raise exception 'No autorizado';
  end if;

  select * into current_entry
  from public.cms_entries
  where key = p_entry_key
  for update;

  if not found then
    raise exception 'Entrada no encontrada';
  end if;

  if current_entry.published_value is not null then
    insert into public.content_revisions (entry_id, entry_key, value, created_by)
    values (current_entry.id, current_entry.key, current_entry.published_value, auth.uid());
  end if;

  update public.cms_entries
  set
    published_value = draft_value,
    published_by = auth.uid(),
    published_at = now()
  where id = current_entry.id;
end;
$$;

revoke all on function public.publish_cms_entry(text) from public;
grant execute on function public.publish_cms_entry(text) to authenticated;

alter table public.cms_entries enable row level security;
alter table public.content_revisions enable row level security;
alter table public.media_assets enable row level security;
alter table public.cms_audit_log enable row level security;

drop policy if exists cms_entries_public_read on public.cms_entries;
create policy cms_entries_public_read
on public.cms_entries
for select
to anon, authenticated
using (published_value is not null or public.is_content_manager());

drop policy if exists cms_entries_manager_insert on public.cms_entries;
create policy cms_entries_manager_insert
on public.cms_entries
for insert
to authenticated
with check (public.is_content_manager());

drop policy if exists cms_entries_manager_update on public.cms_entries;
create policy cms_entries_manager_update
on public.cms_entries
for update
to authenticated
using (public.is_content_manager())
with check (public.is_content_manager());

-- Intentionally no DELETE policy: fixed pages and sections cannot be removed from the CMS.

drop policy if exists revisions_manager_read on public.content_revisions;
create policy revisions_manager_read
on public.content_revisions
for select
to authenticated
using (public.is_content_manager());

drop policy if exists media_public_read on public.media_assets;
create policy media_public_read
on public.media_assets
for select
to anon, authenticated
using (true);

drop policy if exists media_manager_insert on public.media_assets;
create policy media_manager_insert
on public.media_assets
for insert
to authenticated
with check (public.is_content_manager());

drop policy if exists media_manager_update on public.media_assets;
create policy media_manager_update
on public.media_assets
for update
to authenticated
using (public.is_content_manager())
with check (public.is_content_manager());

drop policy if exists media_manager_delete on public.media_assets;
create policy media_manager_delete
on public.media_assets
for delete
to authenticated
using (public.is_content_manager());

drop policy if exists audit_manager_read on public.cms_audit_log;
create policy audit_manager_read
on public.cms_audit_log
for select
to authenticated
using (public.is_content_manager());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media',
  'site-media',
  true,
  26214400,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists site_media_public_read on storage.objects;
create policy site_media_public_read
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'site-media');

drop policy if exists site_media_manager_insert on storage.objects;
create policy site_media_manager_insert
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-media' and public.is_content_manager());

drop policy if exists site_media_manager_update on storage.objects;
create policy site_media_manager_update
on storage.objects
for update
to authenticated
using (bucket_id = 'site-media' and public.is_content_manager())
with check (bucket_id = 'site-media' and public.is_content_manager());

drop policy if exists site_media_manager_delete on storage.objects;
create policy site_media_manager_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-media' and public.is_content_manager());

commit;
