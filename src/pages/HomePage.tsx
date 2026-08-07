import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeGiftCards } from '../components/HomeGiftCards';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { WhatsappInquiryForm } from '../components/WhatsappInquiryForm';
import {
  useGlobalSettings,
  useHomeHero,
  useHomeVisit,
  useServiceCatalogContent,
} from '../content/useSiteContent';
import { houseHeroMedia } from '../data/experienceMedia';
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
  const visit = useHomeVisit();
  const activeArea = serviceCatalog[activePortal] ?? serviceCatalog[0];
  const heroRepeatsAService = serviceCatalog.some(
    (area) => Boolean(hero.video && area.media.video && hero.video === area.media.video),
  );
  const resolvedHero = heroRepeatsAService || !hero.video
    ? { ...hero, ...houseHeroMedia }
    : hero;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${settings.address}, ${settings.city}`)}&output=embed`;

  return (
    <>
      <Seo
        title={`${settings.brandName} · Indian House en Loja`}
        description="Indian House reúne barbería, estudio fotográfico, nails y SPA en el centro de Loja."
      />

      <div className="art-home art-home--house">
        <section className="film-hero film-hero--integrated film-hero--without-ticker" aria-labelledby="film-hero-title">
          <motion.div
            className="film-hero__media"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.045, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ViewportVideo
              src={resolvedHero.video}
              poster={resolvedHero.poster}
              label={`Entrada a Indian House en ${settings.city}`}
              priority
            />
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
              <div><span>{resolvedHero.location}</span><span>{resolvedHero.founded}</span></div>
            </motion.div>

            <motion.div
              className="film-hero__statement"
              initial={reduceMotion ? false : { opacity: 0, y: 34, clipPath: 'inset(0 0 18% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              transition={{ duration: 0.78, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 id="film-hero-title">{resolvedHero.title}</h1>
              <p>{resolvedHero.lead}</p>
              <motion.div
                className="film-hero__actions"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to="/reservar">{resolvedHero.primaryLabel} <Arrow /></Link>
                <a href="#espacios">Conocer los espacios</a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="espacios" className="service-portals service-portals--house" aria-label="Espacios de Indian House">
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

        <section className="home-value-bridge" aria-labelledby="home-value-title">
          <header className="home-value-bridge__header">
            <span>Indian House</span>
            <h2 id="home-value-title">Cuatro experiencias. Una sola casa.</h2>
            <p>Barbería, fotografía, nails y SPA conviven en un mismo lugar para que puedas resolver tu visita sin saltar entre espacios ni agendas.</p>
          </header>

          <div className="home-value-bridge__grid">
            <article>
              <strong>Todo en un lugar</strong>
              <p>Combina servicios de distintas áreas dentro de una misma visita a Indian House.</p>
            </article>
            <article>
              <strong>Reserva simple</strong>
              <p>Elige área, servicio, profesional y horario desde un solo flujo.</p>
            </article>
            <article>
              <strong>Equipo especializado</strong>
              <p>Cada espacio conserva su propio equipo, técnica y forma de atender.</p>
            </article>
            <article>
              <strong>En el centro de Loja</strong>
              <p>Una ubicación accesible con horarios pensados para organizar mejor tu día.</p>
            </article>
          </div>

          <div className="home-value-bridge__actions">
            <Link to="/reservar">Agendar una visita <Arrow /></Link>
            <a href={settings.mapHref} target="_blank" rel="noreferrer">Cómo llegar <Arrow /></a>
          </div>
        </section>

        <HomeGiftCards />

        <WhatsappInquiryForm
          title="¿Tienes una sugerencia para Indian House?"
          lead="Déjanos tu nombre, teléfono y mensaje. La sugerencia llegará directamente por WhatsApp."
          context="Sugerencia general para Indian House"
        />

        <section className="home-visit-strip home-visit-strip--social home-visit-strip--compact-map" aria-labelledby="home-visit-strip-title">
          <div className="home-visit-strip__intro">
            <h2 id="home-visit-strip-title">{visit.title}</h2>
            <a href={settings.mapHref} target="_blank" rel="noreferrer">Cómo llegar <Arrow /></a>
          </div>

          <div className="home-visit-strip__map">
            <iframe
              src={mapEmbedUrl}
              title={`Mapa de ${settings.brandName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
            />
            <a href={settings.mapHref} target="_blank" rel="noreferrer">Ver en Google Maps <Arrow /></a>
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
