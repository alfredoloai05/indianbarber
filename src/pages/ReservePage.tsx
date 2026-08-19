import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { useGlobalSettings, useServiceCatalogContent } from '../content/useSiteContent';
import type { ServiceCatalogArea } from '../data/serviceCatalog';
import {
  type AgendaAvailabilityDay,
  type AgendaAvailabilityProvider,
  type AgendaAvailabilitySlot,
  fetchAgendaDays,
  fetchAgendaProviders,
  fetchAgendaSlots,
} from '../integrations/agendaproAvailability';
import {
  agendaProPublicBookingUrl,
  getAgendaProService,
} from '../integrations/agendapro';

const shortDateFormatter = new Intl.DateTimeFormat('es-EC', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

const fullDateFormatter = new Intl.DateTimeFormat('es-EC', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function localIsoDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(isoDate: string, amount: number) {
  const date = new Date(`${isoDate}T12:00:00`);
  date.setDate(date.getDate() + amount);
  return localIsoDate(date);
}

function formatShortDate(isoDate: string) {
  return shortDateFormatter.format(new Date(`${isoDate}T12:00:00`)).replace('.', '');
}

function formatFullDate(isoDate?: string) {
  if (!isoDate) return 'Selecciona una fecha';
  return fullDateFormatter.format(new Date(`${isoDate}T12:00:00`));
}

function displayTime(slot?: AgendaAvailabilitySlot | null) {
  if (!slot) return 'Selecciona una hora';
  return `${slot.start} – ${slot.end}`;
}

export function ReservePage() {
  const [searchParams] = useSearchParams();
  const settings = useGlobalSettings();
  const catalog = useServiceCatalogContent();

  const requestedArea = searchParams.get('area');
  const requestedService = searchParams.get('service');
  const initialArea = catalog.find((area) => area.id === requestedArea) ?? catalog[0];
  const initialServices = initialArea?.groups.flatMap((group) => group.items) ?? [];
  const initialService = initialServices.find((service) => service.name === requestedService) ?? initialServices[0];
  const initialGroupTitle = initialArea?.groups.find((group) =>
    group.items.some((service) => service.name === initialService?.name),
  )?.title ?? initialArea?.groups[0]?.title ?? '';

  const [areaId, setAreaId] = useState<ServiceCatalogArea['id']>(initialArea?.id ?? 'barberia');
  const [serviceName, setServiceName] = useState(initialService?.name ?? '');
  const [openServiceGroups, setOpenServiceGroups] = useState<Partial<Record<ServiceCatalogArea['id'], string>>>(
    initialArea ? { [initialArea.id]: initialGroupTitle } : {},
  );
  const [availableDays, setAvailableDays] = useState<AgendaAvailabilityDay[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState<AgendaAvailabilitySlot[]>([]);
  const [selectedSlotKey, setSelectedSlotKey] = useState('');
  const [providers, setProviders] = useState<AgendaAvailabilityProvider[]>([]);
  const [providerId, setProviderId] = useState<number | null>(null);
  const [loadingDays, setLoadingDays] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [availabilityError, setAvailabilityError] = useState('');

  const activeArea = catalog.find((area) => area.id === areaId) ?? catalog[0];
  const services = activeArea?.groups.flatMap((group) =>
    group.items.map((service) => ({ ...service, group: group.title })),
  ) ?? [];
  const selectedService = services.find((service) => service.name === serviceName) ?? services[0];
  const openServiceGroup = activeArea
    ? openServiceGroups[activeArea.id] ?? activeArea.groups[0]?.title ?? ''
    : '';
  const agendaService = getAgendaProService(selectedService?.name);
  const agendaServiceId = agendaService?.id ?? null;
  const publicBookingUrl = agendaProPublicBookingUrl(selectedService?.name);
  const selectedSlot = slots.find((slot) => slot.key === selectedSlotKey) ?? null;
  const selectedProvider = providers.find((provider) => provider.id === providerId) ?? null;
  const today = useMemo(() => localIsoDate(), []);
  const maxBookingDate = useMemo(() => addDays(today, 120), [today]);

  const fallbackMessage = [
    `Hola, quiero reservar en ${settings.brandName}.`,
    '',
    `Área: ${activeArea?.title ?? 'Por definir'}`,
    `Servicio: ${selectedService?.name ?? 'Por definir'}`,
    selectedDate ? `Fecha: ${formatFullDate(selectedDate)}` : '',
    selectedSlot ? `Hora: ${displayTime(selectedSlot)}` : '',
    selectedProvider ? `Profesional: ${selectedProvider.name}` : '',
    '',
    '¿Me ayudan a confirmar esta disponibilidad?',
  ].filter(Boolean).join('\n');
  const separator = settings.whatsappHref.includes('?') ? '&' : '?';
  const whatsappUrl = `${settings.whatsappHref}${separator}text=${encodeURIComponent(fallbackMessage)}`;

  const resetAvailability = () => {
    setAvailableDays([]);
    setSelectedDate('');
    setSlots([]);
    setSelectedSlotKey('');
    setProviders([]);
    setProviderId(null);
    setLoadingDays(false);
    setLoadingSlots(false);
    setLoadingProviders(false);
    setAvailabilityError('');
  };

  useEffect(() => {
    if (!agendaServiceId) return undefined;

    let cancelled = false;
    const startDate = today;
    const endDate = addDays(today, 13);

    queueMicrotask(() => {
      if (cancelled) return;
      setLoadingDays(true);

      fetchAgendaDays(agendaServiceId, startDate, endDate)
        .then((days) => {
          if (!cancelled) {
            setAvailableDays(days.filter((day) => day.available));
            setAvailabilityError('');
          }
        })
        .catch(() => {
          if (!cancelled) setAvailabilityError('No pudimos cargar los próximos días disponibles. Puedes elegir una fecha manualmente.');
        })
        .finally(() => {
          if (!cancelled) setLoadingDays(false);
        });
    });

    return () => {
      cancelled = true;
    };
  }, [agendaServiceId, today]);

  const selectArea = (area: ServiceCatalogArea) => {
    const firstGroup = area.groups[0];
    const firstService = firstGroup?.items[0];
    setAreaId(area.id);
    setServiceName(firstService?.name ?? '');
    setOpenServiceGroups((current) => ({ ...current, [area.id]: firstGroup?.title ?? '' }));
    resetAvailability();
  };

  const selectService = (name: string) => {
    setServiceName(name);
    resetAvailability();
  };

  const loadDate = async (date: string) => {
    if (!agendaServiceId || !date) return;

    setSelectedDate(date);
    setSlots([]);
    setSelectedSlotKey('');
    setProviders([]);
    setProviderId(null);
    setLoadingSlots(true);
    setAvailabilityError('');

    try {
      const result = await fetchAgendaSlots(agendaServiceId, date);
      setSlots(result.slots);
      if (!result.slots.length) {
        setAvailabilityError('No hay horarios disponibles para esa fecha. Prueba con otro día.');
      }
    } catch {
      setAvailabilityError('No pudimos consultar los horarios en este momento. Intenta nuevamente.');
    } finally {
      setLoadingSlots(false);
    }
  };

  const loadSlotProviders = async (slot: AgendaAvailabilitySlot) => {
    if (!agendaServiceId || !selectedDate) return;

    setSelectedSlotKey(slot.key);
    setProviders([]);
    setProviderId(null);
    setLoadingProviders(true);
    setAvailabilityError('');

    try {
      const result = await fetchAgendaProviders(agendaServiceId, selectedDate, slot.start, slot.end);
      setProviders(result);
      if (result.length === 1) setProviderId(result[0].id);
      if (!result.length) {
        setAvailabilityError('Ese horario acaba de cambiar. Elige otra hora disponible.');
      }
    } catch {
      setAvailabilityError('No pudimos cargar los profesionales disponibles para ese horario.');
    } finally {
      setLoadingProviders(false);
    }
  };

  const canContinue = Boolean(agendaService && selectedDate && selectedSlot && selectedProvider);

  return (
    <>
      <Seo
        title="Reservar"
        description={`Elige servicio, fecha, hora y profesional con disponibilidad real para reservar tu próxima visita a ${settings.brandName}.`}
      />

      <section className="booking-experience booking-experience--direct booking-experience--agendapro" aria-labelledby="booking-flow-title">
        <header className="booking-experience__header booking-experience__header--direct">
          <div>
            <span className="booking-experience__eyebrow">Reservas Indian Club</span>
            <h1 id="booking-flow-title">Agenda tu visita.</h1>
          </div>
          <p>Elige servicio, fecha, hora y profesional directamente aquí. La disponibilidad se consulta en tiempo real.</p>
        </header>

        <div className="booking-area-tabs" role="tablist" aria-label="Áreas disponibles">
          {catalog.map((area) => (
            <button
              type="button"
              role="tab"
              aria-selected={area.id === activeArea?.id}
              className={area.id === activeArea?.id ? 'is-active' : undefined}
              key={area.id}
              onClick={() => selectArea(area)}
            >
              <img src={area.media.poster} alt="" />
              <span>{area.shortTitle}</span>
            </button>
          ))}
        </div>

        <div className="booking-workspace booking-workspace--live booking-workspace--native">
          <div className="booking-steps">
            <section className="booking-step" aria-labelledby="booking-service-title">
              <div className="booking-step__heading">
                <span>1</span>
                <div>
                  <h2 id="booking-service-title">Elige el servicio</h2>
                  <p>{activeArea?.summary}</p>
                </div>
              </div>

              <div className="booking-service-groups">
                {activeArea?.groups.map((group) => {
                  const isOpen = openServiceGroup === group.title;
                  return (
                    <section className={`booking-service-group${isOpen ? ' is-open' : ''}`} key={group.title}>
                      <button
                        type="button"
                        className="booking-service-group__toggle"
                        aria-expanded={isOpen}
                        onClick={() => setOpenServiceGroups((current) => ({
                          ...current,
                          [activeArea.id]: isOpen ? '' : group.title,
                        }))}
                      >
                        <strong>{group.title}</strong>
                        <small>{group.items.length} {group.items.length === 1 ? 'opción' : 'opciones'}</small>
                        <i aria-hidden="true">{isOpen ? '−' : '+'}</i>
                      </button>

                      {isOpen ? (
                        <div className="booking-service-list">
                          {group.items.map((service) => {
                            const mapped = Boolean(getAgendaProService(service.name));
                            return (
                              <button
                                type="button"
                                className={service.name === selectedService?.name ? 'is-active' : undefined}
                                key={service.name}
                                onClick={() => selectService(service.name)}
                              >
                                <span>
                                  <strong>{service.name}</strong>
                                  <small>{service.duration} · {service.price}</small>
                                </span>
                                <i className={`booking-service-list__status${mapped ? ' is-live' : ''}`}>
                                  {mapped ? 'Disponibilidad real' : 'Consulta'}
                                </i>
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </section>
                  );
                })}
              </div>
            </section>

            {agendaService ? (
              <>
                <section className="booking-step booking-step--native" aria-labelledby="booking-date-title">
                  <div className="booking-step__heading">
                    <span>2</span>
                    <div>
                      <h2 id="booking-date-title">Elige la fecha</h2>
                      <p>Consulta una fecha concreta o usa uno de los próximos días con disponibilidad.</p>
                    </div>
                  </div>

                  <div className="booking-native-date">
                    <label>
                      <span>Fecha de la cita</span>
                      <input
                        type="date"
                        min={today}
                        max={maxBookingDate}
                        value={selectedDate}
                        onChange={(event) => void loadDate(event.target.value)}
                      />
                    </label>

                    <div className="booking-native-days" aria-label="Próximos días disponibles">
                      {loadingDays ? <span className="booking-native-loading">Consultando próximos días…</span> : null}
                      {!loadingDays && availableDays.slice(0, 7).map((day) => (
                        <button
                          type="button"
                          className={selectedDate === day.date ? 'is-active' : undefined}
                          key={day.date}
                          onClick={() => void loadDate(day.date)}
                        >
                          {formatShortDate(day.date)}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="booking-step booking-step--native" aria-labelledby="booking-time-title">
                  <div className="booking-step__heading">
                    <span>3</span>
                    <div>
                      <h2 id="booking-time-title">Elige la hora</h2>
                      <p>{selectedDate ? formatFullDate(selectedDate) : 'Primero selecciona una fecha.'}</p>
                    </div>
                  </div>

                  <div className="booking-native-slots" aria-live="polite">
                    {loadingSlots ? <span className="booking-native-loading">Consultando horarios reales…</span> : null}
                    {!loadingSlots && selectedDate && slots.length === 0 && !availabilityError ? (
                      <span className="booking-native-empty">No hay horarios para mostrar.</span>
                    ) : null}
                    {!loadingSlots && slots.map((slot) => (
                      <button
                        type="button"
                        className={selectedSlot?.key === slot.key ? 'is-active' : undefined}
                        key={slot.key}
                        onClick={() => void loadSlotProviders(slot)}
                      >
                        <strong>{slot.start}</strong>
                        <small>hasta {slot.end}</small>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="booking-step booking-step--native" aria-labelledby="booking-provider-title">
                  <div className="booking-step__heading">
                    <span>4</span>
                    <div>
                      <h2 id="booking-provider-title">Elige profesional</h2>
                      <p>{selectedSlot ? `Disponibles para ${displayTime(selectedSlot)}.` : 'Selecciona primero una hora.'}</p>
                    </div>
                  </div>

                  <div className="booking-native-providers" aria-live="polite">
                    {loadingProviders ? <span className="booking-native-loading">Consultando profesionales…</span> : null}
                    {!loadingProviders && providers.map((provider) => (
                      <button
                        type="button"
                        className={selectedProvider?.id === provider.id ? 'is-active' : undefined}
                        key={provider.id}
                        onClick={() => setProviderId(provider.id)}
                      >
                        {provider.image ? <img src={provider.image} alt="" /> : <span className="booking-native-provider-placeholder" />}
                        <strong>{provider.name}</strong>
                      </button>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <section className="booking-step booking-step--live" aria-labelledby="booking-direct-title">
                <div className="booking-step__heading">
                  <span>2</span>
                  <div>
                    <h2 id="booking-direct-title">Coordina disponibilidad</h2>
                    <p>Este servicio todavía no tiene disponibilidad online conectada.</p>
                  </div>
                </div>
                <div className="booking-live-card booking-live-card--fallback">
                  <div>
                    <span>Coordinación directa</span>
                    <strong>{selectedService?.name}</strong>
                    <p>Te ayudamos a revisar profesional, fecha y hora por WhatsApp.</p>
                  </div>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">Consultar disponibilidad ↗</a>
                </div>
              </section>
            )}

            {availabilityError ? (
              <div className="booking-native-error" role="status">
                <span>{availabilityError}</span>
                <a href={publicBookingUrl} target="_blank" rel="noreferrer">Continuar en la agenda online ↗</a>
              </div>
            ) : null}
          </div>

          <aside className="booking-summary booking-summary--live booking-summary--native" aria-label="Resumen de reserva">
            <div className="booking-summary__media">
              {activeArea ? <img src={activeArea.media.poster} alt="" /> : null}
            </div>
            <span className="booking-summary__eyebrow">Tu selección</span>
            <h2>{selectedService?.name}</h2>
            <dl>
              <div><dt>Área</dt><dd>{activeArea?.shortTitle}</dd></div>
              <div><dt>Duración</dt><dd>{selectedService?.duration}</dd></div>
              <div><dt>Precio</dt><dd>{selectedService?.price}</dd></div>
              <div><dt>Fecha</dt><dd>{formatFullDate(selectedDate)}</dd></div>
              <div><dt>Hora</dt><dd>{displayTime(selectedSlot)}</dd></div>
              <div><dt>Profesional</dt><dd>{selectedProvider?.name ?? 'Selecciona profesional'}</dd></div>
            </dl>

            {agendaService ? (
              <a
                className={`booking-summary__submit${canContinue ? '' : ' is-disabled'}`}
                href={canContinue ? publicBookingUrl : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!canContinue}
                onClick={(event) => {
                  if (!canContinue) event.preventDefault();
                }}
              >
                Continuar para confirmar ↗
              </a>
            ) : (
              <a className="booking-summary__submit" href={whatsappUrl} target="_blank" rel="noreferrer">
                Consultar por WhatsApp ↗
              </a>
            )}
            <p>
              {agendaService
                ? 'La disponibilidad mostrada es real. Por ahora, el último paso de confirmación se completa en la agenda online.'
                : 'El equipo confirmará manualmente la disponibilidad de este servicio.'}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
