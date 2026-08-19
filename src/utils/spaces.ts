import { getServiceExperienceMedia, spaceExperienceMedia } from '../data/experienceMedia';
import { serviceCatalog as defaultCatalog, type ServiceCatalogArea, type SpaceId } from '../data/serviceCatalog';
import { syncAgendaProCatalogMetadata } from '../integrations/agendapro';

type LegacyCatalogArea = Omit<ServiceCatalogArea, 'id'> & { id: string };

export const spaceOrder: SpaceId[] = ['barberia', 'fotografia', 'nails', 'spa'];

export const spaceRoutes: Record<SpaceId, string> = {
  barberia: '/barberia',
  fotografia: '/estudio-fotografico',
  nails: '/nails',
  spa: '/spa',
};

export const spaceLabels: Record<SpaceId, string> = {
  barberia: 'Barbería',
  fotografia: 'Estudio Fotográfico',
  nails: 'Nails',
  spa: 'SPA',
};

export function spacePath(id: SpaceId, anchor?: string) {
  const path = spaceRoutes[id];
  return anchor ? `${path}#${anchor}` : path;
}

function hydrateMedia(area: ServiceCatalogArea) {
  const defaults = defaultCatalog.find((item) => item.id === area.id);
  if (!defaults) return syncAgendaProCatalogMetadata(area);

  const areaMedia = {
    ...defaults.media,
    ...area.media,
    ...spaceExperienceMedia[area.id],
  };

  const hydratedArea = {
    ...area,
    media: areaMedia,
    groups: area.groups.map((group) => ({
      ...group,
      items: group.items.map((item) => {
        const defaultItem = defaults.groups
          .flatMap((defaultGroup) => defaultGroup.items)
          .find((candidate) => candidate.name === item.name);
        const fallbackMedia = item.media ?? defaultItem?.media ?? areaMedia;
        return {
          ...item,
          media: getServiceExperienceMedia(area.id, item.name, fallbackMedia),
        };
      }),
    })),
  };

  // Until Indian Fase 2 replaces AgendaPro, mapped services use the latest
  // exported AgendaPro price/duration as the public source of truth.
  return syncAgendaProCatalogMetadata(hydratedArea);
}

export function normalizeServiceCatalog(catalog: ServiceCatalogArea[]) {
  const rawCatalog = catalog as unknown as LegacyCatalogArea[];
  const legacyCombos = rawCatalog.find((area) => area.id === 'combos');

  const normalized = rawCatalog
    .filter((area) => spaceOrder.includes(area.id as SpaceId))
    .map((area) => {
      if (area.id !== 'barberia' || !legacyCombos) {
        return hydrateMedia(area as ServiceCatalogArea);
      }

      const alreadyMerged = area.groups.some((group) => group.title.toLowerCase().includes('combo'));
      const mergedArea = alreadyMerged ? area : {
        ...area,
        aliases: Array.from(new Set([...area.aliases, ...legacyCombos.aliases])),
        groups: [...area.groups, ...legacyCombos.groups],
        summary: 'Cortes, barba, afeitado, combos y servicios especiales dentro del universo de barbería Indian.',
        duration: '10–120 min',
        price: 'Desde USD 3',
      };
      return hydrateMedia(mergedArea as ServiceCatalogArea);
    });

  return spaceOrder
    .map((id) => normalized.find((area) => area.id === id))
    .filter((area): area is ServiceCatalogArea => Boolean(area));
}

export function legacyAreaToSpace(area?: string | null): SpaceId | undefined {
  if (!area) return undefined;
  if (area === 'combos') return 'barberia';
  return spaceOrder.includes(area as SpaceId) ? area as SpaceId : undefined;
}
