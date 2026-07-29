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
          <span>INDIAN CLUB · RESERVAS</span>
        </div>
        <div className="reserve-final__copy">
          <p className="final-kicker">Reservas online</p>
          <h1>Elige el servicio. <em>Encuentra tu horario.</em></h1>
          <p>
            Revisa las opciones disponibles y selecciona profesional, fecha y horario en AgendaPro.
          </p>
          <div className="final-actions">
            <a className="final-button" href={bookingUrl} target="_blank" rel="noreferrer">Reservar ahora ↗</a>
            <Link className="final-link" to="/servicios">Revisar servicios</Link>
          </div>
        </div>
      </section>

      <section className="reserve-path reserve-path--clean">
        <article><h2>Elige el área</h2><p>Barbería, combos, tattoo o nails.</p></article>
        <article><h2>Revisa las opciones</h2><p>Consulta qué incluye cada categoría y su precio de referencia.</p></article>
        <article><h2>Confirma</h2><p>Selecciona profesional, fecha y horario disponibles.</p></article>
        <article><h2>Visítanos</h2><p>Estamos en {contact.address}, con parqueo exclusivo para clientes.</p></article>
      </section>

      <section className="reserve-support">
        <div><span>¿Tienes una duda?</span><h2>Te ayudamos a elegir antes de reservar.</h2></div>
        <p>Escríbenos si necesitas una cotización de tattoo o no sabes qué servicio corresponde a lo que buscas.</p>
        <a className="final-button final-button--dark" href={contact.whatsappHref} target="_blank" rel="noreferrer">Consultar por WhatsApp ↗</a>
      </section>
    </>
  );
}
