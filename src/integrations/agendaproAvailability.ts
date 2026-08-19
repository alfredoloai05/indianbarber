import { isSupabaseConfigured, supabase } from '../lib/supabase';

export type AgendaAvailabilityDay = {
  date: string;
  available: boolean;
};

export type AgendaAvailabilitySlot = {
  key: string;
  label: string;
  start: string;
  end: string;
  providerId: number | null;
  providerName: string;
  price: number;
};

export type AgendaAvailabilityProvider = {
  id: number;
  name: string;
  image: string;
};

type BridgeBody = Record<string, string | number>;

async function invokeBridge<T>(body: BridgeBody): Promise<T> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('La disponibilidad online no está configurada.');
  }

  const { data, error } = await supabase.functions.invoke('agendapro-availability', { body });
  if (error) throw new Error(error.message || 'No se pudo consultar la disponibilidad.');
  if (data?.error) throw new Error(data.error);
  return data as T;
}

export async function fetchAgendaDays(serviceId: number, startDate: string, endDate: string) {
  const data = await invokeBridge<{ days: AgendaAvailabilityDay[] }>({
    action: 'days',
    serviceId,
    startDate,
    endDate,
  });
  return data.days ?? [];
}

export async function fetchAgendaSlots(serviceId: number, date: string) {
  const data = await invokeBridge<{
    slots: AgendaAvailabilitySlot[];
    dayName?: string | null;
    formattedDate?: string | null;
  }>({
    action: 'slots',
    serviceId,
    date,
  });

  return {
    slots: data.slots ?? [],
    dayName: data.dayName ?? null,
    formattedDate: data.formattedDate ?? null,
  };
}

export async function fetchAgendaProviders(serviceId: number, date: string, start: string, end: string) {
  const data = await invokeBridge<{ providers: AgendaAvailabilityProvider[] }>({
    action: 'providers',
    serviceId,
    date,
    start,
    end,
  });
  return data.providers ?? [];
}
