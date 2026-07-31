import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { useClubPageContent, useGlobalSettings } from '../content/useSiteContent';

export function ClubPage() {
  const content = useClubPageContent();
  const settings = useGlobalSettings();

  return (
    <>
      <Seo
        title="El Club"
        description={`Conoce ${settings.brandName} en Loja: barbería, nails, tattoo studio, cafetería y parqueo exclusivo en una misma casa.`}
      />

      <section className="club-visual-hero" aria-labelledby="club-visual-title">
        <ViewportVideo src={content.heroVideo} poster={content.heroPoster} label={`Ambiente de ${settings.brandName}`} priority />
        <div className="club-visual-hero__veil" />
        <div className="club-visual-hero__copy">
          <img src={settings.logoLockup} alt={settings.brandName} />
          <span>{content.eyebrow}</span>
          <h1 id="club-visual-title">{content.title}</h1>
          <p>{content.description}</p>
          <div>
            <a href={settings.bookingUrl} target="_blank" rel="noreferrer">Reservar cita ↗</a>
            <a href={settings.mapHref} target="_blank" rel="noreferrer">Cómo llegar</a>
          </div>
        </div>
      </section>

      <section className="club-visual-grid" aria-label={`Espacios y servicios de ${settings.brandName}`}>
        {content.gallery.map((item, index) => (
          <article className={index === 0 ? 'club-visual-grid__feature' : undefined} key={`${item.label}-${index}`}>
            {item.video ? (
              <ViewportVideo src={item.video} poster={item.poster ?? item.image ?? content.heroPoster} label={item.label} />
            ) : (
              <img src={item.image ?? item.poster ?? content.heroPoster} alt={item.label} loading={index < 2 ? 'eager' : 'lazy'} />
            )}
            <div><span>{item.label}</span><strong>{item.title}</strong></div>
          </article>
        ))}
      </section>

      <section className="club-amenities" aria-labelledby="club-amenities-title">
        <div>
          <span>Antes y después de tu cita</span>
          <h2 id="club-amenities-title">{content.amenitiesTitle}</h2>
        </div>
        <div className="club-amenities__list">
          {content.amenities.map((item) => (
            <article key={item.title}><strong>{item.title}</strong><p>{item.description}</p></article>
          ))}
        </div>
      </section>

      <section className="club-visit-compact" aria-labelledby="club-visit-title">
        <div>
          <span>Visítanos</span>
          <h2 id="club-visit-title">{settings.address}</h2>
          <p>{settings.city}</p>
        </div>
        <div className="club-visit-compact__hours">
          {settings.hours.map((item) => (
            <p key={item.days}><span>{item.days}</span><strong>{item.value}</strong></p>
          ))}
        </div>
        <div className="club-visit-compact__actions">
          <a href={settings.mapHref} target="_blank" rel="noreferrer">Abrir mapa ↗</a>
          <a href={settings.whatsappHref} target="_blank" rel="noreferrer">WhatsApp ↗</a>
          <a className="club-visit-compact__booking" href={settings.bookingUrl} target="_blank" rel="noreferrer">Reservar ahora ↗</a>
        </div>
      </section>

      <section className="club-work-link">
        <span>Conoce el trabajo del equipo</span>
        <Link to="/style-book">Abrir Style Book ↗</Link>
      </section>
    </>
  );
}
