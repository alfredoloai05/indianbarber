import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { bookingUrl, contact, media } from '../data/site';

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contacto"
        description="Dirección, horarios, teléfono, WhatsApp y reservas de Indian Club en Loja, Ecuador."
      />

      <section className="chapter-intro">
        <div className="chapter-intro__index">07 / LLEGAR</div>
        <div>
          <p className="final-kicker">Contacto Indian Club</p>
          <h1>La experiencia empieza <em>antes de abrir la puerta.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Aquí tienes la información necesaria para llegar, consultar y reservar sin buscarla entre promociones o textos decorativos.
        </p>
      </section>

      <section className="real-contact-grid">
        <a className="real-contact-grid__map" href={contact.mapHref} target="_blank" rel="noreferrer">
          <img src={media.exterior} alt="Fachada nocturna de un espacio de cuidado personal" loading="eager" />
          <div>
            <span>LOJA / ECUADOR</span>
            <strong>{contact.address}<br />Abrir ubicación ↗</strong>
          </div>
        </a>

        <div className="real-contact-grid__details">
          <div><span>Dirección</span><strong>{contact.address}<br />{contact.city}</strong></div>
          <div><span>Teléfono</span><a href={contact.phoneHref}>{contact.phone}</a></div>
          <div><span>WhatsApp</span><a href={contact.whatsappHref} target="_blank" rel="noreferrer">{contact.whatsapp} ↗</a></div>
          <div><span>Correo</span><a href={contact.emailHref}>{contact.email}</a></div>
          <div>
            <span>Horarios</span>
            {contact.hours.map((item) => <strong key={item.days}>{item.days}: {item.value}<br /></strong>)}
          </div>
          <div className="real-contact-grid__actions">
            <a className="final-button" href={bookingUrl} target="_blank" rel="noreferrer">Reservar cita ↗</a>
            <a className="final-link" href={contact.whatsappHref} target="_blank" rel="noreferrer">Hacer una consulta</a>
          </div>
        </div>
      </section>

      <section className="contact-journey">
        <article><span>01</span><h2>Antes</h2><p>Revisa servicio, duración, precio de referencia y disponibilidad.</p></article>
        <article><span>02</span><h2>Llegar</h2><p>Estamos en el centro de Loja y contamos con parqueo exclusivo para clientes.</p></article>
        <article><span>03</span><h2>Durante</h2><p>Conversa sobre rutina, expectativas y mantenimiento antes de iniciar.</p></article>
        <article><span>04</span><h2>Después</h2><p>Conserva las recomendaciones y vuelve cuando la forma o el cuidado lo necesiten.</p></article>
      </section>

      <BookingBand />
    </>
  );
}
