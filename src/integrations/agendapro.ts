import type { ServiceCatalogArea, ServiceOption } from '../data/serviceCatalog';

/**
 * Temporary AgendaPro Premium bridge.
 *
 * Source: services_report_240304_1787108531.xlsx exported from AgendaPro on 2026-08-18.
 * This intentionally contains only public booking IDs and catalogue metadata; no secret/API key is stored here.
 * When Indian Fase 2 replaces AgendaPro, this module can be removed without changing the editorial CMS model.
 */

export const agendaProConfig = {
  locationId: 224670,
  publicBaseUrl: 'https://indianclub.site.agendapro.com/ec/sucursal/224670',
  iframeBaseUrl: 'https://agendapro.com/iframe/overview/ee389fa5-e2a8-4ac2-a824-94221f4c47f0',
  sourceReportDate: '2026-08-18',
} as const;

export type AgendaProServiceBridge = {
  id: number;
  agendaName: string;
  price: number;
  durationMinutes: number;
  category: string;
  aliases: string[];
};

const agendaProServices: AgendaProServiceBridge[] = [
  { id: 1503064, agendaName: 'Corte de cabello', price: 10, durationMinutes: 60, category: 'Peluquería y barbería', aliases: ['Corte de cabello'] },
  { id: 1503068, agendaName: 'Rasurado de cabeza al cero', price: 6, durationMinutes: 30, category: 'Peluquería y barbería', aliases: ['Rasurado de cabeza al cero'] },
  { id: 1503077, agendaName: 'Perfilado de barba', price: 6, durationMinutes: 30, category: 'Peluquería y barbería', aliases: ['Perfilado de barba'] },
  { id: 2626048, agendaName: 'Perfilado de barba con cera caliente', price: 12, durationMinutes: 30, category: 'Peluquería y barbería', aliases: ['Perfilado de barba con cera caliente'] },
  { id: 1503074, agendaName: 'Afeitado clásico al ras', price: 6, durationMinutes: 30, category: 'Peluquería y barbería', aliases: ['Afeitado clásico al ras'] },
  { id: 2566869, agendaName: 'Corte Essential (cabello + cejas)', price: 12, durationMinutes: 60, category: 'Combos', aliases: ['Corte Essential — cabello y cejas', 'Corte Essential (cabello + cejas)'] },
  { id: 1503854, agendaName: 'Corte Premium (cabello + barba)', price: 15, durationMinutes: 90, category: 'Combos', aliases: ['Corte Premium — cabello y barba', 'Corte Premium (cabello + barba)'] },
  { id: 1503865, agendaName: 'Corte Pro (Corte + Limpieza)', price: 15, durationMinutes: 60, category: 'Combos', aliases: ['Corte Pro — corte y limpieza facial', 'Corte Pro (Corte + Limpieza)'] },
  { id: 1503870, agendaName: 'Perfilado de Barba + Limpieza Facial', price: 10, durationMinutes: 60, category: 'Combos', aliases: ['Perfilado de barba y limpieza facial', 'Perfilado de Barba + Limpieza Facial'] },
  { id: 1503871, agendaName: 'VIP Indian', price: 22, durationMinutes: 90, category: 'Combos', aliases: ['Servicio VIP Indian', 'VIP Indian'] },
  { id: 2111961, agendaName: 'Depilación con cera de nariz', price: 4, durationMinutes: 15, category: 'Otros Servicios', aliases: ['Depilación con cera de nariz'] },
  { id: 2111962, agendaName: 'Depilación con cera de orejas', price: 4, durationMinutes: 15, category: 'Otros Servicios', aliases: ['Depilación con cera de orejas'] },
  { id: 2626026, agendaName: 'Diseño de cejas con técnica visagista de vanguardia', price: 10, durationMinutes: 30, category: 'Otros', aliases: ['Diseño de cejas con técnica visagista', 'Diseño de cejas con técnica visagista de vanguardia'] },
  { id: 1855869, agendaName: 'Depilación de cejas', price: 3, durationMinutes: 5, category: 'Otros Servicios', aliases: ['Depilación de cejas'] },
  { id: 2446088, agendaName: 'Laminado de cejas', price: 8, durationMinutes: 60, category: 'Otros Servicios', aliases: ['Laminado de cejas'] },
  { id: 2446121, agendaName: 'Lifting de pestañas', price: 12, durationMinutes: 60, category: 'Otros Servicios', aliases: ['Lifting de pestañas'] },
  { id: 2190189, agendaName: 'Tinturado de barba', price: 4, durationMinutes: 30, category: 'Otros Servicios', aliases: ['Tinturado de barba'] },
  { id: 1503879, agendaName: 'Rizos permanentes', price: 35, durationMinutes: 120, category: 'Otros Servicios', aliases: ['Rizos permanentes'] },
  { id: 2174014, agendaName: 'Limpieza facial superficial', price: 7, durationMinutes: 30, category: 'Otros Servicios', aliases: ['Limpieza facial superficial'] },
  { id: 1503876, agendaName: 'Peinado', price: 4, durationMinutes: 30, category: 'Otros Servicios', aliases: ['Peinado'] },
  { id: 1503098, agendaName: 'Manicura sin esmaltadado', price: 5, durationMinutes: 30, category: 'Nails Studio', aliases: ['Manicura sin esmaltado', 'Manicura sin esmaltadado'] },
  { id: 2179397, agendaName: 'Semipermanente con base rubber', price: 12, durationMinutes: 120, category: 'Nails Studio', aliases: ['Semipermanente con base rubber'] },
  { id: 1503094, agendaName: 'Manicura con Esmaltado Semipermanente', price: 10, durationMinutes: 120, category: 'Nails Studio', aliases: ['Manicura con esmaltado semipermanente', 'Manicura con Esmaltado Semipermanente'] },
  { id: 1680786, agendaName: 'Uñas Soft Gel', price: 15, durationMinutes: 150, category: 'Nails Studio', aliases: ['Uñas Soft Gel'] },
  { id: 1715082, agendaName: 'Retiro', price: 5, durationMinutes: 30, category: 'Nails Studio', aliases: ['Retiro'] },
  { id: 1503105, agendaName: 'Pedicura sin esmaltado', price: 10, durationMinutes: 60, category: 'Nails Studio', aliases: ['Pedicura sin esmaltado'] },
  { id: 1716532, agendaName: 'Pedicura con Esmaltado Semipermanente', price: 15, durationMinutes: 120, category: 'Nails Studio', aliases: ['Pedicura con esmaltado semipermanente', 'Pedicura con Esmaltado Semipermanente'] },
  { id: 2942253, agendaName: 'Masaje relajante cuerpo completo', price: 35, durationMinutes: 60, category: 'Spa', aliases: ['Masaje de relajación', 'Masaje relajante cuerpo completo'] },
];

