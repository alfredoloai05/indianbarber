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
  useHomeProof,
  useHomeServices,
  useHomeVisit,
  useJournalArticlesContent,
  usePromotionsContent,
  useServiceCatalogContent,
  useStyleBookContent,
} from '../content/useSiteContent';
import { bookingPath } from '../utils/booking';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HomePage() {
  const [activePortal, setActivePortal] = useState(0);
  const reduceMotion = useReducedMotion();
  const settings = useGlobalSettings();
  const hero = useHomeHero();
  const proof = useHomeProof();
  const servicesIntro = useHomeServices();
  const serviceCatalog = useServiceCatalogContent();
  const styleBook = useStyleBookContent();
  const club = useHomeClub();
  const promotions = usePromotionsContent();
  const guidesIntro = useHomeGuides();
  const journalItems = useJournalArticlesContent();
  const visit = useHomeVisit();
  const activeArea = serviceCatalog[activePortal] ?? serviceCatalog[0];
  const styleBookFrames = styleBook.frames.slice(0, 3);

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
                <Link to="/reservar">{hero.primaryLabel} <Arrow /></Link>
                <Link to="/style-book">{hero.secondaryLabel}</Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="home-proof" aria-labelledby="home-proof-title">
          <h2 id="home-proof-title">{proof.title}</h2>
          <div className="home-proof__grid">
            {proof.items.map((item) => (
              <article key={`${item.value}-${item.label}`}>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </article>
            ))}
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
                      <div className="service-portal__actions">
                        <Link to={`/servicios/${area.route}`}>Ver {area.shortTitle.toLowerCase()} <Arrow /></Link>
                        <Link to={bookingPath(area.id)}>Reservar <Arrow /></Link>
                      </div>
                    </motion.div>
                  </article>
                );
              })}
            </div>
          ) : null}
        </section>

        {styleBookFrames[0] ? (
          <section className="home-stylebook-entry" aria-labelledby="home-stylebook-title">
            <Link className="home-stylebook-entry__feature" to="/style-book">
              <img src={styleBookFrames[0].image} alt={styleBookFrames[0].alt} loading="lazy" />
              <div aria-hidden="true" />
              <section>
                <h2 id="home-stylebook-title">Antes de elegir, mira lo que hacemos.</h2>
                <p>{styleBook.description}</p>
                <span>Entrar al Style Book <Arrow /></span>
              </section>
            </Link>
            <div className="home-stylebook-entry__reel" aria-hidden="true">
              {styleBookFrames.slice(1).map((frame) => (
                <figure key={frame.label}>
                  <img src={frame.image} alt="" loading="lazy" />
                  <figcaption>{frame.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className="club-film club-film--compact club-film--safe-copy" aria-labelledby="club-film-title">
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

        <section className="promotion-ledger promotion-ledger--beam promotion-ledger--compact" aria-labelledby="promotion-ledger-title">
          <header>
            <h2 id="promotion-ledger-title">Beneficios vigentes en {settings.brandName}.</h2>
          </header>
          <div>
            {promotions.map((promotion) => (
              <Link to="/reservar" key={promotion.title}>
                <small>{promotion.eyebrow}</small>
                <strong>{promotion.title}</strong>
                <p>{promotion.note}</p>
                <i aria-hidden="true">↗</i>
              </Link>
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

        <section className="home-visit-strip" aria-labelledby="home-visit-strip-title">
          <div className="home-visit-strip__intro">
            <h2 id="home-visit-strip-title">{visit.title}</h2>
            <Link to="/club#ubicacion">Ubícanos <Arrow /></Link>
          </div>

          <div className="home-visit-strip__hours">
            {settings.hours.map((item) => (
              <p key={item.days}><span>{item.days}</span><strong>{item.value}</strong></p>
            ))}
          </div>

          <div className="home-visit-strip__actions">
            <a href={settings.whatsappHref} target="_blank" rel="noreferrer">WhatsApp {settings.whatsapp}</a>
            <Link className="home-visit-strip__booking" to="/reservar">{visit.bookingLabel} <Arrow /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
