import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { useClubPageContent, useGlobalSettings, useServiceCatalogContent } from '../content/useSiteContent';

export function ClubPage() {
  const content = useClubPageContent();
  const settings = useGlobalSettings();
  const serviceCatalog = useServiceCatalogContent();
  const location = useLocation();
  const mapQuery = `Indian Club, ${settings.address}, ${settings.city}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  useEffect(() => {
    if (location.hash !== '#ubicacion') return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

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
          <h1 id="club-visual-title">{content.title}</h1>
          <p>{content.description}</p>
          <div>
            <a href={settings.bookingUrl} target="_blank" rel="noreferrer">Reservar cita ↗</a>
            <Link to="/servicios">Explorar servicios</Link>
            <a href="#ubicacion">Ubícanos</a>
          </div>
        </div>
      </section>

      <section className="club-service-directory" aria-labelledby="club-service-directory-title">
        <header>
          <h2 id="club-service-directory-title">Elige cómo quieres vivir la casa.</h2>
          <p>Cada área tiene su propia experiencia, pero todas comparten el mismo espacio y la misma atención.</p>
        </header>
        <div>
          {serviceCatalog.map((area) => (
            <Link to={`/servicios/${area.route}`} key={area.id}>
              <img src={area.media.poster} alt="" loading="lazy" />
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
            <div><strong>{item.title}</strong></div>
          </article>
        ))}
      </section>

      <section className="club-amenities club-amenities--compact" aria-labelledby="club-amenities-title">
        <div>
          <h2 id="club-amenities-title">{content.amenitiesTitle}</h2>
        </div>
        <div className="club-amenities__list">
          {content.amenities.map((item) => (
            <article key={item.title}><strong>{item.title}</strong><p>{item.description}</p></article>
          ))}
        </div>
      </section>

      <section id="ubicacion" className="club-map club-map--clean club-map--app" aria-labelledby="club-map-title">
        <div className="club-map__frame">
          <div className="club-map__chrome">
            <div>
              <img src={settings.logoMark} alt="" />
              <span>Indian Club · Loja</span>
            </div>
            <a href={settings.mapHref} target="_blank" rel="noreferrer">Abrir ruta ↗</a>
          </div>
          <iframe
            src={mapEmbedUrl}
            title={`Mapa de ${settings.brandName}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="club-map__content">
          <h2 id="club-map-title">Ubícanos en el centro de Loja.</h2>
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

      <section className="club-work-link club-work-link--clean">
        <Link to="/style-book">Ver trabajos y resultados ↗</Link>
      </section>
    </>
  );
}