function normalizeServiceName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[—–-]/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

const serviceLookup = new Map<string, AgendaProServiceBridge>();

for (const service of agendaProServices) {
  [service.agendaName, ...service.aliases].forEach((alias) => {
    serviceLookup.set(normalizeServiceName(alias), service);
  });
}

export function getAgendaProService(serviceName?: string | null) {
  if (!serviceName) return undefined;
  return serviceLookup.get(normalizeServiceName(serviceName));
}

export function agendaProPublicBookingUrl(serviceName?: string | null) {
  const service = getAgendaProService(serviceName);
  if (!service) return agendaProConfig.publicBaseUrl;
  return `${agendaProConfig.publicBaseUrl}?services_id=${service.id}`;
}

export function agendaProEmbedUrl(serviceName?: string | null) {
  const service = getAgendaProService(serviceName);
  if (!service) return agendaProConfig.iframeBaseUrl;

  // AgendaPro officially supplies this iframe for embedding. We preserve the service_id
  // in the query so compatible versions can open directly on the service; the modal also
  // exposes the documented public deep link as a fallback if the iframe ignores the query.
  return `${agendaProConfig.iframeBaseUrl}?services_id=${service.id}`;
}

export function formatAgendaProDuration(minutes: number) {
  return `${minutes} min aprox.`;
}

export function formatAgendaProPrice(price: number) {
  return `USD ${price.toLocaleString('es-EC', { maximumFractionDigits: 2 })}`;
}

export function syncAgendaProServiceMetadata(item: ServiceOption): ServiceOption {
  const service = getAgendaProService(item.name);
  if (!service) return item;

  return {
    ...item,
    price: formatAgendaProPrice(service.price),
    duration: formatAgendaProDuration(service.durationMinutes),
  };
}

export function syncAgendaProCatalogMetadata(area: ServiceCatalogArea): ServiceCatalogArea {
  const originalItems = area.groups.flatMap((group) => group.items);
  const groups = area.groups.map((group) => ({
    ...group,
    items: group.items.map(syncAgendaProServiceMetadata),
  }));
  const mappedItems = groups.flatMap((group) => group.items)
    .map((item) => getAgendaProService(item.name))
    .filter((item): item is AgendaProServiceBridge => Boolean(item));

  // Item-level metadata can safely sync whenever a mapping exists. Area-level ranges are
  // only replaced when every visible service in that area is mapped; otherwise we preserve
  // the CMS range so partial SPA/Fotografía mappings do not create misleading summaries.
  if (!mappedItems.length || mappedItems.length !== originalItems.length) return { ...area, groups };

  const minPrice = Math.min(...mappedItems.map((item) => item.price));
  const minDuration = Math.min(...mappedItems.map((item) => item.durationMinutes));
  const maxDuration = Math.max(...mappedItems.map((item) => item.durationMinutes));

  return {
    ...area,
    groups,
    price: `Desde ${formatAgendaProPrice(minPrice)}`,
    duration: minDuration === maxDuration ? `${minDuration} min` : `${minDuration}–${maxDuration} min`,
  };
}

export function hasAgendaProBridge(serviceName?: string | null) {
  return Boolean(getAgendaProService(serviceName));
}
