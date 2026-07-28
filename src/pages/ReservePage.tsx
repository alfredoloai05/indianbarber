import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { bookingUrl, contact, media } from '../data/site';

export function ReservePage() {
  return (
    <>
      <Seo
        title="Reservar"
        description="Reserva tu cita en Indian Club mediante AgendaPro y consulta por WhatsApp si necesitas orientación antes de elegir."
      />

      <section className="reserve-final">
        <div className="reserve-final__media">
          <img src={media.hero} alt="Servicio realizado dentro de Indian Club" loading="eager" />
          <div aria-hidden="true" />
          <span>RESERVA / INDIAN CLUB</span>
        </div>
        <div className="reserve-final__copy">
          <p className="final-kicker">Tu momento en Indian</p>
          <h1>Elige el servicio. <em>Encuentra tu horario.</em></h1>
          <p>
            Revisa el ritual, su duración y precio de referencia. Después selecciona profesional, fecha y horario disponibles.
          </p>
          <div className="final-actions">
            <a className="final-button" href={bookingUrl} target="_blank" rel="noreferrer">Reservar ahora ↗</a>
            <Link className="final-link" to="/servicios">Revisar servicios</Link>
          </div>
        </div>
      </section>

      <section className="reserve-path">
        <article><span>01</span><h2>Elige intención</h2><p>Piensa si quieres mantener, cambiar, prepararte o expresar algo propio.</p></article>
        <article><span>02</span><h2>Revisa el ritual</h2><p>Comprueba alcance, duración, precio de referencia e inclusiones.</p></article>
        <article><span>03</span><h2>Confirma</h2><p>Selecciona profesional, fecha y horario disponibles.</p></article>
        <article><span>04</span><h2>Llega</h2><p>Estamos en {contact.address}, con parqueo exclusivo para clientes.</p></article>
      </section>

      <section className="reserve-support">
        <div><span>¿Todavía tienes dudas?</span><h2>Te ayudamos a elegir antes de reservar.</h2></div>
        <p>Escríbenos si es tu primera visita, necesitas una cotización de tattoo o no sabes qué opción corresponde a tu resultado.</p>
        <a className="final-button final-button--dark" href={contact.whatsappHref} target="_blank" rel="noreferrer">Consultar por WhatsApp ↗</a>
      </section>
    </>
  );
}
