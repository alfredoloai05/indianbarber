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

      <section className="chapter-intro chapter-intro--clean">
        <div>
          <p className="final-kicker">Contacto</p>
          <h1>Visítanos en <em>el centro de Loja.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Encuentra aquí la dirección, horarios y canales de contacto para reservar o resolver una consulta.
        </p>
      </section>

      <section className="real-contact-grid">
        <a className="real-contact-grid__map" href={contact.mapHref} target="_blank" rel="noreferrer">
          <img src={media.exterior} alt="Fachada nocturna de Indian Club" loading="eager" />
          <div>
            <span>Loja · Ecuador</span>
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

      <section className="contact-journey contact-journey--clean">
        <article><h2>Reserva</h2><p>Elige el servicio, profesional, fecha y horario disponibles.</p></article>
        <article><h2>Llega</h2><p>Estamos en el centro de Loja y contamos con parqueo exclusivo para clientes.</p></article>
        <article><h2>Consulta</h2><p>Escríbenos por WhatsApp si necesitas cotización o ayuda para elegir.</p></article>
        <article><h2>Vuelve</h2><p>Agenda tu mantenimiento cuando el corte, la barba o las uñas lo necesiten.</p></article>
      </section>

      <BookingBand />
    </>
  );
}
