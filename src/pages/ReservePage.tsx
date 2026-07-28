import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { bookingUrl } from '../data/site';

export function ReservePage() {
  return (
    <>
      <Seo
        title="Reservar"
        description="Reserva tu cita en Indian Club. En la Fase 1 la selección de servicio, profesional y horario continúa en AgendaPro."
      />
      <section className="reserve-handoff">
        <div className="reserve-handoff__index">RESERVA / FASE 1</div>
        <div className="reserve-handoff__copy">
          <p className="eyebrow">Tu momento en Indian</p>
          <h1>Primero eliges con claridad. Luego confirmas el horario.</h1>
          <p>La nueva web presenta servicios, duración y criterio. La confirmación sigue ocurriendo en AgendaPro para no interrumpir la operación actual.</p>
          <div className="reserve-handoff__actions">
            <a className="button" href={bookingUrl} target="_blank" rel="noreferrer">Continuar a AgendaPro ↗</a>
            <Link className="text-link" to="/servicios">Revisar servicios</Link>
          </div>
        </div>
        <ol className="reserve-handoff__steps">
          <li><span>01</span><strong>Conoce el servicio</strong><p>Revisa intención, duración y proceso.</p></li>
          <li><span>02</span><strong>Abre AgendaPro</strong><p>Selecciona disponibilidad y profesional en el flujo actual.</p></li>
          <li><span>03</span><strong>Confirma</strong><p>La cita queda sujeta a la confirmación del sistema externo.</p></li>
        </ol>
      </section>
    </>
  );
}
