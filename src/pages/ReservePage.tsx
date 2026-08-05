import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import {
  type TeamMemberContent,
  useGlobalSettings,
  useServiceCatalogContent,
  useTeamMembersContent,
} from '../content/useSiteContent';
import type { ServiceCatalogArea } from '../data/serviceCatalog';

const dateFormatter = new Intl.DateTimeFormat('es-EC', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

const compactDateFormatter = new Intl.DateTimeFormat('es-EC', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

type BookingDay = {
  iso: string;
  date: Date;
  compact: string;
  full: string;
};

type BookingProfessional = {
  name: string;
  role: string;
  image: string;
};

function buildBookingDays(): BookingDay[] {
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index + 1);

    return {
      iso: date.toISOString().slice(0, 10),
      date,
      compact: compactDateFormatter.format(date).replace('.', ''),
      full: dateFormatter.format(date),
    };
  });
}

function slotsForDate(date: Date) {
  if (date.getDay() === 0) return ['10:00', '11:30', '13:00'];
  return ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30', '20:00'];
}

function professionalsForArea(
  area: ServiceCatalogArea,
  team: TeamMemberContent[],
): BookingProfessional[] {
  const rolePattern = {
    barberia: /barber/i,
    combos: /barber/i,
    nails: /manicur|uñas|nails/i,
    spa: /spa|esteti|facial|masaj/i,
    fotografia: /fotograf|contenido visual/i,
  }[area.id];

  const matching = team
    .filter((member) => rolePattern.test(member.role))
    .map((member) => ({ name: member.name, role: member.role, image: member.image }));

  const anyAvailable: BookingProfessional = {
    name: 'Cualquier profesional disponible',
    role: 'La primera opción disponible para esta área',
    image: area.media.poster,
  };

  if (matching.length > 0) return [anyAvailable, ...matching];

  return [
    anyAvailable,
    {
      name: area.id === 'spa' ? 'Equipo SPA Indian Club' : 'Equipo de Estudio Fotográfico',
      role: 'Asignación según disponibilidad',
      image: area.media.poster,
    },
  ];
}

