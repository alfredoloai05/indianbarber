begin;

create or replace function pg_temp.indian_four_space_catalog(source jsonb)
returns jsonb
language plpgsql
as $$
declare
  barberia jsonb;
  combos jsonb;
  fotografia jsonb;
  nails jsonb;
  spa jsonb;
  merged_barberia jsonb;
begin
  select item into barberia
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) as item
  where item ->> 'id' = 'barberia'
  limit 1;

  select item into combos
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) as item
  where item ->> 'id' = 'combos'
  limit 1;

  select item into fotografia
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) as item
  where item ->> 'id' = 'fotografia'
  limit 1;

  select item into nails
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) as item
  where item ->> 'id' = 'nails'
  limit 1;

  select item into spa
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) as item
  where item ->> 'id' = 'spa'
  limit 1;

  if barberia is null then
    return source;
  end if;

  merged_barberia := barberia;

  if combos is not null and not exists (
    select 1
    from jsonb_array_elements(coalesce(barberia -> 'groups', '[]'::jsonb)) as group_item
    where lower(coalesce(group_item ->> 'title', '')) like '%combo%'
  ) then
    merged_barberia := jsonb_set(
      merged_barberia,
      '{groups}',
      coalesce(merged_barberia -> 'groups', '[]'::jsonb) || coalesce(combos -> 'groups', '[]'::jsonb),
      true
    );

    merged_barberia := jsonb_set(
      merged_barberia,
      '{aliases}',
      (
        select coalesce(jsonb_agg(distinct alias_value), '[]'::jsonb)
        from jsonb_array_elements_text(
          coalesce(merged_barberia -> 'aliases', '[]'::jsonb) || coalesce(combos -> 'aliases', '[]'::jsonb)
        ) as alias_value
      ),
      true
    );
  end if;

  merged_barberia := jsonb_set(merged_barberia, '{title}', to_jsonb('Barbería'::text), true);
  merged_barberia := jsonb_set(merged_barberia, '{shortTitle}', to_jsonb('Barbería'::text), true);
  merged_barberia := jsonb_set(
    merged_barberia,
    '{summary}',
    to_jsonb('Cortes, barba, afeitado, combos y servicios especiales dentro del universo de barbería Indian.'::text),
    true
  );
  merged_barberia := jsonb_set(merged_barberia, '{duration}', to_jsonb('10–120 min'::text), true);
  merged_barberia := jsonb_set(merged_barberia, '{price}', to_jsonb('Desde USD 3'::text), true);

  return (
    select coalesce(jsonb_agg(value order by position), '[]'::jsonb)
    from (
      values
        (1, merged_barberia),
        (2, fotografia),
        (3, nails),
        (4, spa)
    ) as ordered_spaces(position, value)
    where value is not null
  );
end;
$$;

create or replace function pg_temp.indian_team_areas(source jsonb)
returns jsonb
language sql
as $$
  select coalesce(
    jsonb_agg(
      jsonb_set(
        item,
        '{areas}',
        case
          when lower(coalesce(item ->> 'role', '')) like '%barber%' then '["barberia"]'::jsonb
          when lower(coalesce(item ->> 'role', '')) ~ 'manicur|nails|uña' then '["nails"]'::jsonb
          when lower(coalesce(item ->> 'role', '')) ~ 'spa|esteti|facial|masaj' then '["spa"]'::jsonb
          when lower(coalesce(item ->> 'role', '')) ~ 'fotograf|contenido visual' then '["fotografia"]'::jsonb
          when lower(coalesce(item ->> 'role', '')) ~ 'ceo|director|coordinador' then '["barberia","fotografia","nails","spa"]'::jsonb
          else '[]'::jsonb
        end,
        true
      )
      order by position
    ),
    '[]'::jsonb
  )
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) with ordinality as entries(item, position);
$$;

create or replace function pg_temp.indian_stylebook_areas(source jsonb)
returns jsonb
language sql
as $$
  select jsonb_set(
    source,
    '{frames}',
    coalesce(
      (
        select jsonb_agg(
          jsonb_set(
            frame,
            '{areas}',
            case
              when lower(coalesce(frame ->> 'label', '')) ~ 'nail|uña' then '["nails"]'::jsonb
              when lower(coalesce(frame ->> 'label', '')) ~ 'spa|bienestar' then '["spa"]'::jsonb
              when lower(coalesce(frame ->> 'label', '')) ~ 'foto|retrato|contenido' then '["fotografia"]'::jsonb
              else '["barberia"]'::jsonb
            end,
            true
          )
          order by position
        )
        from jsonb_array_elements(coalesce(source -> 'frames', '[]'::jsonb)) with ordinality as frames(frame, position)
      ),
      '[]'::jsonb
    ),
    true
  );
