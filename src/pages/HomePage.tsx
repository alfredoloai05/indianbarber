import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeGiftCards } from '../components/HomeGiftCards';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import {
  useGlobalSettings,
  useHomeClub,
  useHomeGuides,
  useHomeHero,
  useHomeServices,
  useHomeVisit,
  useJournalArticlesContent,
  usePromotionsContent,
  useServiceCatalogContent,
} from '../content/useSiteContent';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HomePage() {
  const [activePortal, setActivePortal] = useState(0);
  const reduceMotion = useReducedMotion();
  const settings = useGlobalSettings();
  const hero = useHomeHero();
  const servicesIntro = useHomeServices();
  const serviceCatalog = useServiceCatalogContent();
  const club = useHomeClub();
  const promotions = usePromotionsContent();
  const guidesIntro = useHomeGuides();
  const journalItems = useJournalArticlesContent();
  const visit = useHomeVisit();
  const activeArea = serviceCatalog[activePortal] ?? serviceCatalog[0];
  const mapQuery = `Indian Club, ${settings.address}, ${settings.city}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <Seo
        title={`${settings.brandName} · Barbería, SPA, nails y fotografía`}
        description={`${settings.brandName} reúne barbería, SPA, nails y estudio fotográfico en el centro de Loja. Conoce servicios, promociones, trabajos y reservas.`}
      />

      <div className="art-home art-home--flow-polish">
        <section className="film-hero film-hero--integrated film-hero--without-ticker" aria-labelledby="film-hero-title">
          <motion.div
            className="film-hero__media"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.045, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ViewportVideo src={hero.video} poster={hero.poster} label={`Barbería en ${settings.brandName}`} priority />
            <div className="film-hero__veil" />
          </motion.div>

          <div className="film-hero__content">
            <motion.div
              className="film-hero__identity"
              initial={reduceMotion ? false : { opacity: 0, y: -22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={settings.logoLockup} alt={settings.brandName} />
              <div>
                <span>{hero.location}</span>
                <span>{hero.founded}</span>
              </div>
            </motion.div>

            <motion.div
              className="film-hero__statement"
              initial={reduceMotion ? false : { opacity: 0, y: 34, clipPath: 'inset(0 0 18% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 0.78, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 id="film-hero-title">{hero.title}</h1>
              <p>{hero.lead}</p>
              <motion.div
                className="film-hero__actions"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href={settings.bookingUrl} target="_blank" rel="noreferrer">{hero.primaryLabel} <Arrow /></a>
                <Link to="/style-book">{hero.secondaryLabel}</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="service-portals" aria-labelledby="service-portals-title">
          <header className="service-portals__intro">
            <div>
              <h2 id="service-portals-title">{servicesIntro.title}</h2>
            </div>
          </header>

          {activeArea ? (
            <div className="service-portals__grid" data-active={activeArea.id}>
              {serviceCatalog.map((area, index) => {
                const isActive = activePortal === index;
                const examples = area.groups.flatMap((group) => group.items).slice(0, 3);

                return (
                  <article
                    key={area.id}
                    className={`service-portal service-portal--${area.id}${isActive ? ' is-active' : ''}`}
                    onMouseEnter={() => setActivePortal(index)}
                    onFocusCapture={() => setActivePortal(index)}
                  >
                    <div className="service-portal__poster">
                      <img src={area.media.poster} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
                    </div>

                    {isActive && area.media.video ? (
                      <motion.div
                        className="service-portal__video"
                        initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ViewportVideo src={area.media.video} poster={area.media.poster} label={`${area.title} en ${settings.brandName}`} />
                      </motion.div>
                    ) : null}

                    <div className="service-portal__ambient" aria-hidden="true" />
                    <div className="service-portal__veil" aria-hidden="true" />

                    <button
                      type="button"
                      className="service-portal__trigger"
                      aria-expanded={isActive}
                      aria-controls={`portal-${area.id}`}
                      onClick={() => setActivePortal(index)}
                    >
                      <strong>{area.shortTitle}</strong>
                      <span aria-hidden="true">+</span>
                    </button>

                    <motion.div
                      id={`portal-${area.id}`}
                      className="service-portal__details"
                      initial={false}
                      animate={isActive ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: 18, pointerEvents: 'none' }}
                      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                      aria-hidden={!isActive}
                    >
                      <p>{area.summary}</p>
                      <ul>{examples.map((item) => <li key={item.name}>{item.name}</li>)}</ul>
                      <Link to={`/servicios/${area.route}`}>Ver {area.shortTitle.toLowerCase()} <Arrow /></Link>
                    </motion.div>
                  </article>
                );
              })}
            </div>
          ) : null}
        </section>

        <section className="club-film club-film--compact" aria-labelledby="club-film-title">
          {club.video ? (
            <ViewportVideo src={club.video} poster={club.poster} label="Espacios y servicios de Indian Club" />
          ) : (
            <img src={club.poster} alt="Espacios y servicios de Indian Club" loading="lazy" />
          )}
          <div className="club-film__veil" />
          <div className="club-film__copy">
            <img src={settings.logoMark} alt="" />
            <h2 id="club-film-title">{club.title}</h2>
            <p>{club.description}</p>
            <Link to="/club">{club.ctaLabel} <Arrow /></Link>
          </div>
        </section>

        <section className="promotion-ledger promotion-ledger--beam" aria-labelledby="promotion-ledger-title">
          <header>
            <h2 id="promotion-ledger-title">Beneficios vigentes en {settings.brandName}.</h2>
            <p>Confirma disponibilidad y condiciones directamente con el centro.</p>
          </header>
          <div>
            {promotions.map((promotion) => (
              <a href={settings.bookingUrl} target="_blank" rel="noreferrer" key={promotion.title}>
                <small>{promotion.eyebrow}</small>
                <strong>{promotion.title}</strong>
                <p>{promotion.note}</p>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>

        <HomeGiftCards />

        <section className="home-guides" aria-labelledby="home-guides-title">
          <header className="home-guides__header">
            <div>
              <h2 id="home-guides-title">{guidesIntro.title}</h2>
            </div>
            <Link to="/inspirate">{guidesIntro.ctaLabel} <Arrow /></Link>
          </header>

          <div className="home-guides__grid">
            {journalItems.map((item, index) => (
              <Link className={`home-guide${index === 0 ? ' home-guide--feature' : ' home-guide--compact'}`} to={`/inspirate/${item.slug}`} key={item.slug}>
                <img src={item.image} alt="" loading="lazy" />
                <div className="home-guide__veil" aria-hidden="true" />
                <div className="home-guide__copy">
                  <small>{item.type}</small>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <span>Leer guía <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="visit-terminal visit-terminal--embedded visit-terminal--clean" aria-labelledby="visit-terminal-title">
          <div className="visit-terminal__map">
            <iframe
              src={mapEmbedUrl}
              title={`Mapa de ${settings.brandName}`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="visit-terminal__details">
            <div className="visit-terminal__intro">
              <h2 id="visit-terminal-title">{visit.title}</h2>
              <address>{settings.address}<br />{settings.city}</address>
              <a href={settings.mapHref} target="_blank" rel="noreferrer">Abrir en Google Maps <Arrow /></a>
            </div>
            <div className="visit-terminal__hours">
              {settings.hours.map((item) => (
                <p key={item.days}><span>{item.days}</span><strong>{item.value}</strong></p>
              ))}
              <a href={settings.whatsappHref} target="_blank" rel="noreferrer">WhatsApp {settings.whatsapp}</a>
            </div>
            <div className="visit-terminal__booking">
              <h3>{visit.bookingTitle}</h3>
              <a href={settings.bookingUrl} target="_blank" rel="noreferrer">{visit.bookingLabel} <Arrow /></a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
