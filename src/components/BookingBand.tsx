import { bookingUrl } from '../data/site';

export function BookingBand() {
  return (
    <section className="booking-band" aria-labelledby="booking-band-title">
      <div>
        <span>Tu momento en Indian</span>
        <h2 id="booking-band-title">Elige el servicio. Encuentra tu horario.</h2>
      </div>
      <p>
        Consulta la disponibilidad de profesionales, fechas y horarios, y confirma tu cita online.
      </p>
      <a className="button button--dark" href={bookingUrl} target="_blank" rel="noreferrer">
        Ver horarios <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
