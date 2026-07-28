import { bookingUrl } from '../data/site';

export function BookingBand() {
  return (
    <section className="booking-band" aria-labelledby="booking-band-title">
      <div>
        <span>Tu momento en Indian</span>
        <h2 id="booking-band-title">La decisión es tuya. El tiempo también.</h2>
      </div>
      <p>
        En esta primera fase la disponibilidad y confirmación continúan en AgendaPro. Llegarás al flujo externo con el contexto claro.
      </p>
      <a className="button button--dark" href={bookingUrl} target="_blank" rel="noreferrer">
        Ver horarios <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