$$;

create or replace function pg_temp.indian_promotion_areas(source jsonb)
returns jsonb
language sql
as $$
  select coalesce(
    jsonb_agg(
      jsonb_set(
        item,
        '{areas}',
        case
          when lower(coalesce(item ->> 'title', '')) like '%barber%' then '["barberia"]'::jsonb
          when lower(coalesce(item ->> 'title', '')) ~ 'spa' and lower(coalesce(item ->> 'title', '')) ~ 'nail|uña' then '["spa","nails"]'::jsonb
          when lower(coalesce(item ->> 'title', '')) ~ 'spa' then '["spa"]'::jsonb
          when lower(coalesce(item ->> 'title', '')) ~ 'nail|uña' then '["nails"]'::jsonb
          when lower(coalesce(item ->> 'title', '')) ~ 'foto|retrato' then '["fotografia"]'::jsonb
          else '["barberia","fotografia","nails","spa"]'::jsonb
        end,
        true
      )
      order by position
    ),
    '[]'::jsonb
  )
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) with ordinality as entries(item, position);
$$;

create or replace function pg_temp.indian_journal_areas(source jsonb)
returns jsonb
language plpgsql
as $$
declare
  normalized jsonb;
  photography_article jsonb := jsonb_build_object(
    'slug', 'preparar-una-sesion-fotografica',
    'type', 'Fotografía',
    'title', 'Cómo prepararte para una sesión y verte natural frente a cámara',
    'excerpt', 'Vestuario, referencias y pequeños detalles que ayudan a construir una sesión más auténtica.',
    'image', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=86&w=1800',
    'areas', jsonb_build_array('fotografia'),
    'visible', true,
    'body', jsonb_build_array(
      'Elige prendas con las que te reconozcas y evita estrenar una imagen que no usarías fuera de la sesión. La comodidad se nota en la postura y en la expresión.',
      'Lleva dos o tres referencias para explicar el tono que buscas, pero permite que la iluminación y la dirección se adapten a ti, al espacio y al uso final de las fotografías.',
      'Descansa, llega con tiempo y confirma antes el formato de entrega. Saber si las fotos serán para redes, perfil profesional o producto ayuda a planificar cada toma.'
    )
  );
  spa_article jsonb := jsonb_build_object(
    'slug', 'prolongar-bienestar-despues-spa',
    'type', 'SPA',
    'title', 'Cómo prolongar la sensación de bienestar después de tu visita',
    'excerpt', 'Hidratación, descanso y cuidados sencillos para acompañar mejor una experiencia de SPA.',
    'image', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=86&w=1800',
    'areas', jsonb_build_array('spa'),
    'visible', true,
    'body', jsonb_build_array(
      'Después de una experiencia de cuidado, prioriza hidratación y descanso. Evita llenar inmediatamente el resto del día con actividades intensas cuando puedas darte un margen de calma.',
      'Sigue las recomendaciones específicas del profesional sobre productos, temperatura, exposición solar o actividad física según el tratamiento elegido.',
      'La constancia suele aportar más que una intervención aislada. Consulta la frecuencia adecuada para tu objetivo y evita repetir tratamientos sin una valoración previa.'
    )
  );
begin
  select coalesce(
    jsonb_agg(
      jsonb_set(
        item,
        '{areas}',
        case
          when lower(coalesce(item ->> 'type', '') || ' ' || coalesce(item ->> 'title', '')) ~ 'nail|uña' then '["nails"]'::jsonb
          when lower(coalesce(item ->> 'type', '') || ' ' || coalesce(item ->> 'title', '')) ~ 'spa|bienestar|relaj' then '["spa"]'::jsonb
          when lower(coalesce(item ->> 'type', '') || ' ' || coalesce(item ->> 'title', '')) ~ 'foto|retrato|cámara|sesión' then '["fotografia"]'::jsonb
          else '["barberia"]'::jsonb
        end,
        true
      )
      order by position
    ),
    '[]'::jsonb
  ) into normalized
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) with ordinality as entries(item, position);

  if not exists (
    select 1 from jsonb_array_elements(normalized) as item
    where item ->> 'slug' = 'preparar-una-sesion-fotografica'
  ) then
    normalized := normalized || jsonb_build_array(photography_article);
  end if;

  if not exists (
    select 1 from jsonb_array_elements(normalized) as item
    where item ->> 'slug' = 'prolongar-bienestar-despues-spa'
  ) then
    normalized := normalized || jsonb_build_array(spa_article);
  end if;

  return normalized;
