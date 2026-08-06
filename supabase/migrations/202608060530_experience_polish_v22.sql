-- Indian House experience polish v22
-- Keeps the live CMS aligned with the single-navigation frontend and its distinct media.

begin;

-- Existing published JSON should be treated as published content. Draft edits remain isolated afterwards.
update public.cms_entries
set published_at = coalesce(published_at, now())
where published_value is not null;

-- The Home has its own architectural entrance film instead of repeating Barbería.
update public.cms_entries
set
  draft_value = jsonb_set(
    jsonb_set(coalesce(draft_value, '{}'::jsonb), '{video}', to_jsonb('https://www.pexels.com/download/video/10827607/'::text), true),
    '{poster}',
    to_jsonb('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=88&w=2200'::text),
    true
  ),
  published_value = jsonb_set(
    jsonb_set(coalesce(published_value, draft_value, '{}'::jsonb), '{video}', to_jsonb('https://www.pexels.com/download/video/10827607/'::text), true),
    '{poster}',
    to_jsonb('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=88&w=2200'::text),
    true
  ),
  published_at = now(),
  updated_at = now()
where key = 'home.hero';

-- Give each main space its own relevant hero film in the CMS.
with normalized_catalog as (
  select
    c.key,
    jsonb_agg(
      jsonb_set(
        jsonb_set(
          area,
          '{media,video}',
          to_jsonb(
            case area->>'id'
              when 'barberia' then 'https://www.pexels.com/download/video/9738001/'
              when 'fotografia' then 'https://www.pexels.com/download/video/36893324/'
              when 'nails' then 'https://www.pexels.com/download/video/30706938/'
              when 'spa' then 'https://www.pexels.com/download/video/28952907/'
              else coalesce(area #>> '{media,video}', '')
            end
          ),
          true
        ),
        '{media,kind}',
        '"video"'::jsonb,
        true
      )
      order by ordinal
    ) as value
  from public.cms_entries c
  cross join lateral jsonb_array_elements(coalesce(c.published_value, c.draft_value, '[]'::jsonb))
    with ordinality as catalog(area, ordinal)
  where c.key = 'services.catalog'
  group by c.key
)
update public.cms_entries c
set
  draft_value = n.value,
  published_value = n.value,
  published_at = now(),
  updated_at = now()
from normalized_catalog n
where c.key = n.key;

-- Temporary, editable team profiles ensure every space has a visible human card.
do $$
declare
  team_value jsonb;
begin
  select coalesce(published_value, draft_value, '[]'::jsonb)
  into team_value
  from public.cms_entries
  where key = 'team.members'
  for update;

  if team_value is null then
    return;
  end if;

  if not exists (
    select 1
    from jsonb_array_elements(team_value) member
    where member->>'name' = 'Equipo Estudio Fotográfico'
  ) then
    team_value := team_value || jsonb_build_array(
      jsonb_build_object(
        'name', 'Equipo Estudio Fotográfico',
        'role', 'Dirección y producción visual',
        'statement', 'Acompañamiento para retrato, marca personal, contenido y fotografía de producto.',
        'image', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=88&w=1400',
        'areas', jsonb_build_array('fotografia'),
        'visible', true
      )
    );
  end if;

  if not exists (
    select 1
    from jsonb_array_elements(team_value) member
    where member->>'name' = 'Equipo SPA Indian'
  ) then
    team_value := team_value || jsonb_build_array(
      jsonb_build_object(
        'name', 'Equipo SPA Indian',
        'role', 'Bienestar y cuidado personal',
        'statement', 'La profesional se confirma según la experiencia, la valoración y el horario solicitado.',
        'image', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=88&w=1400',
        'areas', jsonb_build_array('spa'),
        'visible', true
      )
    );
  end if;

  update public.cms_entries
  set
    draft_value = team_value,
    published_value = team_value,
    published_at = now(),
    updated_at = now()
  where key = 'team.members';
end
$$;

commit;
