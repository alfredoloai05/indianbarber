import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { useGlobalSettings, useServiceCatalogContent } from '../content/useSiteContent';
import type { ServiceCatalogArea } from '../data/serviceCatalog';
import {
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
    '¿Me ayudan a elegir profesional, fecha y hora?',
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

  return (
    <>
      <Seo
        title="Reservar"
        description={`Elige tu servicio y continúa con profesional, fecha y hora para reservar tu próxima visita a ${settings.brandName}.`}
      />

      <section className="booking-experience booking-experience--direct booking-experience--agendapro" aria-labelledby="booking-flow-title">
        <header className="booking-experience__header booking-experience__header--direct">
          <div>
            <span className="booking-experience__eyebrow">Reservas Indian Club</span>
            <h1 id="booking-flow-title">Agenda tu visita.</h1>
          </div>
          <p>Elige el área y el servicio. Después seleccionas profesional, fecha y hora sin tener que buscar el servicio otra vez.</p>
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

        <div className="booking-workspace booking-workspace--live booking-workspace--premium-handoff">
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
                          {group.items.map((service) => (
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
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </section>
                  );
                })}
              </div>
            </section>

            <section className="booking-step booking-step--live" aria-labelledby="booking-next-title">
              <div className="booking-step__heading">
                <span>2</span>
                <div>
                  <h2 id="booking-next-title">Completa tu reserva</h2>
                  <p>{agendaService ? 'El servicio ya queda seleccionado al continuar.' : 'Este servicio se coordina directamente con el equipo.'}</p>
                </div>
              </div>

              {agendaService ? (
                <div className="booking-handoff-card">
                  <div className="booking-handoff-card__copy">
                    <span className="booking-handoff-card__eyebrow">Siguiente paso</span>
                    <h3>Elige profesional, fecha y hora.</h3>
                    <p>
                      Ya elegiste <strong>{selectedService?.name}</strong>. Al continuar, ese servicio queda cargado y solo completas el profesional, el día y la hora de tu cita.
                    </p>
                  </div>
                  <div className="booking-handoff-card__actions">
                    <a className="booking-handoff-card__primary" href={publicBookingUrl} target="_blank" rel="noreferrer">
                      Elegir horario y profesional ↗
                    </a>
                    <a className="booking-handoff-card__secondary" href={whatsappUrl} target="_blank" rel="noreferrer">
                      Consultar por WhatsApp ↗
                    </a>
                  </div>
                </div>
              ) : (
                <div className="booking-handoff-card booking-handoff-card--fallback">
                  <div className="booking-handoff-card__copy">
                    <span className="booking-handoff-card__eyebrow">Coordinación directa</span>
                    <h3>Te ayudamos a encontrar el mejor horario.</h3>
                    <p>Este servicio todavía se coordina directamente con el equipo de Indian Club.</p>
                  </div>
                  <div className="booking-handoff-card__actions">
                    <a className="booking-handoff-card__primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                      Consultar por WhatsApp ↗
                    </a>
                  </div>
                </div>
              )}
            </section>
          </div>

          <aside className="booking-summary booking-summary--live booking-summary--premium-handoff" aria-label="Resumen de reserva">
            <div className="booking-summary__media">
              {activeArea ? <img src={activeArea.media.poster} alt="" /> : null}
            </div>
            <span className="booking-summary__eyebrow">Tu selección</span>
            <h2>{selectedService?.name}</h2>
            <dl>
              <div><dt>Área</dt><dd>{activeArea?.shortTitle}</dd></div>
              <div><dt>Duración</dt><dd>{selectedService?.duration}</dd></div>
              <div><dt>Precio</dt><dd>{selectedService?.price}</dd></div>
            </dl>

            {agendaService ? (
              <a className="booking-summary__submit" href={publicBookingUrl} target="_blank" rel="noreferrer">
                Elegir horario y profesional ↗
              </a>
            ) : (
              <a className="booking-summary__submit" href={whatsappUrl} target="_blank" rel="noreferrer">
                Consultar por WhatsApp ↗
              </a>
            )}
            <p>{agendaService ? 'El servicio ya queda seleccionado en el siguiente paso.' : 'El equipo te ayudará a coordinar la cita.'}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