end;
$$;

update public.cms_entries
set
  draft_value = jsonb_set(
    jsonb_set(
      draft_value,
      '{navigation}',
      '[{"label":"Barbería","to":"/barberia"},{"label":"Estudio Fotográfico","to":"/estudio-fotografico"},{"label":"Nails","to":"/nails"},{"label":"SPA","to":"/spa"},{"label":"La Casa","to":"/club"},{"label":"Gift Cards","to":"/tarjetas-regalo"},{"label":"Contacto","to":"/contacto"}]'::jsonb,
      true
    ),
    '{socialLinks}',
    '[{"label":"Instagram","href":"https://instagram.com/indianclubec"},{"label":"TikTok","href":"https://tiktok.com/@indianclubec"},{"label":"Facebook","href":"https://www.facebook.com/Indianclubec"},{"label":"Todas las redes","href":"https://linktr.ee/indianclubec"}]'::jsonb,
    true
  ),
  published_value = case
    when published_value is null then null
    else jsonb_set(
      jsonb_set(
        published_value,
        '{navigation}',
        '[{"label":"Barbería","to":"/barberia"},{"label":"Estudio Fotográfico","to":"/estudio-fotografico"},{"label":"Nails","to":"/nails"},{"label":"SPA","to":"/spa"},{"label":"La Casa","to":"/club"},{"label":"Gift Cards","to":"/tarjetas-regalo"},{"label":"Contacto","to":"/contacto"}]'::jsonb,
        true
      ),
      '{socialLinks}',
      '[{"label":"Instagram","href":"https://instagram.com/indianclubec"},{"label":"TikTok","href":"https://tiktok.com/@indianclubec"},{"label":"Facebook","href":"https://www.facebook.com/Indianclubec"},{"label":"Todas las redes","href":"https://linktr.ee/indianclubec"}]'::jsonb,
      true
    )
  end,
  updated_at = now()
where key = 'global.settings';

update public.cms_entries
set
  draft_value = jsonb_set(draft_value, '{title}', to_jsonb('Cuatro espacios. Una sola Indian House.'::text), true),
  published_value = case
    when published_value is null then null
    else jsonb_set(published_value, '{title}', to_jsonb('Cuatro espacios. Una sola Indian House.'::text), true)
  end,
  updated_at = now()
where key = 'home.services';

update public.cms_entries
set
  draft_value = pg_temp.indian_four_space_catalog(draft_value),
  published_value = case when published_value is null then null else pg_temp.indian_four_space_catalog(published_value) end,
  updated_at = now()
where key = 'services.catalog';

update public.cms_entries
set
  draft_value = pg_temp.indian_team_areas(draft_value),
  published_value = case when published_value is null then null else pg_temp.indian_team_areas(published_value) end,
  updated_at = now()
where key = 'team.members';

update public.cms_entries
set
  draft_value = pg_temp.indian_stylebook_areas(draft_value),
  published_value = case when published_value is null then null else pg_temp.indian_stylebook_areas(published_value) end,
  updated_at = now()
where key = 'stylebook.gallery';

update public.cms_entries
set
  draft_value = pg_temp.indian_promotion_areas(draft_value),
  published_value = case when published_value is null then null else pg_temp.indian_promotion_areas(published_value) end,
  updated_at = now()
where key = 'promotions.list';

update public.cms_entries
set
  draft_value = pg_temp.indian_journal_areas(draft_value),
  published_value = case when published_value is null then null else pg_temp.indian_journal_areas(published_value) end,
  updated_at = now()
