import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { useContactPageContent, useGlobalSettings } from '../content/useSiteContent';

export function ContactPage() {
  const content = useContactPageContent();
  const settings = useGlobalSettings();

  return (
    <>
      <Seo
        title="Contacto"
        description={`Dirección, horarios, teléfono, WhatsApp y reservas de ${settings.brandName} en Loja, Ecuador.`}
      />

      <section className="chapter-intro chapter-intro--clean">
        <div>
          <p className="final-kicker">{content.eyebrow}</p>
          <h1>{content.title}</h1>
        </div>
        <p className="chapter-intro__aside">{content.description}</p>
      </section>

      <section className="real-contact-grid">
        <a className="real-contact-grid__map" href={settings.mapHref} target="_blank" rel="noreferrer">
          <img src={content.image} alt={`Fachada de ${settings.brandName}`} loading="eager" />
          <div>
            <span>Loja · Ecuador</span>
            <strong>{settings.address}<br />Abrir ubicación ↗</strong>
          </div>
        </a>

        <div className="real-contact-grid__details">
          <div><span>Dirección</span><strong>{settings.address}<br />{settings.city}</strong></div>
          <div><span>Teléfono</span><a href={settings.phoneHref}>{settings.phone}</a></div>
          <div><span>WhatsApp</span><a href={settings.whatsappHref} target="_blank" rel="noreferrer">{settings.whatsapp} ↗</a></div>
          <div><span>Correo</span><a href={settings.emailHref}>{settings.email}</a></div>
          <div>
            <span>Horarios</span>
            {settings.hours.map((item) => <strong key={item.days}>{item.days}: {item.value}<br /></strong>)}
          </div>
          <div className="real-contact-grid__actions">
            <Link className="final-button" to="/reservar">Reservar cita ↗</Link>
            <a className="final-link" href={settings.whatsappHref} target="_blank" rel="noreferrer">Hacer una consulta</a>
          </div>
        </div>
      </section>

      <section className="contact-journey contact-journey--clean">
        {content.journey.map((step) => (
          <article key={step.title}><h2>{step.title}</h2><p>{step.description}</p></article>
        ))}
      </section>

      <BookingBand />
    </>
  );
}
