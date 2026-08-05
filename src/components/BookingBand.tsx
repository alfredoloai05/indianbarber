import { Link } from 'react-router-dom';
import { bookingPath } from '../utils/booking';

type BookingBandProps = {
  area?: string;
  service?: string;
};

export function BookingBand({ area, service }: BookingBandProps) {
  return (
    <section className="booking-band" aria-labelledby="booking-band-title">
      <div>
        <span>Tu momento en Indian</span>
        <h2 id="booking-band-title">Elige el servicio. Encuentra tu horario.</h2>
      </div>
      <p>
        Selecciona profesional, fecha y hora dentro de Indian Club y envía la solicitud para confirmación.
      </p>
      <Link className="button button--dark" to={bookingPath(area, service)}>
        Elegir cita <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
