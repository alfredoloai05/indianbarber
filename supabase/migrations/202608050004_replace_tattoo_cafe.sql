begin;

create or replace function pg_temp.replace_spa_area(source jsonb)
returns jsonb
language sql
immutable
as $$
  select coalesce(
    jsonb_agg(
      case
        when item ->> 'id' = 'tattoo' then
          jsonb_build_object(
            'id', 'tattoo',
            'route', 'spa',
            'aliases', jsonb_build_array('spa', 'tattoo-studio'),
            'eyebrow', 'Bienestar y cuidado',
            'title', 'SPA',
            'shortTitle', 'SPA',
            'summary', 'Experiencias de relajación y cuidado personal con atención previa y reserva directa.',
            'duration', 'Según tratamiento',
            'price', 'Consultar',
            'media', jsonb_build_object(
              'kind', 'image',
              'poster', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=2200'
            ),
            'groups', jsonb_build_array(
              jsonb_build_object(
                'title', 'Experiencias disponibles',
                'items', jsonb_build_array(
                  jsonb_build_object(
                    'name', 'Valoración y reserva SPA',
                    'duration', 'Según tratamiento',
                    'price', 'Consultar',
                    'note', 'Los servicios, tiempos y valores se confirman directamente con el centro.'
                  )
                )
              )
            )
          )
        else item
      end
      order by position
    ),
    '[]'::jsonb
  )
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) with ordinality as entries(item, position);
$$;

create or replace function pg_temp.remove_legacy_tattoo_member(source jsonb)
returns jsonb
language sql
immutable
as $$
  select coalesce(jsonb_agg(item order by position), '[]'::jsonb)
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) with ordinality as entries(item, position)
  where item ->> 'name' <> 'César Castejón';
$$;

create or replace function pg_temp.replace_tattoo_promotion(source jsonb)
returns jsonb
language sql
immutable
as $$
  select coalesce(
    jsonb_agg(
      case
        when lower(item ->> 'title') like '%tattoo%' then
          jsonb_set(item, '{title}', to_jsonb(replace(item ->> 'title', 'tattoo', 'SPA')))
        else item
      end
      order by position
    ),
    '[]'::jsonb
  )
  from jsonb_array_elements(coalesce(source, '[]'::jsonb)) with ordinality as entries(item, position);
$$;

update public.cms_entries
set
  draft_value = jsonb_build_object(
    'location', 'Loja · Ecuador',
    'founded', 'Desde 2018',
    'title', 'Barbería, SPA, nails y estudio fotográfico.',
    'lead', 'Cuidado, estilo y experiencias en un solo lugar.',
    'video', 'https://www.pexels.com/download/video/9738001/',
    'poster', 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=88&w=2200',
    'primaryLabel', 'Reservar cita',
    'secondaryLabel', 'Ver trabajos'
  ),
  published_value = case
    when published_value is null then null
    else jsonb_build_object(
      'location', 'Loja · Ecuador',
      'founded', 'Desde 2018',
      'title', 'Barbería, SPA, nails y estudio fotográfico.',
      'lead', 'Cuidado, estilo y experiencias en un solo lugar.',
      'video', 'https://www.pexels.com/download/video/9738001/',
      'poster', 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=88&w=2200',
      'primaryLabel', 'Reservar cita',
      'secondaryLabel', 'Ver trabajos'
    )
  end
where key = 'home.hero';

update public.cms_entries
set
  draft_value = jsonb_build_object(
    'eyebrow', 'El Club',
    'title', 'Estudio fotográfico, parqueo y todo Indian en un solo lugar.',
    'description', 'Completa tu visita con un espacio preparado para crear retratos y contenido visual.',
    'ctaLabel', 'Conocer el lugar',
    'video', '',
    'poster', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200'
  ),
  published_value = case
    when published_value is null then null
    else jsonb_build_object(
      'eyebrow', 'El Club',
      'title', 'Estudio fotográfico, parqueo y todo Indian en un solo lugar.',
      'description', 'Completa tu visita con un espacio preparado para crear retratos y contenido visual.',
      'ctaLabel', 'Conocer el lugar',
      'video', '',
      'poster', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200'
    )
  end
where key = 'home.club';

update public.cms_entries
set
  draft_value = pg_temp.replace_spa_area(draft_value),
  published_value = case when published_value is null then null else pg_temp.replace_spa_area(published_value) end
where key = 'services.catalog';

update public.cms_entries
set
  draft_value = pg_temp.remove_legacy_tattoo_member(draft_value),
  published_value = case when published_value is null then null else pg_temp.remove_legacy_tattoo_member(published_value) end
where key = 'team.members';

