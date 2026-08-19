import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { useGlobalSettings, useServiceCatalogContent } from '../content/useSiteContent';
import type { ServiceCatalogArea } from '../data/serviceCatalog';
import {
  agendaProEmbedUrl,
  agendaProPublicBookingUrl,
  getAgendaProService,
} from '../integrations/agendapro';

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
  const [agendaOpen, setAgendaOpen] = useState(false);

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
  const embedBookingUrl = agendaProEmbedUrl(selectedService?.name);

  const fallbackMessage = [
    `Hola, quiero reservar en ${settings.brandName}.`,
    '',
    `Área: ${activeArea?.title ?? 'Por definir'}`,
    `Servicio: ${selectedService?.name ?? 'Por definir'}`,
    '',
    'Este servicio todavía no tiene un enlace directo de AgendaPro desde la web. ¿Me ayudan a coordinar disponibilidad?',
  ].join('\n');
  const separator = settings.whatsappHref.includes('?') ? '&' : '?';
  const whatsappUrl = `${settings.whatsappHref}${separator}text=${encodeURIComponent(fallbackMessage)}`;

  useEffect(() => {
    if (!agendaOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [agendaOpen]);

  useEffect(() => {
    if (!agendaOpen) return undefined;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAgendaOpen(false);
    };
    document.addEventListener('keydown', closeWithEscape);
    return () => document.removeEventListener('keydown', closeWithEscape);
  }, [agendaOpen]);

  const selectArea = (area: ServiceCatalogArea) => {
    const firstGroup = area.groups[0];
    const firstService = firstGroup?.items[0];
    setAreaId(area.id);
    setServiceName(firstService?.name ?? '');
    setOpenServiceGroups((current) => ({ ...current, [area.id]: firstGroup?.title ?? '' }));
    setAgendaOpen(false);
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
          <p>Elige el servicio en Indian y consulta profesionales, fechas y horas disponibles en la agenda real.</p>
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
                                onClick={() => {
                                  setServiceName(service.name);
                                  setAgendaOpen(false);
                                }}
                              >
                                <span>
                                  <strong>{service.name}</strong>
                                  <small>{service.duration} · {service.price}</small>
                                </span>
                                <i className={`booking-service-list__status${mapped ? ' is-live' : ''}`}>
                                  {mapped ? 'Agenda online' : 'Consulta'}
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
                    <p>La disponibilidad se abre con este servicio identificado en AgendaPro. Allí eliges profesional, fecha y hora y completas la reserva.</p>
                  ) : (
                    <p>Este servicio todavía no tiene un enlace directo con AgendaPro. Puedes coordinarlo con el equipo por WhatsApp.</p>
                  )}
                </div>
              </div>

              {agendaService ? (
                <div className="booking-live-card">
                  <div>
                    <span>Disponibilidad real</span>
                    <strong>{agendaService.agendaName}</strong>
                    <p>AgendaPro · {agendaService.durationMinutes} min · USD {agendaService.price}</p>
                  </div>
                  <div className="booking-live-card__actions">
                    <button type="button" onClick={() => setAgendaOpen(true)}>Ver horarios disponibles ↗</button>
                    <a href={publicBookingUrl} target="_blank" rel="noreferrer">Abrir en otra pestaña</a>
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
              <div><dt>Disponibilidad</dt><dd>{agendaService ? 'AgendaPro en tiempo real' : 'Consulta directa'}</dd></div>
            </dl>
            {agendaService ? (
              <button className="booking-summary__submit" type="button" onClick={() => setAgendaOpen(true)}>
                Ver horarios disponibles ↗
              </button>
            ) : (
              <a className="booking-summary__submit" href={whatsappUrl} target="_blank" rel="noreferrer">
                Consultar por WhatsApp ↗
              </a>
            )}
            <p>
              {agendaService
                ? 'La cita queda confirmada únicamente al completar el flujo de AgendaPro.'
                : 'El equipo confirmará manualmente la disponibilidad de este servicio.'}
            </p>
          </aside>
        </div>
      </section>

      {agendaOpen && agendaService ? (
        <div className="agendapro-modal" role="dialog" aria-modal="true" aria-labelledby="agendapro-modal-title">
          <div className="agendapro-modal__shell">
            <header className="agendapro-modal__header">
              <div>
                <span>Reserva online · AgendaPro</span>
                <strong id="agendapro-modal-title">{selectedService?.name}</strong>
                <small>{selectedService?.duration} · {selectedService?.price}</small>
              </div>
              <div className="agendapro-modal__header-actions">
                <a href={publicBookingUrl} target="_blank" rel="noreferrer">Abrir aparte ↗</a>
                <button type="button" onClick={() => setAgendaOpen(false)} aria-label="Cerrar agenda">×</button>
              </div>
            </header>
            <div className="agendapro-modal__frame-wrap">
              <iframe
                key={agendaService.id}
                src={embedBookingUrl}
                title={`Reserva ${selectedService?.name} en AgendaPro`}
                loading="eager"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="payment"
              />
            </div>
            <footer className="agendapro-modal__footer">
              <span>Disponibilidad y confirmación gestionadas temporalmente por AgendaPro.</span>
              <a href={publicBookingUrl} target="_blank" rel="noreferrer">Si no carga correctamente, continuar en AgendaPro ↗</a>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
