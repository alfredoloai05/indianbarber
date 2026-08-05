begin;

create or replace function pg_temp.refresh_service_catalog(source jsonb)
returns jsonb
language plpgsql
immutable
as $$
declare
  result jsonb := '[]'::jsonb;
  item jsonb;
  has_spa boolean := false;
  has_photo boolean := false;
  spa_item jsonb := jsonb_build_object(
    'id', 'spa',
    'route', 'spa',
    'aliases', jsonb_build_array('spa', 'tattoo-studio'),
    'eyebrow', 'Bienestar y cuidado',
    'title', 'SPA',
    'shortTitle', 'SPA',
    'summary', 'Rituales de bienestar, relajación y cuidado personal coordinados según la experiencia que buscas.',
    'duration', '30–75 min aprox.',
    'price', 'Consultar',
    'media', jsonb_build_object(
      'kind', 'image',
      'poster', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=2200'
    ),
    'groups', jsonb_build_array(
      jsonb_build_object(
        'title', 'Cuidado y relajación',
        'items', jsonb_build_array(
          jsonb_build_object(
            'name', 'Ritual facial',
            'duration', '45–60 min aprox.',
            'price', 'Consultar',
            'note', 'La técnica y los productos se coordinan según la valoración previa y la disponibilidad del centro.'
          ),
          jsonb_build_object(
            'name', 'Masaje de relajación',
            'duration', '30–60 min aprox.',
            'price', 'Consultar',
            'note', 'Duración y modalidad sujetas a la experiencia seleccionada.'
          ),
          jsonb_build_object(
            'name', 'Experiencia SPA personalizada',
            'duration', '60–75 min aprox.',
            'price', 'Consultar',
            'note', 'Una combinación de cuidado y relajación definida directamente con el centro.'
          )
        )
      )
    )
  );
  photo_item jsonb := jsonb_build_object(
    'id', 'fotografia',
    'route', 'estudio-fotografico',
    'aliases', jsonb_build_array('estudio-fotografico', 'fotografia'),
    'eyebrow', 'Retrato y contenido',
    'title', 'Estudio Fotográfico',
    'shortTitle', 'Fotografía',
    'summary', 'Sesiones para retrato, marca personal y contenido visual realizadas dentro de Indian Club.',
    'duration', '30–90 min aprox.',
    'price', 'Consultar',
    'media', jsonb_build_object(
      'kind', 'image',
      'poster', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200'
    ),
    'groups', jsonb_build_array(
      jsonb_build_object(
        'title', 'Sesiones disponibles',
        'items', jsonb_build_array(
          jsonb_build_object(
            'name', 'Retrato personal express',
            'duration', '30 min aprox.',
            'price', 'Consultar',
            'note', 'Sesión breve para fotografías personales o actualización de perfil.'
          ),
          jsonb_build_object(
            'name', 'Marca personal',
            'duration', '60 min aprox.',
            'price', 'Consultar',
            'note', 'Retratos pensados para perfiles profesionales, portafolios y presencia digital.'
          ),
          jsonb_build_object(
            'name', 'Contenido para redes',
            'duration', '45–90 min aprox.',
            'price', 'Consultar',
            'note', 'Producción de una selección visual para publicaciones y comunicación de marca.'
          ),
          jsonb_build_object(
            'name', 'Fotografía de producto',
            'duration', 'Según proyecto',
            'price', 'Consultar',
            'note', 'La propuesta se define según cantidad de productos, estilo y formato de entrega.'
          )
        )
      )
    )
  );
begin
  for item in select value from jsonb_array_elements(coalesce(source, '[]'::jsonb))
  loop
    if item ->> 'id' in ('tattoo', 'spa') or item ->> 'route' in ('tattoo-studio', 'spa') then
      result := result || jsonb_build_array(spa_item);
      has_spa := true;
    elsif item ->> 'id' = 'fotografia' or item ->> 'route' = 'estudio-fotografico' then
      result := result || jsonb_build_array(photo_item);
      has_photo := true;
    else
      result := result || jsonb_build_array(item);
    end if;
  end loop;

  if not has_spa then
    result := result || jsonb_build_array(spa_item);
  end if;
  if not has_photo then
    result := result || jsonb_build_array(photo_item);
  end if;
  return result;
end;
$$;

update public.cms_entries
set
  draft_value = pg_temp.refresh_service_catalog(draft_value),
  published_value = case
    when published_value is null then null
    else pg_temp.refresh_service_catalog(published_value)
  end
where key = 'services.catalog';

update public.cms_entries
set
  draft_value = jsonb_build_object(
    'eyebrow', 'Servicios',
    'title', 'Cinco formas de vivir Indian.'
  ),
  published_value = jsonb_build_object(
    'eyebrow', 'Servicios',
    'title', 'Cinco formas de vivir Indian.'
  )
