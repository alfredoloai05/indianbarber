begin;

insert into public.profiles (id, role, display_name, username, must_change_password)
select
  users.id,
  'editor',
  coalesce(users.raw_user_meta_data ->> 'display_name', split_part(users.email, '@', 1)),
  coalesce(users.raw_user_meta_data ->> 'username', split_part(users.email, '@', 1)),
  true
from auth.users as users
on conflict (id) do nothing;

commit;