export function ReservePage() {
  const [searchParams] = useSearchParams();
  const settings = useGlobalSettings();
  const catalog = useServiceCatalogContent();
  const team = useTeamMembersContent();
  const days = useMemo(buildBookingDays, []);

  const requestedArea = searchParams.get('area');
  const requestedService = searchParams.get('service');
  const initialArea = catalog.find((area) => area.id === requestedArea) ?? catalog[0];
  const initialServices = initialArea?.groups.flatMap((group) => group.items) ?? [];
  const initialService = initialServices.find((service) => service.name === requestedService) ?? initialServices[0];

  const [areaId, setAreaId] = useState<ServiceCatalogArea['id']>(initialArea?.id ?? 'barberia');
  const [serviceName, setServiceName] = useState(initialService?.name ?? '');
  const [professionalName, setProfessionalName] = useState('Cualquier profesional disponible');
  const [selectedDate, setSelectedDate] = useState(days[0]?.iso ?? '');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  const activeArea = catalog.find((area) => area.id === areaId) ?? catalog[0];
  const services = activeArea?.groups.flatMap((group) =>
    group.items.map((service) => ({ ...service, group: group.title })),
  ) ?? [];
  const selectedService = services.find((service) => service.name === serviceName) ?? services[0];
  const professionals = activeArea ? professionalsForArea(activeArea, team) : [];
  const selectedProfessional = professionals.find((professional) => professional.name === professionalName) ?? professionals[0];
  const activeDay = days.find((day) => day.iso === selectedDate) ?? days[0];
  const availableSlots = activeDay ? slotsForDate(activeDay.date) : [];
  const canRequest = Boolean(activeArea && selectedService && selectedProfessional && activeDay && selectedTime);

  const message = [
    `Hola, quiero solicitar una cita en ${settings.brandName}.`,
    '',
    `Área: ${activeArea?.title ?? 'Por definir'}`,
    `Servicio: ${selectedService?.name ?? 'Por definir'}`,
    `Profesional: ${selectedProfessional?.name ?? 'Por definir'}`,
    `Fecha solicitada: ${activeDay?.full ?? 'Por definir'}`,
    `Hora solicitada: ${selectedTime || 'Por definir'}`,
    customerName.trim() ? `Nombre: ${customerName.trim()}` : '',
    notes.trim() ? `Nota: ${notes.trim()}` : '',
    '',
    'Entiendo que la fecha y la hora quedan pendientes de confirmación por Indian Club.',
  ].filter(Boolean).join('\n');

  const separator = settings.whatsappHref.includes('?') ? '&' : '?';
  const whatsappUrl = `${settings.whatsappHref}${separator}text=${encodeURIComponent(message)}`;

  const selectArea = (area: ServiceCatalogArea) => {
    const firstService = area.groups[0]?.items[0];
    setAreaId(area.id);
    setServiceName(firstService?.name ?? '');
    setProfessionalName('Cualquier profesional disponible');
    setSelectedTime('');
  };

  return (
    <>
      <Seo
        title="Reservar"
        description={`Elige servicio, profesional, fecha y hora para solicitar tu próxima visita a ${settings.brandName}.`}
      />

      <section className="booking-experience-hero">
        <div className="booking-experience-hero__media">
          {activeArea ? <img src={activeArea.media.poster} alt="" loading="eager" /> : null}
          <div aria-hidden="true" />
        </div>
        <div className="booking-experience-hero__copy">
          <h1>Reserva tu próxima visita.</h1>
          <p>
            Elige todo dentro de Indian Club. La fecha y la hora se confirman por WhatsApp mientras conectamos la agenda en tiempo real.
          </p>
          <Link to="/servicios">Revisar todos los servicios ↗</Link>
        </div>
      </section>

      <section className="booking-experience" aria-labelledby="booking-flow-title">
        <header className="booking-experience__header">
          <h2 id="booking-flow-title">Empieza por el área.</h2>
          <p>Si llegaste desde un servicio, ya aparece seleccionado. Puedes cambiarlo aquí.</p>
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

        <div className="booking-workspace">
          <div className="booking-steps">
            <section className="booking-step" aria-labelledby="booking-service-title">
              <div className="booking-step__heading">
                <span>1</span>
                <div>
                  <h3 id="booking-service-title">Elige el servicio</h3>
                  <p>{activeArea?.summary}</p>
                </div>
              </div>
              <div className="booking-service-list">
                {services.map((service) => (
                  <button
                    type="button"
                    className={service.name === selectedService?.name ? 'is-active' : undefined}
                    key={service.name}
                    onClick={() => {
                      setServiceName(service.name);
                      setSelectedTime('');
                    }}
                  >
                    <span>{service.group}</span>
                    <strong>{service.name}</strong>
                    <small>{service.duration} · {service.price}</small>
                  </button>
                ))}
              </div>
            </section>

            <section className="booking-step" aria-labelledby="booking-professional-title">
              <div className="booking-step__heading">
                <span>2</span>
                <div>
                  <h3 id="booking-professional-title">Elige profesional</h3>
                  <p>Solo aparecen profesionales relacionados con el área seleccionada.</p>
                </div>
              </div>
              <div className="booking-professionals">
                {professionals.map((professional) => (
                  <button
                    type="button"
                    className={professional.name === selectedProfessional?.name ? 'is-active' : undefined}
                    key={professional.name}
                    onClick={() => setProfessionalName(professional.name)}
                  >
                    <img src={professional.image} alt="" />
                    <span><strong>{professional.name}</strong><small>{professional.role}</small></span>
                  </button>
                ))}
              </div>
            </section>

            <section className="booking-step" aria-labelledby="booking-date-title">
              <div className="booking-step__heading">
                <span>3</span>
                <div>
                  <h3 id="booking-date-title">Elige fecha y hora</h3>
                  <p>Son horarios de solicitud. Indian Club confirmará la disponibilidad final.</p>
                </div>
              </div>
              <div className="booking-calendar" aria-label="Próximos días disponibles">
                {days.map((day) => (
                  <button
                    type="button"
                    className={day.iso === activeDay?.iso ? 'is-active' : undefined}
                    key={day.iso}
                    onClick={() => {
                      setSelectedDate(day.iso);
                      setSelectedTime('');
                    }}
                  >
                    {day.compact}
                  </button>
                ))}
              </div>
              <div className="booking-time-slots" aria-label="Horarios de solicitud">
                {availableSlots.map((slot) => (
                  <button
                    type="button"
                    className={slot === selectedTime ? 'is-active' : undefined}
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </section>

            <section className="booking-step" aria-labelledby="booking-contact-title">
              <div className="booking-step__heading">
                <span>4</span>
                <div>
                  <h3 id="booking-contact-title">Añade tus datos</h3>
                  <p>Son opcionales, pero ayudan a identificar la solicitud.</p>
                </div>
              </div>
              <div className="booking-contact-fields">
                <label>
                  <span>Nombre</span>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Tu nombre"
                  />
                </label>
                <label>
                  <span>Nota para el equipo</span>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Referencia, preferencia o detalle importante"
                    rows={4}
                  />
                </label>
              </div>
            </section>
          </div>

          <aside className="booking-summary" aria-label="Resumen de la solicitud">
            <div className="booking-summary__media">
              {activeArea ? <img src={activeArea.media.poster} alt="" /> : null}
            </div>
            <h2>Tu solicitud</h2>
            <dl>
              <div><dt>Área</dt><dd>{activeArea?.shortTitle}</dd></div>
              <div><dt>Servicio</dt><dd>{selectedService?.name}</dd></div>
              <div><dt>Profesional</dt><dd>{selectedProfessional?.name}</dd></div>
              <div><dt>Fecha</dt><dd>{activeDay?.full}</dd></div>
              <div><dt>Hora</dt><dd>{selectedTime || 'Selecciona una hora'}</dd></div>
            </dl>
            <a
              className={`booking-summary__submit${canRequest ? '' : ' is-disabled'}`}
              href={canRequest ? whatsappUrl : undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!canRequest}
              onClick={(event) => {
                if (!canRequest) event.preventDefault();
              }}
            >
              Solicitar por WhatsApp ↗
            </a>
            <p>La solicitud no bloquea el horario hasta recibir confirmación de Indian Club.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
