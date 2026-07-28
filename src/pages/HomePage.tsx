import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { bookingUrl, brand, contact, journalItems, promotions, services } from '../data/site';
import { visualMedia } from '../data/visualMedia';

const finderResults = {
  corte: {
    label: 'Corte',
    caption: 'Cabello',
    service: services[0],
    media: visualMedia.intent.cut,
  },
  barba: {
    label: 'Barba',
    caption: 'Perfilado y afeitado',
    service: services[1],
    media: visualMedia.intent.beard,
  },
  nails: {
    label: 'Nails',
    caption: 'Manos y pies',
    service: services[3],
    media: visualMedia.intent.nails,
  },
  tattoo: {
    label: 'Tattoo',
    caption: 'Diseño y cotización',
    service: services[4],
    media: visualMedia.intent.tattoo,
  },
} as const;

type FinderIntent = keyof typeof finderResults;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HomePage() {
  const [intent, setIntent] = useState<FinderIntent>('corte');
  const [activeService, setActiveService] = useState(0);
  const reduceMotion = useReducedMotion();
  const result = finderResults[intent];
  const currentService = services[activeService];
  const currentServiceMedia = visualMedia.services[activeService];

  return (
    <>
      <Seo
        title="Indian Club · Barbería, tattoo, nails y café"
        description="Indian Club reúne barbería, tattoo, nails y café en el centro de Loja. Conoce servicios, promociones, trabajos y reservas."
      />

      <div className="art-home art-home--flow-polish">
        <section className="film-hero" aria-labelledby="film-hero-title">
          <motion.div
            className="film-hero__media"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.035, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <ViewportVideo
              src={visualMedia.hero.barber.video}
              poster={visualMedia.hero.barber.poster}
              label="Barbería en Indian Club"
              priority
            />
            <div className="film-hero__veil" />
          </motion.div>

          <div className="film-hero__content">
            <div className="film-hero__identity">
              <img src={brand.logoLockup} alt="Indian Club" />
              <div>
                <span>Loja · Ecuador</span>
                <span>Desde 2018</span>
              </div>
            </div>

            <div className="film-hero__statement">
              <h1 id="film-hero-title">Barbería, tattoo, nails y café.</h1>
              <p>Cortes, barba y acabado con precisión.</p>
              <div className="film-hero__actions">
                <a href={bookingUrl} target="_blank" rel="noreferrer">Reservar cita <Arrow /></a>
                <Link to="/style-book">Ver trabajos</Link>
              </div>
            </div>
          </div>
        </section>

        <div className="brand-ticker" aria-hidden="true">
          <motion.div
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          >
            <span>INDIAN CLUB</span><i>BARBERÍA</i><span>TATTOO</span><i>NAILS</i><span>CAFÉ</span>
            <span>INDIAN CLUB</span><i>BARBERÍA</i><span>TATTOO</span><i>NAILS</i><span>CAFÉ</span>
          </motion.div>
        </div>

        <section className="intent-canvas intent-canvas--direct" aria-labelledby="intent-title">
          <div className="intent-canvas__media">
            <AnimatePresence mode="wait">
              <motion.div
                key={intent}
                initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 0 12% 0)', scale: 1.025 }}
                animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)', scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, clipPath: 'inset(12% 0 0 0)' }}
                transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              >
                <ViewportVideo
                  src={result.media.video}
                  poster={result.media.poster}
                  label={`${result.label} en Indian Club`}
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                className="intent-canvas__result intent-canvas__result--simple"
                key={result.service.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.34 }}
              >
                <small>{result.caption}</small>
                <h3>{result.service.title}</h3>
                <Link to={`/servicios/${result.service.slug}`}>Ver servicio <Arrow /></Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="intent-canvas__choices intent-canvas__choices--direct">
            <span>Encuentra tu servicio</span>
            <h2 id="intent-title">¿Qué buscas hoy?</h2>
            <div role="group" aria-label="Selecciona un servicio">
              {(Object.keys(finderResults) as FinderIntent[]).map((key) => (
                <button
                  type="button"
                  key={key}
                  aria-pressed={intent === key}
                  className={intent === key ? 'is-active' : undefined}
                  onClick={() => setIntent(key)}
                  onMouseEnter={() => setIntent(key)}
                  onFocus={() => setIntent(key)}
                >
                  <strong>{finderResults[key].label}</strong>
                  <small>{finderResults[key].caption}</small>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="service-stage" aria-labelledby="service-stage-title">
          <div className="service-stage__sticky">
            <AnimatePresence mode="wait">
              <motion.div
                className="service-stage__visual"
                key={currentService.slug}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.025, x: -14 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, x: 14 }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
              >
                <ViewportVideo
                  src={currentServiceMedia.video}
                  poster={currentServiceMedia.poster}
                  label={currentService.title}
                />
                <div>
                  <span>{currentService.kicker}</span>
                  <h3>{currentService.title}</h3>
                  <p>{currentService.detail}</p>
                  <Link to={`/servicios/${currentService.slug}`}>Conocer el servicio <Arrow /></Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="service-stage__list">
            <header>
              <span>Servicios</span>
              <h2 id="service-stage-title">Todo lo que puedes hacer en Indian.</h2>
            </header>
            {services.map((service, index) => (
              <Link
                to={`/servicios/${service.slug}`}
                key={service.slug}
                className={activeService === index ? 'is-active' : undefined}
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
              >
                <div><strong>{service.title}</strong><span>{service.kicker}</span></div>
                <div><small>{service.duration}</small><small>{service.price}</small></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="club-film" aria-labelledby="club-film-title">
          <ViewportVideo
            src={visualMedia.clubFeature.video}
            poster={visualMedia.clubFeature.poster}
            label="Ambiente social de café y club"
          />
          <div className="club-film__veil" />
          <div className="club-film__copy">
            <img src={brand.logoMark} alt="" />
            <span>El Club</span>
            <h2 id="club-film-title">Tu cita también puede sentirse como una pausa.</h2>
            <p>Café, parqueo exclusivo y un espacio pensado para llegar sin apuro.</p>
            <Link to="/club">Conocer el lugar <Arrow /></Link>
          </div>
        </section>

        <section className="promotion-ledger promotion-ledger--beam" aria-labelledby="promotion-ledger-title">
          <header>
            <span>Promociones</span>
            <h2 id="promotion-ledger-title">Beneficios vigentes en Indian Club.</h2>
            <p>Confirma disponibilidad y condiciones directamente con el centro.</p>
          </header>
          <div>
            {promotions.map((promotion) => (
              <a href={bookingUrl} target="_blank" rel="noreferrer" key={promotion.title}>
                <small>{promotion.eyebrow}</small>
                <strong>{promotion.title}</strong>
                <p>{promotion.note}</p>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className="journal-scene" aria-labelledby="journal-scene-title">
          <div className="journal-scene__lead">
            <img src={visualMedia.journal.poster} alt="Ambiente profesional de barbería" loading="lazy" />
            <div>
              <span>Inspírate</span>
              <h2 id="journal-scene-title">Consejos que siguen funcionando después de la cita.</h2>
              <Link to={`/inspirate/${journalItems[0].slug}`}>{journalItems[0].title} <Arrow /></Link>
            </div>
          </div>
          <div className="journal-scene__links">
            {journalItems.slice(1).map((item) => (
              <Link to={`/inspirate/${item.slug}`} key={item.slug}>
                <small>{item.type}</small>
                <strong>{item.title}</strong>
                <Arrow />
              </Link>
            ))}
          </div>
        </section>

        <section className="visit-terminal" aria-labelledby="visit-terminal-title">
          <div>
            <span>Visítanos</span>
            <h2 id="visit-terminal-title">Indian Club está en el centro de Loja.</h2>
            <address>{contact.address}<br />{contact.city}</address>
            <a href={contact.mapHref} target="_blank" rel="noreferrer">Abrir mapa <Arrow /></a>
          </div>
          <div>
            {contact.hours.map((item) => (
              <p key={item.days}><span>{item.days}</span><strong>{item.value}</strong></p>
            ))}
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp {contact.whatsapp}</a>
          </div>
          <div>
            <h3>Elige servicio, profesional y horario.</h3>
            <a href={bookingUrl} target="_blank" rel="noreferrer">Reservar ahora <Arrow /></a>
          </div>
        </section>
      </div>
    </>
  );
}
