import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { useGlobalSettings, useServiceCatalogContent } from '../content/useSiteContent';
import type { ServiceCatalogArea } from '../data/serviceCatalog';
import {
  agendaProPublicBookingUrl,
  getAgendaProService,
} from '../integrations/agendapro';

function openBookingWindow(url: string) {
  const availableWidth = window.screen?.availWidth ?? window.innerWidth;
  const availableHeight = window.screen?.availHeight ?? window.innerHeight;
  const width = Math.min(520, Math.max(360, availableWidth - 32));
  const height = Math.min(820, Math.max(620, availableHeight - 32));
  const left = Math.max(0, Math.round((availableWidth - width) / 2));
  const top = Math.max(0, Math.round((availableHeight - height) / 2));

  const popup = window.open(
    url,
    'indian-agendapro-booking',
    `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
  );

  if (popup) {
    popup.focus();
    return;
  }

  window.location.assign(url);
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

  const activeArea = catalog.find((area) => area.id === areaId) ?? catalog[0];
  const services = activeArea?.groups.flatMap((group) =>
    group.items.map((service) => ({ ...service, group: group.title })),
  ) ?? [];
  const selectedService = services.find((service) => service.name === serviceName) ?? services[0];
  const openServiceGroup = activeArea
    ? openServiceGroups[activeArea.id] ?? activeArea.groups[0]?.title ?? ''
    : '';
  const agendaService = getAgendaProService(selectedService?.name);
  const publicBookingUrl = agendaProPublicBookingUrl(selectedService?.name);

  const fallbackMessage = [
    `Hola, quiero reservar en ${settings.brandName}.`,
    '',
    `Área: ${activeArea?.title ?? 'Por definir'}`,
    `Servicio: ${selectedService?.name ?? 'Por definir'}`,
    '',
    '¿Me ayudan a revisar profesional, fecha y hora disponibles?',
  ].join('\n');
  const separator = settings.whatsappHref.includes('?') ? '&' : '?';
  const whatsappUrl = `${settings.whatsappHref}${separator}text=${encodeURIComponent(fallbackMessage)}`;

  const selectArea = (area: ServiceCatalogArea) => {
    const firstGroup = area.groups[0];
    const firstService = firstGroup?.items[0];
    setAreaId(area.id);
    setServiceName(firstService?.name ?? '');
    setOpenServiceGroups((current) => ({ ...current, [area.id]: firstGroup?.title ?? '' }));
  };

  const openSelectedBooking = () => {
    if (!agendaService) return;
    openBookingWindow(publicBookingUrl);
  };

  return (
    <>
      <Seo
        title="Reservar"
        description={`Elige tu servicio y consulta disponibilidad real para reservar tu próxima visita a ${settings.brandName}.`}
      />

      <section className="booking-experience booking-experience--direct booking-experience--agendapro" aria-labelledby="booking-flow-title">
        <header className="booking-experience__header booking-experience__header--direct">
          <div>
            <span className="booking-experience__eyebrow">Reservas Indian Club</span>
            <h1 id="booking-flow-title">Agenda tu visita.</h1>
          </div>
          <p>Elige tu servicio aquí. El último paso se abre en una ventana compacta para escoger profesional, fecha y hora reales.</p>
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

        <div className="booking-workspace booking-workspace--live">
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
                                onClick={() => setServiceName(service.name)}
                              >
                                <span>
                                  <strong>{service.name}</strong>
                                  <small>{service.duration} · {service.price}</small>
                                </span>
                                <i className={`booking-service-list__status${mapped ? ' is-live' : ''}`}>
                                  {mapped ? 'Reserva online' : 'Consulta'}
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

            <section className="booking-step booking-step--live" aria-labelledby="booking-live-title">
              <div className="booking-step__heading">
                <span>2</span>
                <div>
                  <h2 id="booking-live-title">Profesional, fecha y hora</h2>
                  {agendaService ? (
                    <p>Tu servicio ya está identificado. Continúa para ver la disponibilidad real y confirmar la cita.</p>
                  ) : (
                    <p>Este servicio todavía requiere coordinación directa con el equipo.</p>
                  )}
                </div>
              </div>

              {agendaService ? (
                <div className="booking-live-card">
                  <div>
                    <span>Disponibilidad en línea</span>
                    <strong>{agendaService.agendaName}</strong>
                    <p>{agendaService.durationMinutes} min · USD {agendaService.price}</p>
                    <small className="booking-live-card__note">
                      Se abrirá una ventana compacta únicamente para elegir profesional, fecha, hora y confirmar.
                    </small>
                  </div>
                  <div className="booking-live-card__actions">
                    <button type="button" onClick={openSelectedBooking}>Elegir profesional y horario ↗</button>
                    <a href={publicBookingUrl} target="_blank" rel="noreferrer">Abrir pantalla completa</a>
                  </div>
                </div>
              ) : (
                <div className="booking-live-card booking-live-card--fallback">
                  <div>
                    <span>Coordinación directa</span>
                    <strong>{selectedService?.name}</strong>
                    <p>Te ayudamos a revisar profesional y disponibilidad por WhatsApp.</p>
                  </div>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">Consultar disponibilidad ↗</a>
                </div>
              )}
            </section>
          </div>

          <aside className="booking-summary booking-summary--live" aria-label="Resumen de reserva">
            <div className="booking-summary__media">
              {activeArea ? <img src={activeArea.media.poster} alt="" /> : null}
            </div>
            <span className="booking-summary__eyebrow">Tu selección</span>
            <h2>{selectedService?.name}</h2>
            <dl>
              <div><dt>Área</dt><dd>{activeArea?.shortTitle}</dd></div>
              <div><dt>Duración</dt><dd>{selectedService?.duration}</dd></div>
              <div><dt>Precio</dt><dd>{selectedService?.price}</dd></div>
              <div><dt>Disponibilidad</dt><dd>{agendaService ? 'En línea' : 'Consulta directa'}</dd></div>
            </dl>
            {agendaService ? (
              <button className="booking-summary__submit" type="button" onClick={openSelectedBooking}>
                Elegir profesional y horario ↗
              </button>
            ) : (
              <a className="booking-summary__submit" href={whatsappUrl} target="_blank" rel="noreferrer">
                Consultar por WhatsApp ↗
              </a>
            )}
            <p>
              {agendaService
                ? 'La reserva queda confirmada al completar el último paso en la agenda online.'
                : 'El equipo confirmará manualmente la disponibilidad de este servicio.'}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
