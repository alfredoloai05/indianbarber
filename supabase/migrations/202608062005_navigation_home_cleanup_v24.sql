-- Navigation and Home cleanup v24
-- The standalone La Casa page is retired; location and house information remain in Home.

begin;

update public.cms_entries
set
  draft_value = case
    when jsonb_typeof(draft_value -> 'navigation') = 'array' then
      jsonb_set(
        draft_value,
        '{navigation}',
        (
          select coalesce(jsonb_agg(item order by ordinal), '[]'::jsonb)
          from jsonb_array_elements(draft_value -> 'navigation') with ordinality as nav(item, ordinal)
          where item ->> 'to' <> '/club'
        ),
        true
      )
    else draft_value
  end,
  published_value = case
    when jsonb_typeof(published_value -> 'navigation') = 'array' then
      jsonb_set(
        published_value,
        '{navigation}',
        (
          select coalesce(jsonb_agg(item order by ordinal), '[]'::jsonb)
          from jsonb_array_elements(published_value -> 'navigation') with ordinality as nav(item, ordinal)
          where item ->> 'to' <> '/club'
        ),
        true
      )
    else published_value
  end,
  published_at = case when published_value is not null then now() else published_at end,
  updated_at = now()
where key = 'global.settings';

commit;
