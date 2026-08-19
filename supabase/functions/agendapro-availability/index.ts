import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const LOCATION_ID = 224670;
const AGENDA_BASE = 'https://agendapro.com';

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

function availabilityParams(serviceId: number, startDate: string, endDate: string, includeDatesAndProviders = false) {
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

async function agendaGet(path: string) {
  const response = await fetch(`${AGENDA_BASE}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'User-Agent': 'IndianClubAvailabilityBridge/1.0',
    },
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
        ? raw.map((item) => ({ date: item?.date, available: Boolean(item?.available) })).filter((item) => isIsoDate(item.date))
        : [];

      return json({ serviceId, startDate, endDate, days }, 200, 20);
    }

    if (action === 'slots') {
      const date = body?.date;
      if (!isIsoDate(date)) return json({ error: 'Fecha inválida' }, 400);

      const params = availabilityParams(serviceId, date, date, true);
      const raw = await agendaGet(`/api_views/workflow/v2/service_providers/available_hours_sql_improved?${params}`);
      const buckets = ['morning_hours', 'afternoon_hours', 'night_hours'] as const;
      const slots = buckets
        .flatMap((bucket) => Array.isArray(raw?.[bucket]) ? raw[bucket] : [])
        .filter((slot) => slot?.status === 'hora-disponible' && slot?.valid_resource !== false)
        .map((slot) => ({
          key: String(slot?.unique_identifier ?? `${date}_${slot?.start_block}_${slot?.end_block}`),
          label: String(slot?.hour ?? `${slot?.start_block} - ${slot?.end_block}`),
          start: String(slot?.start_block ?? ''),
          end: String(slot?.end_block ?? ''),
          providerId: Number(slot?.provider_id) || null,
          providerName: String(slot?.available_provider ?? ''),
          price: Number(slot?.booking_total_price ?? slot?.booking_price ?? 0),
        }))
        .filter((slot) => isClock(slot.start) && isClock(slot.end));

      return json({
        serviceId,
        date,
        dayName: raw?.day_name ?? null,
        formattedDate: raw?.formatted_date ?? null,
        slots,
      }, 200, 12);
    }

    if (action === 'providers') {
      const date = body?.date;
      const start = body?.start;
      const end = body?.end;
      if (!isIsoDate(date) || !isClock(start) || !isClock(end)) {
        return json({ error: 'Fecha u horario inválido' }, 400);
      }

      const params = new URLSearchParams({
        service_id: String(serviceId),
        location_id: String(LOCATION_ID),
        start_at: `${date} ${start}:00`,
        end_at: `${date} ${end}:00`,
        dates_and_providers: '[]',
      });
      const raw = await agendaGet(`/api/v2/sites/service_providers/date_time?${params}`);
      const providers = Array.isArray(raw)
        ? raw.map((provider) => ({
          id: Number(provider?.id),
          name: String(provider?.public_name ?? ''),
          image: typeof provider?.image === 'string' ? provider.image : '',
        })).filter((provider) => Number.isInteger(provider.id) && provider.name)
        : [];

      return json({ serviceId, date, start, end, providers }, 200, 10);
    }

    return json({ error: 'Acción no soportada' }, 400);
  } catch (error) {
    console.error('AgendaPro availability bridge error', error);
    return json({
      error: 'No se pudo consultar la disponibilidad en este momento',
      detail: error instanceof Error ? error.message : 'Unknown error',
    }, 502);
  }
});
