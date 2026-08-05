import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { useClubPageContent, useGlobalSettings, useServiceCatalogContent } from '../content/useSiteContent';

export function ClubPage() {
  const content = useClubPageContent();
  const settings = useGlobalSettings();
  const serviceCatalog = useServiceCatalogContent();
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${settings.address}, ${settings.city}`)}&output=embed`;

  return (
    <>
      <Seo
        title="El Club"
        description={`Conoce ${settings.brandName} en Loja: barbería, SPA, nails, estudio fotográfico y parqueo exclusivo en una misma casa.`}
      />

      <section className="club-visual-hero club-visual-hero--house" aria-labelledby="club-visual-title">
        {content.heroVideo ? (
          <ViewportVideo src={content.heroVideo} poster={content.heroPoster} label={`Ambiente de ${settings.brandName}`} priority />
        ) : (
          <img src={content.heroPoster} alt={`Espacios y servicios de ${settings.brandName}`} loading="eager" />
        )}
        <div className="club-visual-hero__veil" />
        <div className="club-visual-hero__copy">
          <img src={settings.logoLockup} alt={settings.brandName} />
          <span>{content.eyebrow}</span>
          <h1 id="club-visual-title">{content.title}</h1>
          <p>{content.description}</p>
          <div>
            <a href={settings.bookingUrl} target="_blank" rel="noreferrer">Reservar cita ↗</a>
            <Link to="/servicios">Explorar servicios</Link>
          </div>
        </div>
      </section>

      <section className="club-service-directory" aria-labelledby="club-service-directory-title">
        <header>
          <span>Todo Indian Club</span>
          <h2 id="club-service-directory-title">Elige cómo quieres vivir la casa.</h2>
          <p>Cada área tiene su propia experiencia, pero todas comparten el mismo espacio y la misma atención.</p>
        </header>
        <div>
          {serviceCatalog.map((area) => (
            <Link to={`/servicios/${area.route}`} key={area.id}>
              <img src={area.media.poster} alt="" loading="lazy" />
              <span>{area.eyebrow}</span>
              <strong>{area.title}</strong>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="club-visual-grid club-visual-grid--expanded" aria-label={`Espacios y servicios de ${settings.brandName}`}>
        {content.gallery.map((item, index) => (
          <article key={`${item.label}-${index}`}>
            {item.video ? (
              <ViewportVideo src={item.video} poster={item.poster ?? item.image ?? content.heroPoster} label={item.label} />
            ) : (
              <img src={item.image ?? item.poster ?? content.heroPoster} alt={item.label} loading={index < 2 ? 'eager' : 'lazy'} />
            )}
            <div><span>{item.label}</span><strong>{item.title}</strong></div>
          </article>
        ))}
      </section>

      <section className="club-amenities club-amenities--compact" aria-labelledby="club-amenities-title">
        <div>
          <span>Dentro de Indian</span>
          <h2 id="club-amenities-title">{content.amenitiesTitle}</h2>
        </div>
        <div className="club-amenities__list">
          {content.amenities.map((item) => (
            <article key={item.title}><strong>{item.title}</strong><p>{item.description}</p></article>
          ))}
        </div>
      </section>

      <section className="club-map" aria-labelledby="club-map-title">
        <div className="club-map__frame">
          <iframe
            src={mapEmbedUrl}
            title={`Mapa de ${settings.brandName}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="club-map__content">
          <span>Cómo llegar</span>
          <h2 id="club-map-title">Estamos en el centro de Loja.</h2>
          <address>{settings.address}<br />{settings.city}</address>
          <div className="club-map__hours">
            {settings.hours.map((item) => (
              <p key={item.days}><span>{item.days}</span><strong>{item.value}</strong></p>
            ))}
          </div>
          <div className="club-map__actions">
            <a href={settings.mapHref} target="_blank" rel="noreferrer">Abrir en Google Maps ↗</a>
            <a href={settings.whatsappHref} target="_blank" rel="noreferrer">WhatsApp ↗</a>
            <a className="club-map__booking" href={settings.bookingUrl} target="_blank" rel="noreferrer">Reservar ahora ↗</a>
          </div>
        </div>
      </section>

      <section className="club-work-link">
        <span>Conoce más trabajos y resultados</span>
        <Link to="/style-book">Abrir Style Book ↗</Link>
      </section>
    </>
  );
}
