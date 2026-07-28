import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import {
  bookingUrl,
  brand,
  contact,
  journalItems,
  media,
  promotions,
  ritualSteps,
  services,
  stats,
} from '../data/site';

const finderResults = {
  mantener: {
    label: 'Mantener lo que ya funciona',
    service: services[0],
    reason: 'Una lectura breve de forma y crecimiento para recuperar estructura sin cambiar tu lenguaje.',
  },
  cambiar: {
    label: 'Cambiar con criterio',
    service: services[2],
    reason: 'Una sesión más completa para revisar proporción, barba, textura y el nivel real de transformación.',
  },
  preparar: {
    label: 'Prepararme para algo importante',
    service: services[2],
    reason: 'El ritual completo resuelve el conjunto y deja margen para ajustar cada detalle antes de salir.',
  },
  expresar: {
    label: 'Expresar algo propio',
    service: services[4],
    reason: 'Una conversación creativa antes de tomar una decisión permanente o construir una pieza con intención.',
  },
} as const;

const heroScenes = [
  {
    label: 'Barbería',
    number: '01',
    image: media.barber,
    alt: 'Corte realizado dentro de Indian Club en Loja',
    to: '/servicios/corte-de-autor',
    detail: 'Corte, barba y acabado con lectura de forma, textura y rutina.',
    accent: 'blue',
  },
  {
    label: 'Tattoo',
    number: '02',
    image: media.tattoo,
    alt: 'Tatuaje realizado por Indian Club Tattoo Studio',
    to: '/servicios/tattoo-studio',
    detail: 'Diseño, conversación y ejecución para piezas con intención propia.',
    accent: 'red',
  },
  {
    label: 'Nails',
    number: '03',
    image: media.nails,
    alt: 'Diseño de uñas realizado por Indian Club Nails Studio',
    to: '/servicios/nails-studio',
    detail: 'Manos y pies trabajados con técnica, higiene y detalle.',
    accent: 'blue',
  },
  {
    label: 'El Club',
    number: '04',
    image: media.parking,
    alt: 'Espacio de Indian Club en Loja',
    to: '/club',
    detail: 'Café, parqueo y una casa pensada para disfrutar la visita completa.',
    accent: 'red',
  },
] as const;

