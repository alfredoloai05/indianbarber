begin;

insert into public.cms_entries (
  key,
  group_name,
  label,
  description,
  kind,
  sort_order,
  draft_value,
  published_value,
  is_locked,
  published_at
)
values (
  'home.proof',
  'Inicio',
  'Trayectoria y confianza',
  'Datos reales de experiencia, reseñas y clientes mostrados después del Hero.',
  'section',
  25,
  jsonb_build_object(
    'title', 'Una trayectoria construida en Loja.',
    'items', jsonb_build_array(
      jsonb_build_object('value', '+7', 'label', 'años de experiencia'),
      jsonb_build_object('value', '4.7', 'label', 'estrellas en más de 420 reseñas'),
      jsonb_build_object('value', '+100k', 'label', 'clientes atendidos')
    )
  ),
  jsonb_build_object(
    'title', 'Una trayectoria construida en Loja.',
    'items', jsonb_build_array(
      jsonb_build_object('value', '+7', 'label', 'años de experiencia'),
      jsonb_build_object('value', '4.7', 'label', 'estrellas en más de 420 reseñas'),
      jsonb_build_object('value', '+100k', 'label', 'clientes atendidos')
    )
  ),
  true,
  now()
)
on conflict (key) do update
set
  group_name = excluded.group_name,
  label = excluded.label,
  description = excluded.description,
  kind = excluded.kind,
  sort_order = excluded.sort_order,
  draft_value = excluded.draft_value,
  published_value = excluded.published_value,
  published_at = now(),
  updated_at = now();

update public.cms_entries
set
  draft_value = jsonb_set(draft_value, '{title}', to_jsonb('Empieza por lo que quieres hacerte.'::text), true),
  published_value = case
    when published_value is null then null
    else jsonb_set(published_value, '{title}', to_jsonb('Empieza por lo que quieres hacerte.'::text), true)
  end,
  updated_at = now()
where key = 'home.services';

update public.cms_entries
set
  draft_value = jsonb_set(
    jsonb_set(
      draft_value,
      '{title}',
      to_jsonb('Barbería, SPA, nails y fotografía en una misma casa.'::text),
      true
    ),
    '{description}',
    to_jsonb('Conoce todos los espacios de Indian Club y llega con mayor comodidad gracias al parqueo exclusivo para clientes.'::text),
    true
  ),
  published_value = case
    when published_value is null then null
    else jsonb_set(
      jsonb_set(
        published_value,
        '{title}',
        to_jsonb('Barbería, SPA, nails y fotografía en una misma casa.'::text),
        true
      ),
      '{description}',
      to_jsonb('Conoce todos los espacios de Indian Club y llega con mayor comodidad gracias al parqueo exclusivo para clientes.'::text),
      true
    )
  end,
  updated_at = now()
where key = 'home.club';

update public.cms_entries
set
  draft_value = jsonb_set(
    jsonb_set(
      draft_value,
      '{title}',
      to_jsonb('Una casa para cuidar, crear y volver.'::text),
      true
    ),
    '{description}',
    to_jsonb('Barbería, SPA, nails y estudio fotográfico dentro de una misma experiencia en el centro de Loja. El parqueo exclusivo facilita tu llegada.'::text),
    true
  ),
  published_value = case
    when published_value is null then null
    else jsonb_set(
      jsonb_set(
        published_value,
        '{title}',
        to_jsonb('Una casa para cuidar, crear y volver.'::text),
        true
      ),
      '{description}',
      to_jsonb('Barbería, SPA, nails y estudio fotográfico dentro de una misma experiencia en el centro de Loja. El parqueo exclusivo facilita tu llegada.'::text),
      true
    )
  end,
  updated_at = now()
where key = 'club.page';

update public.cms_entries
set
  draft_value = jsonb_set(
    jsonb_set(
      draft_value,
      '{title}',
      to_jsonb('Mira el resultado antes de elegir.'::text),
      true
    ),
    '{description}',
    to_jsonb('Una selección de barbería, barba, nails, SPA y fotografía para encontrar una referencia y reservar desde ella.'::text),
    true
  ),
  published_value = case
    when published_value is null then null
    else jsonb_set(
      jsonb_set(
        published_value,
        '{title}',
        to_jsonb('Mira el resultado antes de elegir.'::text),
        true
      ),
      '{description}',
      to_jsonb('Una selección de barbería, barba, nails, SPA y fotografía para encontrar una referencia y reservar desde ella.'::text),
      true
    )
  end,
  updated_at = now()
where key = 'stylebook.gallery';

update public.cms_entries
set
  draft_value = jsonb_set(
    draft_value,
    '{bookingDescription}',
    to_jsonb('La reserva interna te permite elegir servicio, profesional, fecha y hora antes de solicitar la confirmación.'::text),
    true
  ),
  published_value = case
    when published_value is null then null
    else jsonb_set(
      published_value,
      '{bookingDescription}',
      to_jsonb('La reserva interna te permite elegir servicio, profesional, fecha y hora antes de solicitar la confirmación.'::text),
      true
    )
  end,
  updated_at = now()
where key = 'team.page';

commit;
