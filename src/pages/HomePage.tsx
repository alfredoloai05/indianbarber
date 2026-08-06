import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeGiftCards } from '../components/HomeGiftCards';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { WhatsappInquiryForm } from '../components/WhatsappInquiryForm';
import {
  useGlobalSettings,
  useHomeClub,
  useHomeHero,
  useHomeVisit,
  useServiceCatalogContent,
} from '../content/useSiteContent';
import { bookingPath } from '../utils/booking';
import { spacePath } from '../utils/spaces';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HomePage() {
  const [activePortal, setActivePortal] = useState(0);
  const reduceMotion = useReducedMotion();
  const settings = useGlobalSettings();
  const hero = useHomeHero();
  const serviceCatalog = useServiceCatalogContent();
  const club = useHomeClub();
  const visit = useHomeVisit();
  const activeArea = serviceCatalog[activePortal] ?? serviceCatalog[0];

  return (
    <>
      <Seo
        title={`${settings.brandName} · Indian House en Loja`}
        description={`Indian House reúne barbería, estudio fotográfico, nails y SPA en el centro de Loja.`}
      />

      <div className="art-home art-home--house">
        <section className="film-hero film-hero--integrated film-hero--without-ticker" aria-labelledby="film-hero-title">
          <motion.div
            className="film-hero__media"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.045, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ViewportVideo src={hero.video} poster={hero.poster} label={`Indian House en ${settings.brandName}`} priority />
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
              <div><span>{hero.location}</span><span>{hero.founded}</span></div>
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
                <a href="#espacios">Conocer los espacios</a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="espacios" className="service-portals service-portals--house" aria-labelledby="service-portals-title">
          <header className="service-portals__intro">
            <div><h2 id="service-portals-title">Cuatro espacios. Una sola Indian House.</h2></div>
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
                    <div className="service-portal__poster"><img src={area.media.poster} alt="" loading={index === 0 ? 'eager' : 'lazy'} /></div>
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
                      <strong>{area.title}</strong><span aria-hidden="true">+</span>
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
                        <Link to={spacePath(area.id)}>Entrar al espacio <Arrow /></Link>
                        <Link to={bookingPath(area.id)}>Reservar <Arrow /></Link>
                      </div>
                    </motion.div>
                  </article>
                );
              })}
            </div>
          ) : null}
        </section>

        <section className="club-film club-film--compact club-film--safe-copy" aria-labelledby="club-film-title">
          {club.video ? (
            <ViewportVideo src={club.video} poster={club.poster} label="Espacios de Indian House" />
          ) : (
            <img src={club.poster} alt="Espacios de Indian House" loading="lazy" />
          )}
          <div className="club-film__veil" />
          <div className="club-film__copy">
            <img src={settings.logoMark} alt="" />
            <h2 id="club-film-title">{club.title}</h2>
            <p>{club.description}</p>
            <Link to="/club">{club.ctaLabel} <Arrow /></Link>
          </div>
        </section>

        <HomeGiftCards />

        <WhatsappInquiryForm
          title="¿Tienes una sugerencia para Indian House?"
          lead="Déjanos tu nombre, teléfono y mensaje. La sugerencia llegará directamente por WhatsApp."
          context="Sugerencia general para Indian House"
        />

        <section className="home-visit-strip home-visit-strip--social" aria-labelledby="home-visit-strip-title">
          <div className="home-visit-strip__intro">
            <h2 id="home-visit-strip-title">{visit.title}</h2>
            <Link to="/club#ubicacion">Ubícanos <Arrow /></Link>
          </div>

          <div className="home-visit-strip__contact">
            <p><span>Teléfono</span><a href={settings.phoneHref}>{settings.phone}</a></p>
            <p><span>Correo</span><a href={settings.emailHref}>{settings.email}</a></p>
            <p><span>Dirección</span><strong>{settings.address}<br />{settings.city}</strong></p>
          </div>

          <div className="home-visit-strip__hours">
            {settings.hours.map((item) => <p key={item.days}><span>{item.days}</span><strong>{item.value}</strong></p>)}
          </div>

          <div className="home-visit-strip__socials">
            {(settings.socialLinks ?? []).map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>{social.label} ↗</a>
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
