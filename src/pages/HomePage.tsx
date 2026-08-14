import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeGiftCards } from '../components/HomeGiftCards';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import {
  useGlobalSettings,
  useHomeHero,
  useHomeProof,
  useHomeVisit,
  useServiceCatalogContent,
  useStyleBookContent,
} from '../content/useSiteContent';
import { houseHeroMedia } from '../data/experienceMedia';
import type { ServiceCatalogArea } from '../data/serviceCatalog';
import { bookingPath } from '../utils/booking';
import { spacePath } from '../utils/spaces';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function getAreaMeta(area: ServiceCatalogArea) {
  const items = area.groups.flatMap((group) => group.items);
  const numericPrices = items
    .map((item) => item.price.match(/\d+(?:[.,]\d+)?/)?.[0])
    .filter((value): value is string => Boolean(value))
    .map((value) => Number(value.replace(',', '.')))
    .filter((value) => Number.isFinite(value));
  const minPrice = numericPrices.length ? Math.min(...numericPrices) : null;
  const price = minPrice === null
    ? items.find((item) => item.price)?.price ?? 'Consultar'
    : `Desde USD ${minPrice.toLocaleString('es-EC', { maximumFractionDigits: 2 })}`;
  const duration = area.duration || 'Según servicio';

  return { price, duration };
}