type FinderIntent = keyof typeof finderResults;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HomePage() {
  const [intent, setIntent] = useState<FinderIntent>('mantener');
  const [activeScene, setActiveScene] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const result = finderResults[intent];
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const stageScale = useTransform(heroProgress, [0, 1], [1, reduceMotion ? 1 : 0.965]);
  const brandY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : -54]);
  const brandOpacity = useTransform(heroProgress, [0, 0.72, 1], [1, 0.96, 0]);

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Seo
        title="Indian Club · Barbería, estética, tattoo y café"
        description="Indian Club es barbería, nails, tattoo studio y cafetería en Loja. Reserva online y conoce sus trabajos, servicios, promociones y equipo."
      />

      <div className="final-home final-home--brand final-home--immersive">
        <section className="immersive-hero" ref={heroRef} aria-label="Experiencias de Indian Club">
          <motion.div className="immersive-hero__stage" style={{ scale: stageScale }}>
            {heroScenes.map((scene, index) => {
              const active = activeScene === index;

              return (
                <motion.article
                  className={`immersive-hero__panel immersive-hero__panel--${scene.accent}${active ? ' is-active' : ''}`}
                  key={scene.label}
                  animate={{ flexGrow: active ? 3.8 : 1 }}
                  initial={reduceMotion ? false : { clipPath: 'inset(100% 0 0 0)' }}
                  whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                  viewport={{ once: true }}
                  transition={{
                    flexGrow: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
                    clipPath: { duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] },
                  }}
                  onMouseEnter={() => setActiveScene(index)}
                  onFocus={() => setActiveScene(index)}
                >
                  <Link to={scene.to} aria-label={`${scene.label}: ${scene.detail}`}>
                    <motion.img
                      src={scene.image}
                      alt={scene.alt}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : undefined}
                      animate={{ scale: active ? 1.015 : 1.09 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span className="immersive-hero__wash" aria-hidden="true" />
                    <span className="immersive-hero__number">{scene.number}</span>
                    <div className="immersive-hero__label">
                      <small>Indian Club</small>
                      <strong>{scene.label}</strong>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>

          <motion.div className="immersive-hero__brand" style={{ y: brandY, opacity: brandOpacity }}>
            <img src={brand.logoLockup} alt="Indian Club" />
            <div className="immersive-hero__brand-meta">
              <span>Loja · Ecuador</span>
              <span>Desde 2018</span>
            </div>
          </motion.div>

          <div className="immersive-hero__active-copy" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroScenes[activeScene].label}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.32 }}
              >
                <span>{heroScenes[activeScene].number} / 04</span>
                <p>{heroScenes[activeScene].detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="immersive-hero__actions">
            <a className="final-button final-button--brand immersive-hero__booking" href={bookingUrl} target="_blank" rel="noreferrer">
              Reservar <Arrow />
            </a>
            <Link className="immersive-hero__discover" to="/style-book">Ver trabajos reales</Link>
          </div>

          <div className="immersive-hero__proof" aria-label="Datos de Indian Club">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <span className="immersive-hero__scroll" aria-hidden="true">Desliza para explorar</span>
        </section>

        <section className="ritual-finder" aria-labelledby="ritual-finder-title">
          <div className="ritual-finder__intro">
            <span>01 / Orientación</span>
            <h2 id="ritual-finder-title">¿Qué necesitas hoy?</h2>
            <p>Empieza por la intención y encuentra una ruta clara entre los servicios de Indian Club.</p>
          </div>

          <div className="ritual-finder__choices" role="group" aria-label="Selecciona tu intención">
            {(Object.keys(finderResults) as FinderIntent[]).map((key, index) => (
              <button
                key={key}
                type="button"
                aria-pressed={intent === key}
                className={intent === key ? 'is-active' : undefined}
                onClick={() => setIntent(key)}
              >
                <span>0{index + 1}</span>
                {finderResults[key].label}
              </button>
            ))}
          </div>

          <motion.div
            className="ritual-finder__result"
            key={intent}
            initial={reduceMotion ? false : { opacity: 0, y: 18, clipPath: 'inset(0 0 12% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ritual-finder__result-media">
              <img src={result.service.image} alt={result.service.imageAlt} loading="lazy" />
              <span>{result.service.number}</span>
            </div>
            <div>
              <small>Ruta sugerida</small>
              <h3>{result.service.title}</h3>
              <p>{result.reason}</p>
              <dl>
                <div><dt>Tiempo</dt><dd>{result.service.duration}</dd></div>
                <div><dt>Referencia</dt><dd>{result.service.price}</dd></div>
              </dl>
              <div className="ritual-finder__result-actions">
                <Link to={`/servicios/${result.service.slug}`}>Conocer el ritual <Arrow /></Link>
                <a href={bookingUrl} target="_blank" rel="noreferrer">Ver disponibilidad</a>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="service-reel" aria-labelledby="service-reel-title">
          <header className="service-reel__header">
            <div>
              <span>02 / Servicios</span>
              <h2 id="service-reel-title">Todo lo que puedes vivir en Indian.</h2>
            </div>
            <p>Conoce cada servicio, su duración y precio de referencia antes de pasar a la agenda.</p>
          </header>

          <div className="service-reel__list">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={reduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? -28 : 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link className="service-reel__item" to={`/servicios/${service.slug}`}>
                  <span className="service-reel__number">{service.number}</span>
                  <div className="service-reel__image">
                    <img src={service.image} alt="" loading="lazy" />
                  </div>
                  <div className="service-reel__copy">
                    <small>{service.kicker}</small>
                    <h3>{service.title}</h3>
                    <p>{service.detail}</p>
                  </div>
                  <div className="service-reel__meta">
                    <span>{service.duration}</span>
                    <strong>{service.price}</strong>
                    <i aria-hidden="true">↗</i>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="official-stylebook" aria-labelledby="official-stylebook-title">
          <div className="official-stylebook__heading">
            <span>03 / Style Book</span>
            <h2 id="official-stylebook-title">Cortes, trazos y detalles hechos en Indian Club.</h2>
            <p>Una selección del trabajo publicado por barbería, tattoo y nails en Loja.</p>
            <Link className="final-link final-link--brand" to="/style-book">Abrir galería completa</Link>
          </div>
          <div className="official-stylebook__track">
            {[media.barber, media.barberAlt, media.tattoo, media.nails].map((image, index) => (
              <motion.figure
                key={image}
                initial={reduceMotion ? false : { opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduceMotion ? undefined : { y: -12 }}
              >
                <img src={image} alt="Trabajo publicado por Indian Club" loading="lazy" />
                <figcaption>INDIAN / 0{index + 1}</figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <section className="house-scene" aria-labelledby="house-scene-title">
          <div className="house-scene__media">
            <img src={media.parking} alt="Espacio de Indian Club en Loja" loading="lazy" />
          </div>
          <div className="house-scene__copy">
            <span>04 / El Club</span>
            <h2 id="house-scene-title">Una visita completa, desde que llegas.</h2>
            <p>La cafetería acompaña la pausa, el parqueo facilita la llegada y cada área mantiene el mismo nivel de cuidado.</p>
            <div className="house-scene__facts">
              <div><strong>Café</strong><span>Antes o después de tu cita</span></div>
              <div><strong>Parqueo</strong><span>Exclusivo para clientes</span></div>
              <div><strong>Centro de Loja</strong><span>24 de Mayo y José Antonio Eguiguren</span></div>
            </div>
            <Link className="final-link final-link--brand" to="/club">Conocer el club</Link>
          </div>
        </section>

        <section className="craft-sequence" aria-labelledby="craft-sequence-title">
          <header>
            <span>05 / La experiencia</span>
            <h2 id="craft-sequence-title">Escuchar, crear, cuidar y volver.</h2>
          </header>
          <div className="craft-sequence__line" aria-hidden="true" />
          <div className="craft-sequence__steps">
            {ritualSteps.map(([title, detail], index) => (
              <motion.article
                key={title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="promotion-ledger" aria-labelledby="promotion-ledger-title">
          <header>
            <span>06 / Promociones</span>
            <h2 id="promotion-ledger-title">Beneficios vigentes en Indian Club.</h2>
            <p>Revisa la promoción y confirma disponibilidad directamente con el centro.</p>
          </header>
          <div>
            {promotions.map((promotion, index) => (
              <a href={bookingUrl} target="_blank" rel="noreferrer" key={promotion.title}>
                <span>0{index + 1}</span>
                <small>{promotion.eyebrow}</small>
                <strong>{promotion.title}</strong>
                <p>{promotion.note}</p>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className="house-notes" aria-labelledby="house-notes-title">
          <header>
            <span>07 / Inspírate</span>
            <h2 id="house-notes-title">Ideas para elegir, cuidar y mantener tu estilo.</h2>
          </header>
          <div className="house-notes__lead">
            <img src={journalItems[0].image} alt="Trabajo detallado de barbería realizado en Indian Club" loading="lazy" />
            <div>
              <small>{journalItems[0].type} · {journalItems[0].number}</small>
              <h3>{journalItems[0].title}</h3>
              <p>{journalItems[0].excerpt}</p>
              <Link to={`/inspirate/${journalItems[0].slug}`}>Leer nota <Arrow /></Link>
            </div>
          </div>
          <div className="house-notes__index">
            {journalItems.slice(1).map((item) => (
              <Link to={`/inspirate/${item.slug}`} key={item.slug}>
                <span>{item.number}</span>
                <small>{item.type}</small>
                <strong>{item.title}</strong>
                <i aria-hidden="true">↗</i>
              </Link>
            ))}
          </div>
        </section>

        <section className="final-visit" aria-labelledby="final-visit-title">
          <div className="final-visit__address">
            <span>08 / Visítanos</span>
            <h2 id="final-visit-title">Indian Club está en el centro de Loja.</h2>
            <address>
              <strong>{contact.address}</strong>
              <span>{contact.city}</span>
            </address>
            <a href={contact.mapHref} target="_blank" rel="noreferrer">Abrir mapa <Arrow /></a>
          </div>

          <div className="final-visit__hours">
            {contact.hours.map((item) => (
              <div key={item.days}><span>{item.days}</span><strong>{item.value}</strong></div>
            ))}
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp {contact.whatsapp}</a>
            <a href={contact.emailHref}>{contact.email}</a>
          </div>

          <div className="final-visit__booking">
            <span>Reservas online</span>
            <h3>Elige servicio, profesional y horario.</h3>
            <p>Consulta la disponibilidad y confirma tu cita en AgendaPro.</p>
            <a className="final-button final-button--dark" href={bookingUrl} target="_blank" rel="noreferrer">
              Reservar ahora <Arrow />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
