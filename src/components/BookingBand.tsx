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
        <h2 id="booking-band-title">Reserva tu próxima visita.</h2>
      </div>
      <p>
        Selecciona servicio, profesional, fecha y hora antes de enviar la solicitud de confirmación.
      </p>
      <Link className="button button--dark" to={bookingPath(area, service)}>
        Elegir cita <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
