begin;

update public.cms_entries
set
  draft_value = jsonb_set(
    draft_value,
    '{mapHref}',
    to_jsonb('https://www.google.com/maps/search/?api=1&query=Indian+Club%2C+24+de+Mayo+y+Jos%C3%A9+Antonio+Eguiguren%2C+Loja%2C+Ecuador'::text),
    true
  ),
  published_value = case
    when published_value is null then null
    else jsonb_set(
      published_value,
      '{mapHref}',
      to_jsonb('https://www.google.com/maps/search/?api=1&query=Indian+Club%2C+24+de+Mayo+y+Jos%C3%A9+Antonio+Eguiguren%2C+Loja%2C+Ecuador'::text),
      true
    )
  end
where key = 'global.settings';

update public.cms_entries
set
  draft_value = jsonb_set(
    draft_value,
    '{image}',
    to_jsonb('https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp'::text),
    true
  ),
  published_value = case
    when published_value is null then null
    else jsonb_set(
      published_value,
      '{image}',
      to_jsonb('https://content.app-sources.com/s/249321345646214611/uploads/Nuevo_Portafolio/IMG_2623-4450906.jpg?format=webp'::text),
      true
    )
  end
where key in ('home.giftCards', 'giftcards.page');

commit;