export function HomePage() {
  const [activePortal, setActivePortal] = useState(0);
  const reduceMotion = useReducedMotion();
  const settings = useGlobalSettings();
  const hero = useHomeHero();
  const proof = useHomeProof();
  const serviceCatalog = useServiceCatalogContent();
  const styleBook = useStyleBookContent();
  const visit = useHomeVisit();
  const activeArea = serviceCatalog[activePortal] ?? serviceCatalog[0];
  const heroRepeatsAService = serviceCatalog.some(
    (area) => Boolean(hero.video && area.media.video && hero.video === area.media.video),
  );
  const resolvedHero = heroRepeatsAService || !hero.video
    ? { ...hero, ...houseHeroMedia }
    : hero;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${settings.address}, ${settings.city}`)}&output=embed`;
  const resultFrames = styleBook.frames.slice(0, 6);

  return (
    <>
      <Seo
        title={`${settings.brandName} · Indian House en Loja`}
        description={`${settings.brandName} reúne barbería, estudio fotográfico, nails y SPA en el centro de Loja.`}
      />

      <div className="art-home art-home--house">
        <section className="film-hero film-hero--integrated film-hero--without-ticker" aria-labelledby="film-hero-title">
          <motion.div
            className="film-hero__media"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <ViewportVideo
              src={resolvedHero.video}
              poster={resolvedHero.poster}
              label={`Entrada a ${settings.brandName} en ${settings.city}`}
              priority
            />
            <div className="film-hero__veil" />
          </motion.div>

          <div className="film-hero__content">
            <motion.div
              className="film-hero__identity"
              initial={reduceMotion ? false : { opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={settings.logoLockup} alt={settings.brandName} />
              <div><span>{resolvedHero.location}</span><span>{resolvedHero.founded}</span></div>
            </motion.div>

            <motion.div
              className="film-hero__statement"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.66, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 id="film-hero-title">{resolvedHero.title}</h1>
              <p>{resolvedHero.lead}</p>
              <div className="film-hero__actions">
                <Link to="/reservar">{resolvedHero.primaryLabel} <Arrow /></Link>
                <a href="#espacios">Conocer los espacios</a>
              </div>
            </motion.div>
          </div>
        </section>

        {proof.items.length ? (
          <section className="home-proof-band" aria-labelledby="home-proof-title">
            <div className="home-proof-band__intro">
              <span>Trayectoria y confianza</span>
              <h2 id="home-proof-title">{proof.title}</h2>
            </div>
            <div className="home-proof-band__items">
              {proof.items.map((item) => (
                <article key={`${item.value}-${item.label}`}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section id="espacios" className="service-portals service-portals--house" aria-label={`Espacios de ${settings.brandName}`}>
          {activeArea ? (
            <div className="service-portals__grid" data-active={activeArea.id}>
              {serviceCatalog.map((area, index) => {
                const isActive = activePortal === index;
                const examples = area.groups.flatMap((group) => group.items).slice(0, 3);
                const meta = getAreaMeta(area);
                return (
                  <article
                    key={area.id}
                    className={`service-portal service-portal--${area.id}${isActive ? ' is-active' : ''}`}
                    onMouseEnter={() => setActivePortal(index)}
                    onFocusCapture={() => setActivePortal(index)}
                  >
                    <div className="service-portal__poster"><img src={area.media.poster} alt="" loading={index === 0 ? 'eager' : 'lazy'} /></div>
                    {isActive && area.media.video ? (
                      <div className="service-portal__video">
                        <ViewportVideo src={area.media.video} poster={area.media.poster} label={`${area.title} en ${settings.brandName}`} />
                      </div>
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
                    <div
                      id={`portal-${area.id}`}
                      className="service-portal__details"
                      aria-hidden={!isActive}
                    >
                      <div className="service-portal__meta"><span>{meta.price}</span><span>{meta.duration}</span></div>
                      <p>{area.summary}</p>
                      <ul>{examples.map((item) => <li key={item.name}>{item.name}</li>)}</ul>
                      <div className="service-portal__actions">
                        <Link to={spacePath(area.id)}>Entrar al espacio <Arrow /></Link>
                        <Link to={bookingPath(area.id)}>Reservar <Arrow /></Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : null}
        </section>

        {resultFrames.length ? (
          <section className="home-results" aria-labelledby="home-results-title">
            <header>
              <div>
                <span>Resultados</span>
                <h2 id="home-results-title">Mira antes de elegir.</h2>
              </div>
              <div>
                <p>Una selección de trabajos de nuestros distintos espacios para ayudarte a encontrar una referencia antes de reservar.</p>
                <Link to="/style-book">Ver Style Book <Arrow /></Link>
              </div>
            </header>
            <div className="home-results__grid">
              {resultFrames.map((frame, index) => (
                <figure key={`${frame.label}-${index}`}>
                  <img src={frame.image} alt={frame.alt} loading="lazy" />
                  <figcaption>{frame.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className="home-value-bridge home-value-bridge--light" aria-labelledby="home-value-title">
          <header className="home-value-bridge__header">
            <span>Por qué Indian</span>
            <h2 id="home-value-title">Todo lo que necesitas para tu visita.</h2>
            <p>Todo pensado para que puedas elegir, llegar y reservar tu visita con facilidad.</p>
          </header>

          <div className="home-value-bridge__grid">
            <article>
              <strong>Todo en una visita</strong>
              <p>Barbería, nails, SPA y fotografía conviven en la misma casa.</p>
            </article>
            <article>
              <strong>Parqueo para clientes</strong>
              <p>Llega al centro de Loja sin tener que resolver el estacionamiento por tu cuenta.</p>
            </article>
            <article>
              <strong>Reserva directa</strong>
              <p>Elige servicio, profesional, fecha y horario dentro de un mismo flujo.</p>
            </article>
          </div>

          <div className="home-value-bridge__actions">
            <Link to="/reservar">Reservar una visita <Arrow /></Link>
            <a href={settings.mapHref} target="_blank" rel="noreferrer">Cómo llegar <Arrow /></a>
          </div>
        </section>

        <HomeGiftCards />

        <section className="home-guidance" aria-labelledby="home-guidance-title">
          <div>
            <span>Orientación</span>
            <h2 id="home-guidance-title">¿No sabes qué reservar?</h2>
            <p>Cuéntanos qué buscas y te ayudamos a elegir el área o servicio adecuado por WhatsApp.</p>
          </div>
          <div className="home-guidance__actions">
            <a href={settings.whatsappHref} target="_blank" rel="noreferrer">Preguntar por WhatsApp <Arrow /></a>
            <Link to="/servicios">Revisar servicios</Link>
          </div>
        </section>

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
