import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { useGlobalSettings, useHomeHero } from '../content/useSiteContent';

export function ReservePage() {
  const settings = useGlobalSettings();
  const hero = useHomeHero();

  return (
    <>
      <Seo
        title="Reservar"
        description={`Reserva tu cita en ${settings.brandName} y consulta por WhatsApp si necesitas orientación antes de elegir.`}
      />

      <section className="reserve-final">
        <div className="reserve-final__media">
          <img src={hero.poster} alt={`Servicio realizado dentro de ${settings.brandName}`} loading="eager" />
          <div aria-hidden="true" />
          <span>{settings.brandName.toUpperCase()} · RESERVAS</span>
        </div>
        <div className="reserve-final__copy">
          <p className="final-kicker">Reservas online</p>
          <h1>Elige el servicio. <em>Encuentra tu horario.</em></h1>
          <p>
            Revisa las opciones disponibles y selecciona profesional, fecha y horario en la plataforma de reservas.
          </p>
          <div className="final-actions">
            <a className="final-button" href={settings.bookingUrl} target="_blank" rel="noreferrer">Reservar ahora ↗</a>
            <Link className="final-link" to="/servicios">Revisar servicios</Link>
          </div>
        </div>
      </section>

      <section className="reserve-path reserve-path--clean">
        <article><h2>Elige el área</h2><p>Barbería, combos, SPA o nails.</p></article>
        <article><h2>Revisa las opciones</h2><p>Consulta qué incluye cada categoría y su precio de referencia.</p></article>
        <article><h2>Confirma</h2><p>Selecciona profesional, fecha y horario disponibles.</p></article>
        <article><h2>Visítanos</h2><p>Estamos en {settings.address}, con parqueo exclusivo para clientes.</p></article>
      </section>

      <section className="reserve-support">
        <div><span>¿Tienes una duda?</span><h2>Te ayudamos a elegir antes de reservar.</h2></div>
        <p>Escríbenos si necesitas información sobre el SPA o no sabes qué servicio corresponde a lo que buscas.</p>
        <a className="final-button final-button--dark" href={settings.whatsappHref} target="_blank" rel="noreferrer">Consultar por WhatsApp ↗</a>
      </section>
    </>
  );
}