update public.cms_entries
set
  draft_value = jsonb_build_object(
    'eyebrow', 'Equipo Indian Club',
    'title', 'Barbería, SPA y nails. Personas que conocen su oficio.',
    'description', 'Conoce al equipo y encuentra al profesional adecuado para el servicio que quieres reservar.',
    'collaborationEyebrow', 'Trabajo en equipo',
    'collaborationTitle', 'Tres especialidades dentro de la misma casa.',
    'collaborationDescription', 'Barbería, SPA y nails comparten el espacio y la atención para que puedas combinar distintos servicios en una sola visita.',
    'bookingTitle', 'Elige el servicio y revisa quién está disponible.',
    'bookingDescription', 'La plataforma de reservas te permite consultar horarios y seleccionar al profesional para tu próxima visita.'
  ),
  published_value = case
    when published_value is null then null
    else jsonb_build_object(
      'eyebrow', 'Equipo Indian Club',
      'title', 'Barbería, SPA y nails. Personas que conocen su oficio.',
      'description', 'Conoce al equipo y encuentra al profesional adecuado para el servicio que quieres reservar.',
      'collaborationEyebrow', 'Trabajo en equipo',
      'collaborationTitle', 'Tres especialidades dentro de la misma casa.',
      'collaborationDescription', 'Barbería, SPA y nails comparten el espacio y la atención para que puedas combinar distintos servicios en una sola visita.',
      'bookingTitle', 'Elige el servicio y revisa quién está disponible.',
      'bookingDescription', 'La plataforma de reservas te permite consultar horarios y seleccionar al profesional para tu próxima visita.'
    )
  end
where key = 'team.page';

update public.cms_entries
set
  draft_value = pg_temp.replace_tattoo_promotion(draft_value),
  published_value = case when published_value is null then null else pg_temp.replace_tattoo_promotion(published_value) end
where key = 'promotions.list';

update public.cms_entries
set
  draft_value = jsonb_build_object(
    'eyebrow', 'El Club · Loja',
    'title', 'Todo Indian en un solo lugar.',
    'description', 'Barbería, SPA, nails, estudio fotográfico y parqueo para que tu visita sea cómoda desde que llegas.',
    'heroVideo', '',
    'heroPoster', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200',
    'gallery', jsonb_build_array(
      jsonb_build_object('label', 'Estudio fotográfico', 'title', 'Retratos y contenido visual dentro de Indian Club.', 'image', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200'),
      jsonb_build_object('label', 'Barbería', 'title', 'Corte, barba y afeitado.', 'image', 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=88&w=2200'),
      jsonb_build_object('label', 'SPA', 'title', 'Bienestar, relajación y cuidado personal.', 'image', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=2200'),
      jsonb_build_object('label', 'Nails Studio', 'title', 'Manicura, pedicura y sistemas semipermanentes.', 'image', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=88&w=2200')
    ),
    'amenitiesTitle', 'Un espacio para disfrutar la visita completa.',
    'amenities', jsonb_build_array(
      jsonb_build_object('title', 'Parqueo exclusivo', 'description', 'Estaciona durante tu visita sin buscar espacio en el centro.'),
      jsonb_build_object('title', 'Estudio fotográfico', 'description', 'Un espacio preparado para retratos y creación de contenido visual.'),
      jsonb_build_object('title', 'Todo en la misma casa', 'description', 'Barbería, SPA, nails y fotografía sin desplazarte a distintos lugares.')
    )
  ),
  published_value = case
    when published_value is null then null
    else jsonb_build_object(
      'eyebrow', 'El Club · Loja',
      'title', 'Todo Indian en un solo lugar.',
      'description', 'Barbería, SPA, nails, estudio fotográfico y parqueo para que tu visita sea cómoda desde que llegas.',
      'heroVideo', '',
      'heroPoster', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200',
      'gallery', jsonb_build_array(
        jsonb_build_object('label', 'Estudio fotográfico', 'title', 'Retratos y contenido visual dentro de Indian Club.', 'image', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200'),
        jsonb_build_object('label', 'Barbería', 'title', 'Corte, barba y afeitado.', 'image', 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=88&w=2200'),
        jsonb_build_object('label', 'SPA', 'title', 'Bienestar, relajación y cuidado personal.', 'image', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=2200'),
        jsonb_build_object('label', 'Nails Studio', 'title', 'Manicura, pedicura y sistemas semipermanentes.', 'image', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=88&w=2200')
      ),
      'amenitiesTitle', 'Un espacio para disfrutar la visita completa.',
      'amenities', jsonb_build_array(
        jsonb_build_object('title', 'Parqueo exclusivo', 'description', 'Estaciona durante tu visita sin buscar espacio en el centro.'),
        jsonb_build_object('title', 'Estudio fotográfico', 'description', 'Un espacio preparado para retratos y creación de contenido visual.'),
        jsonb_build_object('title', 'Todo en la misma casa', 'description', 'Barbería, SPA, nails y fotografía sin desplazarte a distintos lugares.')
      )
    )
  end
where key = 'club.page';

update public.cms_entries
set
  draft_value = jsonb_set(draft_value, '{image}', to_jsonb('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200'::text), true),
  published_value = case
    when published_value is null then null
    else jsonb_set(published_value, '{image}', to_jsonb('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200'::text), true)
  end
where key in ('home.giftCards', 'giftcards.page');

commit;
