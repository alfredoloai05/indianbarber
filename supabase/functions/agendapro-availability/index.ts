import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOCATION_ID = 224670;
const AGENDA_BASE = 'https://agendapro.com';
const AGENDA_SITE_ORIGIN = 'https://indianclub.site.agendapro.com';
const AGENDA_PUBLIC_SITE_KEY = 'fefae7691849eb9f9dd75e66fcfcacd2';

// Public service identifiers crossed from the AgendaPro export used by the site.
// This allow-list prevents the function from becoming an open proxy.
const ALLOWED_SERVICE_IDS = new Set([
  1503064, 1503068, 1503077, 2626048, 1503074,
  2566869, 1503854, 1503865, 1503870, 1503871,
  2111961, 2111962, 2626026, 1855869, 2446088,
  2446121, 2190189, 1503879, 2174014, 1503876,
  1503098, 2179397, 1503094, 1680786, 1715082,
  1503105, 1716532, 2942253, 2975138,
]);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200, maxAge = 0) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': maxAge > 0 ? `public, max-age=${maxAge}` : 'no-store',
    },
  });
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isClock(value: unknown): value is string {
  return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

function parseDate(value: string) {
  return new Date(`${value}T12:00:00Z`);
}

function differenceInDays(start: string, end: string) {
  return Math.round((parseDate(end).getTime() - parseDate(start).getTime()) / 86_400_000);
}

function availabilityParams(
  serviceId: number,
  startDate: string,
  endDate: string,
  includeDatesAndProviders = false,
) {
  const params = new URLSearchParams({
    start_date: startDate,
    end_date: endDate,
    local: String(LOCATION_ID),
    services: JSON.stringify([String(serviceId)]),
    providers: '{}',
    providers_array: '[]',
    bundled: '0',
    bundle_id: '0',
  });

  if (includeDatesAndProviders) params.set('dates_and_providers', '[]');
  return params;
}

function upstreamHeaders(extra: Record<string, string> = {}) {
  return {
    Accept: 'application/json',
    'Accept-Language': 'es-EC,es;q=0.9',
    'api-key': AGENDA_PUBLIC_SITE_KEY,
    Origin: AGENDA_SITE_ORIGIN,
    Referer: `${AGENDA_SITE_ORIGIN}/`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36',
    ...extra,
  };
}

async function agendaGet(path: string, extraHeaders: Record<string, string> = {}) {
  const response = await fetch(`${AGENDA_BASE}${path}`, {
    method: 'GET',
    headers: upstreamHeaders(extraHeaders),
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`AgendaPro ${response.status}: ${text.slice(0, 240)}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error('AgendaPro devolvió una respuesta no JSON.');
  }
}

type NormalizedSlot = {
  key: string;
  label: string;
  start: string;
  end: string;
  providerId: number | null;
  providerName: string;
  price: number;
};

type NormalizedProvider = {
  id: number;
  name: string;
  image: string;
};

function extractSlots(raw: Record<string, unknown>, date: string): NormalizedSlot[] {
  const buckets = ['morning_hours', 'afternoon_hours', 'night_hours'] as const;

  return buckets
    .flatMap((bucket) => Array.isArray(raw?.[bucket]) ? raw[bucket] : [])
    .filter((slot) => slot?.status === 'hora-disponible' && slot?.valid_resource !== false)
    .map((slot) => ({
      key: String(slot?.unique_identifier ?? `${date}_${slot?.start_block}_${slot?.end_block}_${slot?.provider_id ?? ''}`),
      label: String(slot?.hour ?? `${slot?.start_block} - ${slot?.end_block}`),
      start: String(slot?.start_block ?? ''),
      end: String(slot?.end_block ?? ''),
      providerId: Number(slot?.provider_id) || null,
      providerName: String(slot?.available_provider ?? ''),
      price: Number(slot?.booking_total_price ?? slot?.booking_price ?? 0),
    }))
    .filter((slot) => isClock(slot.start) && isClock(slot.end));
}

function normalizeProvider(provider: Record<string, unknown>): NormalizedProvider | null {
  const id = Number(provider?.id);
  const name = String(provider?.public_name ?? provider?.name ?? '');
  const image = typeof provider?.image === 'string' ? provider.image : '';

  if (!Number.isInteger(id) || !name) return null;
  return { id, name, image };
}

function uniqueProviders(providers: NormalizedProvider[]) {
  const seen = new Set<number>();
  return providers.filter((provider) => {
    if (seen.has(provider.id)) return false;
    seen.add(provider.id);
    return true;
  });
}

function formatEndTimeForAgenda(clock: string) {
  const [hour, minute] = clock.split(':');
  // The public site sends e.g. 12:0:00 rather than 12:00:00.
  return `${hour}:${Number(minute)}:00`;
}

async function providersFromHours(serviceId: number, date: string, start: string, end: string) {
  const params = availabilityParams(serviceId, date, date, true);
  const raw = await agendaGet(`/api_views/workflow/v2/service_providers/available_hours_sql_improved?${params}`);
  const matching = extractSlots(raw, date).filter((slot) => slot.start === start && slot.end === end);

  return uniqueProviders(
    matching
      .filter((slot) => Number.isInteger(slot.providerId) && slot.providerName)
      .map((slot) => ({
        id: slot.providerId as number,
        name: slot.providerName,
        image: '',
      })),
  );
}

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Método no permitido' }, 405);
  }

  try {
    const body = await request.json();
    const action = body?.action;
    const serviceId = Number(body?.serviceId);

    if (!Number.isInteger(serviceId) || !ALLOWED_SERVICE_IDS.has(serviceId)) {
      return json({ error: 'Servicio no permitido' }, 400);
    }

    if (action === 'days') {
      const startDate = body?.startDate;
      const endDate = body?.endDate;
      if (!isIsoDate(startDate) || !isIsoDate(endDate)) {
        return json({ error: 'Rango de fechas inválido' }, 400);
      }

      const span = differenceInDays(startDate, endDate);
      if (span < 0 || span > 31) {
        return json({ error: 'El rango máximo permitido es de 31 días' }, 400);
      }

      const params = availabilityParams(serviceId, startDate, endDate);
      const raw = await agendaGet(`/api_views/workflow/v2/service_providers/available_days_sql_improved?${params}`);
      const days = Array.isArray(raw)
        ? raw
          .map((item) => ({ date: item?.date, available: Boolean(item?.available) }))
          .filter((item) => isIsoDate(item.date))
        : [];

      return json({ serviceId, startDate, endDate, days }, 200, 20);
    }

    if (action === 'slots') {
      const date = body?.date;
      if (!isIsoDate(date)) return json({ error: 'Fecha inválida' }, 400);

      const params = availabilityParams(serviceId, date, date, true);
      const raw = await agendaGet(`/api_views/workflow/v2/service_providers/available_hours_sql_improved?${params}`);

      return json({
        serviceId,
        date,
        dayName: raw?.day_name ?? null,
        formattedDate: raw?.formatted_date ?? null,
        slots: extractSlots(raw, date),
      }, 200, 12);
    }

    if (action === 'providers') {
      const date = body?.date;
      const start = body?.start;
      const end = body?.end;
      if (!isIsoDate(date) || !isClock(start) || !isClock(end)) {
        return json({ error: 'Fecha u horario inválido' }, 400);
      }

      let providers: NormalizedProvider[] = [];

      try {
        const params = new URLSearchParams({
          service_id: String(serviceId),
          location_id: String(LOCATION_ID),
          start_at: `${date} ${start}:00`,
          end_at: `${date} ${formatEndTimeForAgenda(end)}`,
          dates_and_providers: '[]',
        });

        const raw = await agendaGet(
          `/api/v2/sites/service_providers/date_time?${params}`,
          { actionloader: 'false' },
        );

        providers = Array.isArray(raw)
          ? uniqueProviders(raw.map(normalizeProvider).filter(Boolean) as NormalizedProvider[])
          : [];
      } catch (error) {
        console.warn('AgendaPro date_time failed, using slot provider fallback', error);
      }

      if (!providers.length) {
        providers = await providersFromHours(serviceId, date, start, end);
      }

      return json({ serviceId, date, start, end, providers }, 200, 8);
    }

    return json({ error: 'Acción no soportada' }, 400);
  } catch (error) {
    console.error('AgendaPro availability bridge error', error);
    return json({
      error: 'No se pudo consultar la agenda en este momento',
      detail: error instanceof Error ? error.message : 'Unknown error',
    }, 502);
  }
});
