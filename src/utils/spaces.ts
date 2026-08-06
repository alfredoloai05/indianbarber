import type { ServiceCatalogArea, SpaceId } from '../data/serviceCatalog';

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

export function normalizeServiceCatalog(catalog: ServiceCatalogArea[]) {
  const rawCatalog = catalog as Array<ServiceCatalogArea & { id: string }>;
  const legacyCombos = rawCatalog.find((area) => area.id === 'combos');

  const normalized = rawCatalog
    .filter((area) => spaceOrder.includes(area.id as SpaceId))
    .map((area) => {
      if (area.id !== 'barberia' || !legacyCombos) return area as ServiceCatalogArea;

      const alreadyMerged = area.groups.some((group) => group.title.toLowerCase().includes('combo'));
      if (alreadyMerged) return area as ServiceCatalogArea;

      return {
        ...area,
        aliases: Array.from(new Set([...area.aliases, ...legacyCombos.aliases])),
        groups: [...area.groups, ...legacyCombos.groups],
        summary: 'Cortes, barba, afeitado, combos y servicios especiales dentro del universo de barbería Indian.',
        duration: '10–120 min',
        price: 'Desde USD 3',
      } as ServiceCatalogArea;
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
