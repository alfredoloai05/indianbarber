begin;

update public.cms_entries
set
  draft_value = jsonb_build_object(
    'eyebrow', 'Style Book',
    'title', 'Trabajos y experiencias de Indian Club.',
    'description', 'Cortes, perfilados, nails, SPA y fotografía para que conozcas el universo visual de Indian Club.',
    'frames', jsonb_build_array(
      jsonb_build_object(
        'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp',
        'label', 'Corte y acabado',
        'alt', 'Cliente atendido dentro de Indian Club',
        'className', 'style-book-grid__hero'
      ),
      jsonb_build_object(
        'image', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200',
        'label', 'Estudio fotográfico',
        'alt', 'Estudio fotográfico de Indian Club',
        'className', 'style-book-grid__tall'
      ),
      jsonb_build_object(
        'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2597-4450906.png?format=webp',
        'label', 'Barbería',
        'alt', 'Corte realizado por Indian Club',
        'className', 'style-book-grid__wide'
      ),
      jsonb_build_object(
        'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_9109.JPG-4450892.jpeg?format=webp',
        'label', 'Nails Studio',
        'alt', 'Diseño de uñas realizado por Indian Club Nails Studio',
        'className', 'style-book-grid__small'
      ),
      jsonb_build_object(
        'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2212-4450905.jpg?format=webp',
        'label', 'Barba y perfilado',
        'alt', 'Resultado de barbería realizado en Indian Club',
        'className', 'style-book-grid__portrait'
      ),
      jsonb_build_object(
        'image', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=2200',
        'label', 'SPA',
        'alt', 'Experiencia SPA en Indian Club',
        'className', 'style-book-grid__small'
      )
    )
  ),
  published_value = case
    when published_value is null then null
    else jsonb_build_object(
      'eyebrow', 'Style Book',
      'title', 'Trabajos y experiencias de Indian Club.',
      'description', 'Cortes, perfilados, nails, SPA y fotografía para que conozcas el universo visual de Indian Club.',
      'frames', jsonb_build_array(
        jsonb_build_object(
          'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp',
          'label', 'Corte y acabado',
          'alt', 'Cliente atendido dentro de Indian Club',
          'className', 'style-book-grid__hero'
        ),
        jsonb_build_object(
          'image', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=88&w=2200',
          'label', 'Estudio fotográfico',
          'alt', 'Estudio fotográfico de Indian Club',
          'className', 'style-book-grid__tall'
        ),
        jsonb_build_object(
          'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2597-4450906.png?format=webp',
          'label', 'Barbería',
          'alt', 'Corte realizado por Indian Club',
          'className', 'style-book-grid__wide'
        ),
        jsonb_build_object(
          'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_9109.JPG-4450892.jpeg?format=webp',
          'label', 'Nails Studio',
          'alt', 'Diseño de uñas realizado por Indian Club Nails Studio',
          'className', 'style-book-grid__small'
        ),
        jsonb_build_object(
          'image', 'https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2212-4450905.jpg?format=webp',
          'label', 'Barba y perfilado',
          'alt', 'Resultado de barbería realizado en Indian Club',
          'className', 'style-book-grid__portrait'
        ),
        jsonb_build_object(
          'image', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=88&w=2200',
          'label', 'SPA',
          'alt', 'Experiencia SPA en Indian Club',
          'className', 'style-book-grid__small'
        )
      )
    )
  end
where key = 'stylebook.gallery';

commit;