where key = 'home.services';

update public.cms_entries
set
  draft_value = jsonb_build_object(
    'eyebrow', 'La casa',
    'title', 'Barbería, SPA, nails, fotografía y parqueo en un mismo lugar.',
    'description', 'Conoce un espacio pensado para resolver tu visita completa sin salir de Indian Club.',
    'ctaLabel', 'Conocer la casa',
    'video', '',
    'poster', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp'
  ),
  published_value = jsonb_build_object(
    'eyebrow', 'La casa',
    'title', 'Barbería, SPA, nails, fotografía y parqueo en un mismo lugar.',
    'description', 'Conoce un espacio pensado para resolver tu visita completa sin salir de Indian Club.',
    'ctaLabel', 'Conocer la casa',
    'video', '',
    'poster', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp'
  )
where key = 'home.club';

update public.cms_entries
set
  draft_value = jsonb_build_object(
    'eyebrow', 'Indian Club · Loja',
    'title', 'Una casa para cuidar, crear y volver.',
    'description', 'Barbería, SPA, nails, estudio fotográfico y parqueo dentro de una misma experiencia en el centro de Loja.',
    'heroVideo', '',
    'heroPoster', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp',
    'gallery', jsonb_build_array(
      jsonb_build_object('label', 'Barbería', 'title', 'Corte, barba y afeitado con precisión.', 'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2597-4450906.png?format=webp'),
      jsonb_build_object('label', 'Barba y perfilado', 'title', 'Detalles que sostienen mejor el resultado.', 'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2212-4450905.jpg?format=webp'),
      jsonb_build_object('label', 'Nails Studio', 'title', 'Manicura, pedicura y sistemas semipermanentes.', 'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_9109.JPG-4450892.jpeg?format=webp'),
      jsonb_build_object('label', 'SPA', 'title', 'Bienestar, relajación y cuidado personal.', 'image', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=2200'),
      jsonb_build_object('label', 'Estudio Fotográfico', 'title', 'Retratos, marca personal y contenido visual.', 'image', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200'),
      jsonb_build_object('label', 'Parqueo exclusivo', 'title', 'Llega y estaciona durante tu visita.', 'image', 'https://content.app-sources.com/s/249321345646214611/uploads/El_centro/7bd8d8dc-a404-4fa3-ba04-0420ee94de1d-8326539.jpeg?format=webp')
    ),
    'amenitiesTitle', 'Todo lo que necesitas para una visita completa.',
    'amenities', jsonb_build_array(
      jsonb_build_object('title', 'Barbería', 'description', 'Corte, barba, afeitado y servicios especiales con reserva.'),
      jsonb_build_object('title', 'SPA', 'description', 'Experiencias de cuidado y relajación coordinadas según disponibilidad.'),
      jsonb_build_object('title', 'Nails Studio', 'description', 'Servicios para manos y pies dentro del mismo espacio.'),
      jsonb_build_object('title', 'Estudio Fotográfico', 'description', 'Sesiones de retrato, marca personal y contenido visual.'),
      jsonb_build_object('title', 'Parqueo exclusivo', 'description', 'Estaciona durante tu visita sin buscar espacio en el centro.')
    )
  ),
  published_value = jsonb_build_object(
    'eyebrow', 'Indian Club · Loja',
    'title', 'Una casa para cuidar, crear y volver.',
    'description', 'Barbería, SPA, nails, estudio fotográfico y parqueo dentro de una misma experiencia en el centro de Loja.',
    'heroVideo', '',
    'heroPoster', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp',
    'gallery', jsonb_build_array(
      jsonb_build_object('label', 'Barbería', 'title', 'Corte, barba y afeitado con precisión.', 'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2597-4450906.png?format=webp'),
      jsonb_build_object('label', 'Barba y perfilado', 'title', 'Detalles que sostienen mejor el resultado.', 'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2212-4450905.jpg?format=webp'),
      jsonb_build_object('label', 'Nails Studio', 'title', 'Manicura, pedicura y sistemas semipermanentes.', 'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_9109.JPG-4450892.jpeg?format=webp'),
      jsonb_build_object('label', 'SPA', 'title', 'Bienestar, relajación y cuidado personal.', 'image', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=2200'),
      jsonb_build_object('label', 'Estudio Fotográfico', 'title', 'Retratos, marca personal y contenido visual.', 'image', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200'),
      jsonb_build_object('label', 'Parqueo exclusivo', 'title', 'Llega y estaciona durante tu visita.', 'image', 'https://content.app-sources.com/s/249321345646214611/uploads/El_centro/7bd8d8dc-a404-4fa3-ba04-0420ee94de1d-8326539.jpeg?format=webp')
    ),
    'amenitiesTitle', 'Todo lo que necesitas para una visita completa.',
    'amenities', jsonb_build_array(
      jsonb_build_object('title', 'Barbería', 'description', 'Corte, barba, afeitado y servicios especiales con reserva.'),
      jsonb_build_object('title', 'SPA', 'description', 'Experiencias de cuidado y relajación coordinadas según disponibilidad.'),
      jsonb_build_object('title', 'Nails Studio', 'description', 'Servicios para manos y pies dentro del mismo espacio.'),
      jsonb_build_object('title', 'Estudio Fotográfico', 'description', 'Sesiones de retrato, marca personal y contenido visual.'),
      jsonb_build_object('title', 'Parqueo exclusivo', 'description', 'Estaciona durante tu visita sin buscar espacio en el centro.')
    )
  )
where key = 'club.page';

update public.cms_entries
set
  draft_value = jsonb_build_object(
    'eyebrow', 'Style Book',
    'title', 'Trabajos y experiencias de Indian Club.',
    'description', 'Barbería, barba, nails, SPA y fotografía para conocer mejor todo lo que sucede dentro de Indian Club.',
    'frames', jsonb_build_array(
      jsonb_build_object('image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp', 'label', 'Indian Club', 'alt', 'Cliente atendido dentro de Indian Club', 'className', 'style-book-grid__hero'),
      jsonb_build_object('image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2597-4450906.png?format=webp', 'label', 'Corte y acabado', 'alt', 'Corte realizado por Indian Club', 'className', 'style-book-grid__wide'),
      jsonb_build_object('image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2212-4450905.jpg?format=webp', 'label', 'Barba y perfilado', 'alt', 'Resultado de barbería realizado en Indian Club', 'className', 'style-book-grid__portrait'),
      jsonb_build_object('image', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=88&w=2200', 'label', 'Textura y forma', 'alt', 'Detalle de corte y peinado', 'className', 'style-book-grid__small'),
      jsonb_build_object('image', 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=88&w=2200', 'label', 'Afeitado y detalle', 'alt', 'Servicio de barba y afeitado', 'className', 'style-book-grid__tall'),
      jsonb_build_object('image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_9109.JPG-4450892.jpeg?format=webp', 'label', 'Nails Studio', 'alt', 'Diseño de uñas realizado por Indian Club Nails Studio', 'className', 'style-book-grid__small'),
      jsonb_build_object('image', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=2200', 'label', 'SPA', 'alt', 'Experiencia SPA en Indian Club', 'className', 'style-book-grid__wide'),
      jsonb_build_object('image', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200', 'label', 'Estudio Fotográfico', 'alt', 'Estudio fotográfico de Indian Club', 'className', 'style-book-grid__portrait')
    )
  ),
  published_value = jsonb_build_object(
    'eyebrow', 'Style Book',
    'title', 'Trabajos y experiencias de Indian Club.',
    'description', 'Barbería, barba, nails, SPA y fotografía para conocer mejor todo lo que sucede dentro de Indian Club.',
    'frames', jsonb_build_array(
      jsonb_build_object('image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp', 'label', 'Indian Club', 'alt', 'Cliente atendido dentro de Indian Club', 'className', 'style-book-grid__hero'),
      jsonb_build_object('image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2597-4450906.png?format=webp', 'label', 'Corte y acabado', 'alt', 'Corte realizado por Indian Club', 'className', 'style-book-grid__wide'),
      jsonb_build_object('image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2212-4450905.jpg?format=webp', 'label', 'Barba y perfilado', 'alt', 'Resultado de barbería realizado en Indian Club', 'className', 'style-book-grid__portrait'),
      jsonb_build_object('image', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=88&w=2200', 'label', 'Textura y forma', 'alt', 'Detalle de corte y peinado', 'className', 'style-book-grid__small'),
      jsonb_build_object('image', 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=88&w=2200', 'label', 'Afeitado y detalle', 'alt', 'Servicio de barba y afeitado', 'className', 'style-book-grid__tall'),
      jsonb_build_object('image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_9109.JPG-4450892.jpeg?format=webp', 'label', 'Nails Studio', 'alt', 'Diseño de uñas realizado por Indian Club Nails Studio', 'className', 'style-book-grid__small'),
      jsonb_build_object('image', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=2200', 'label', 'SPA', 'alt', 'Experiencia SPA en Indian Club', 'className', 'style-book-grid__wide'),
      jsonb_build_object('image', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200', 'label', 'Estudio Fotográfico', 'alt', 'Estudio fotográfico de Indian Club', 'className', 'style-book-grid__portrait')
    )
  )
where key = 'stylebook.gallery';

commit;