where key = 'journal.articles';

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
  'spaces.pages',
  'Espacios',
  'Contenido de los cuatro espacios',
  'Textos, beneficios y consultas de Barbería, Estudio Fotográfico, Nails y SPA.',
  'collection',
  25,
  '[
    {
      "id":"barberia",
      "title":"Barbería Indian.",
      "lead":"Corte, barba, afeitado, combos y detalles pensados para sostener tu estilo fuera de la silla.",
      "servicesTitle":"Elige cómo quieres verte.",
      "teamTitle":"El equipo detrás de cada acabado.",
      "styleBookTitle":"Resultados de barbería, sin referencias genéricas.",
      "adviceTitle":"Cuida mejor el corte y la barba entre visitas.",
      "benefitsTitle":"Beneficios para volver con intención.",
      "inquiryTitle":"Habla con Barbería Indian.",
      "inquiryLead":"Cuéntanos qué quieres cambiar, qué referencia tienes o qué duda necesitas resolver.",
      "benefits":[
        {"title":"Combos dentro de Barbería","description":"Cabello, barba, cejas y limpieza facial pueden resolverse en una misma visita."},
        {"title":"Reserva con contexto","description":"Elige servicio, profesional, fecha y hora antes de enviar la solicitud."},
        {"title":"Mantenimiento claro","description":"Recibe recomendaciones para sostener mejor la forma y el acabado."}
      ]
    },
    {
      "id":"fotografia",
      "title":"Estudio Fotográfico Indian.",
      "lead":"Retratos, marca personal, contenido para redes y producto dentro de una experiencia dirigida.",
      "servicesTitle":"Elige qué necesitas comunicar.",
      "teamTitle":"Dirección y producción para tu sesión.",
      "styleBookTitle":"Imágenes que muestran intención, no poses vacías.",
      "adviceTitle":"Llega mejor preparado a tu próxima sesión.",
      "benefitsTitle":"Una sesión pensada para el uso real de tus imágenes.",
      "inquiryTitle":"Cuéntanos la idea de tu sesión.",
      "inquiryLead":"Indica si buscas retrato, marca personal, contenido o producto y te ayudamos a definir el formato.",
      "benefits":[
        {"title":"Dirección durante la sesión","description":"Acompañamiento para postura, expresión y construcción de cada toma."},
        {"title":"Dentro de Indian House","description":"Puedes combinar fotografía con barbería, nails o preparación previa."},
        {"title":"Propuesta según objetivo","description":"La sesión se plantea según dónde y cómo utilizarás las imágenes."}
      ]
    },
    {
      "id":"nails",
      "title":"Nails Studio Indian.",
      "lead":"Manicura, pedicura y sistemas semipermanentes con preparación, higiene y acabado profesional.",
      "servicesTitle":"Elige el acabado y el cuidado que necesitas.",
      "teamTitle":"Técnica y detalle en cada proceso.",
      "styleBookTitle":"Diseños y acabados para encontrar tu referencia.",
      "adviceTitle":"Cuida mejor tus uñas entre una cita y la siguiente.",
      "benefitsTitle":"Beneficios para manos, pies y mantenimiento.",
      "inquiryTitle":"Haz una consulta a Nails Studio.",
      "inquiryLead":"Envíanos tu idea, referencia o duda sobre el sistema que mejor se adapta a tus uñas.",
      "benefits":[
        {"title":"Preparación e higiene","description":"Cada servicio parte del estado de la uña y del resultado que quieres mantener."},
        {"title":"Opciones para manos y pies","description":"Manicura, pedicura, semipermanente, base rubber, Soft Gel y retiro."},
        {"title":"Reserva directa con Nails","description":"La consulta y la cita llegan identificadas con el área seleccionada."}
      ]
    },
    {
      "id":"spa",
      "title":"SPA Indian.",
      "lead":"Experiencias de bienestar, relajación y cuidado personal coordinadas según tu objetivo.",
      "servicesTitle":"Elige el momento de cuidado que buscas.",
      "teamTitle":"Atención preparada para cada experiencia.",
      "styleBookTitle":"Una mirada al ambiente y al cuidado detrás del SPA.",
      "adviceTitle":"Prolonga el bienestar después de tu visita.",
      "benefitsTitle":"Beneficios para bajar el ritmo y cuidarte mejor.",
      "inquiryTitle":"Consulta con el equipo SPA.",
      "inquiryLead":"Cuéntanos qué experiencia buscas y te orientamos según tratamientos y disponibilidad.",
      "benefits":[
        {"title":"Valoración previa","description":"La experiencia se coordina según tus necesidades y el servicio disponible."},
        {"title":"Tiempo dedicado al cuidado","description":"Rituales faciales, relajación y opciones personalizadas con reserva previa."},
        {"title":"Orientación directa","description":"Resuelve dudas por WhatsApp antes de seleccionar la fecha y hora."}
      ]
    }
  ]'::jsonb,
  '[
    {
      "id":"barberia",
      "title":"Barbería Indian.",
      "lead":"Corte, barba, afeitado, combos y detalles pensados para sostener tu estilo fuera de la silla.",
      "servicesTitle":"Elige cómo quieres verte.",
      "teamTitle":"El equipo detrás de cada acabado.",
      "styleBookTitle":"Resultados de barbería, sin referencias genéricas.",
      "adviceTitle":"Cuida mejor el corte y la barba entre visitas.",
      "benefitsTitle":"Beneficios para volver con intención.",
      "inquiryTitle":"Habla con Barbería Indian.",
      "inquiryLead":"Cuéntanos qué quieres cambiar, qué referencia tienes o qué duda necesitas resolver.",
      "benefits":[
        {"title":"Combos dentro de Barbería","description":"Cabello, barba, cejas y limpieza facial pueden resolverse en una misma visita."},
        {"title":"Reserva con contexto","description":"Elige servicio, profesional, fecha y hora antes de enviar la solicitud."},
        {"title":"Mantenimiento claro","description":"Recibe recomendaciones para sostener mejor la forma y el acabado."}
      ]
    },
    {
      "id":"fotografia",
      "title":"Estudio Fotográfico Indian.",
      "lead":"Retratos, marca personal, contenido para redes y producto dentro de una experiencia dirigida.",
      "servicesTitle":"Elige qué necesitas comunicar.",
      "teamTitle":"Dirección y producción para tu sesión.",
      "styleBookTitle":"Imágenes que muestran intención, no poses vacías.",
      "adviceTitle":"Llega mejor preparado a tu próxima sesión.",
      "benefitsTitle":"Una sesión pensada para el uso real de tus imágenes.",
      "inquiryTitle":"Cuéntanos la idea de tu sesión.",
      "inquiryLead":"Indica si buscas retrato, marca personal, contenido o producto y te ayudamos a definir el formato.",
      "benefits":[
        {"title":"Dirección durante la sesión","description":"Acompañamiento para postura, expresión y construcción de cada toma."},
        {"title":"Dentro de Indian House","description":"Puedes combinar fotografía con barbería, nails o preparación previa."},
        {"title":"Propuesta según objetivo","description":"La sesión se plantea según dónde y cómo utilizarás las imágenes."}
      ]
    },
    {
      "id":"nails",
      "title":"Nails Studio Indian.",
      "lead":"Manicura, pedicura y sistemas semipermanentes con preparación, higiene y acabado profesional.",
      "servicesTitle":"Elige el acabado y el cuidado que necesitas.",
      "teamTitle":"Técnica y detalle en cada proceso.",
      "styleBookTitle":"Diseños y acabados para encontrar tu referencia.",
      "adviceTitle":"Cuida mejor tus uñas entre una cita y la siguiente.",
      "benefitsTitle":"Beneficios para manos, pies y mantenimiento.",
      "inquiryTitle":"Haz una consulta a Nails Studio.",
      "inquiryLead":"Envíanos tu idea, referencia o duda sobre el sistema que mejor se adapta a tus uñas.",
      "benefits":[
        {"title":"Preparación e higiene","description":"Cada servicio parte del estado de la uña y del resultado que quieres mantener."},
        {"title":"Opciones para manos y pies","description":"Manicura, pedicura, semipermanente, base rubber, Soft Gel y retiro."},
        {"title":"Reserva directa con Nails","description":"La consulta y la cita llegan identificadas con el área seleccionada."}
      ]
    },
    {
      "id":"spa",
      "title":"SPA Indian.",
      "lead":"Experiencias de bienestar, relajación y cuidado personal coordinadas según tu objetivo.",
      "servicesTitle":"Elige el momento de cuidado que buscas.",
      "teamTitle":"Atención preparada para cada experiencia.",
      "styleBookTitle":"Una mirada al ambiente y al cuidado detrás del SPA.",
      "adviceTitle":"Prolonga el bienestar después de tu visita.",
      "benefitsTitle":"Beneficios para bajar el ritmo y cuidarte mejor.",
      "inquiryTitle":"Consulta con el equipo SPA.",
      "inquiryLead":"Cuéntanos qué experiencia buscas y te orientamos según tratamientos y disponibilidad.",
      "benefits":[
        {"title":"Valoración previa","description":"La experiencia se coordina según tus necesidades y el servicio disponible."},
        {"title":"Tiempo dedicado al cuidado","description":"Rituales faciales, relajación y opciones personalizadas con reserva previa."},
        {"title":"Orientación directa","description":"Resuelve dudas por WhatsApp antes de seleccionar la fecha y hora."}
      ]
    }
  ]'::jsonb,
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

commit;
