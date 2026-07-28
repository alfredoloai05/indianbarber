begin;

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  section text not null,
  value jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published')),
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

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

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.site_content enable row level security;

drop policy if exists "profiles_read_self" on public.profiles;
create policy "profiles_read_self"
on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "published_content_public_read" on public.site_content;
create policy "published_content_public_read"
on public.site_content
for select
to anon, authenticated
using (status = 'published' or public.is_content_manager());

drop policy if exists "content_managers_insert" on public.site_content;
create policy "content_managers_insert"
on public.site_content
for insert
to authenticated
with check (public.is_content_manager());

drop policy if exists "content_managers_update" on public.site_content;
create policy "content_managers_update"
on public.site_content
for update
to authenticated
using (public.is_content_manager())
with check (public.is_content_manager());

drop policy if exists "admins_delete_content" on public.site_content;
create policy "admins_delete_content"
on public.site_content
for delete
to authenticated
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

insert into public.site_content (key, section, value, status)
values
  ('home.hero', 'home', '{"eyebrow":"House of Presence · Loja, Ecuador","title":"Presencia, hecha ritual.","lead":"Grooming, arte y café para personas que llegan con intención."}'::jsonb, 'published'),
  ('home.manifesto', 'home', '{"statement":"No venimos a fabricar una versión nueva de ti. Venimos a cuidar la forma en que eliges presentarte."}'::jsonb, 'published'),
  ('contact.operational', 'contact', '{"city":"Loja, Ecuador","address":null,"hours":null,"whatsapp":null}'::jsonb, 'draft')
on conflict (key) do nothing;

commit;
