import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import {
  bookingUrl,
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

type FinderIntent = keyof typeof finderResults;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HomePage() {
  const [intent, setIntent] = useState<FinderIntent>('mantener');
  const reduceMotion = useReducedMotion();
  const result = finderResults[intent];

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Seo
        title="House of Presence"
        description="Indian Club es barbería, nails, tattoo studio y cafetería en Loja. Una casa de oficio, cuidado y presencia con reservas online."
      />

      <div className="final-home">
        <section className="final-hero" aria-labelledby="final-hero-title">
          <div className="final-hero__media">
            <img
              src={media.hero}
              alt="Barbero trabajando un corte con precisión dentro de una atmósfera oscura"
              loading="eager"
              fetchPriority="high"
            />
            <div className="final-hero__veil" />
          </div>

          <motion.div
            className="final-hero__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="final-hero__meta">
              <span>Loja · Ecuador</span>
              <span>Barbería · Nails · Tattoo · Café</span>
            </div>
            <p className="final-kicker">Indian Club / House of Presence</p>
            <h1 id="final-hero-title">
              Tu presencia no se improvisa.
              <em>Se construye.</em>
            </h1>
            <p className="final-hero__lead">
              Un lugar para resolver tu imagen con oficio, cuidar los detalles y bajar el ritmo antes de volver a salir.
            </p>
            <div className="final-actions">
              <a className="final-button" href={bookingUrl} target="_blank" rel="noreferrer">
                Reservar mi ritual <Arrow />
              </a>
              <Link className="final-link" to="/servicios">Encontrar mi servicio</Link>
            </div>
          </motion.div>

          <div className="final-hero__proof" aria-label="Datos de Indian Club">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="final-hero__chapter" aria-hidden="true">
            <span>HOUSE</span>
            <i>01</i>
          </div>
        </section>

        <section className="final-thesis" aria-labelledby="final-thesis-title">
          <div className="final-thesis__rail">
            <span>01</span>
            <small>La idea</small>
          </div>
          <motion.div
            className="final-thesis__statement"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75 }}
          >
            <p className="final-kicker">No es una barbería con cosas alrededor</p>
            <h2 id="final-thesis-title">
              Es una casa donde el cuidado, el arte y la hospitalidad siguen la misma intención.
            </h2>
          </motion.div>
          <div className="final-thesis__note">
            <p>
              Indian Club reúne barbería y peluquería, nails, tattoo studio, servicios especiales y cafetería bajo un mismo estándar de atención.
            </p>
            <Link to="/club">Conocer la casa <Arrow /></Link>
          </div>
        </section>

        <section className="ritual-finder" aria-labelledby="ritual-finder-title">
          <div className="ritual-finder__intro">
            <span>02 / Orientación</span>
            <h2 id="ritual-finder-title">¿Qué necesitas hoy?</h2>
            <p>No hace falta memorizar el catálogo. Empieza por la intención y nosotros te mostramos una ruta clara.</p>
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
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
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
              <span>03 / El oficio</span>
              <h2 id="service-reel-title">Seis maneras de entrar a Indian.</h2>
            </div>
            <p>La imagen atrae. La información decide. Por eso cada ritual muestra intención, tiempo y precio de referencia antes de llevarte a la agenda.</p>
          </header>

          <div className="service-reel__list">
            {services.map((service) => (
              <Link className="service-reel__item" to={`/servicios/${service.slug}`} key={service.slug}>
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
            ))}
          </div>
        </section>

        <section className="house-scene" aria-labelledby="house-scene-title">
          <div className="house-scene__media">
            <img src={media.cafe} alt="Cafetería de ambiente cálido y oscuro" loading="lazy" />
          </div>
          <div className="house-scene__copy">
            <span>04 / La casa</span>
            <h2 id="house-scene-title">Llegar antes también forma parte de la visita.</h2>
            <p>
              La cafetería convierte la espera en pausa. El parqueo exclusivo reduce fricción. La conversación y el espacio sostienen el ritmo del servicio.
            </p>
            <div className="house-scene__facts">
              <div><strong>Café</strong><span>Antes o después de tu cita</span></div>
              <div><strong>Parqueo</strong><span>Exclusivo para clientes</span></div>
              <div><strong>Centro de Loja</strong><span>24 de Mayo y José Antonio Eguiguren</span></div>
            </div>
            <Link className="final-link" to="/club">Entrar a la casa</Link>
          </div>
        </section>

        <section className="craft-sequence" aria-labelledby="craft-sequence-title">
          <header>
            <span>05 / El recorrido</span>
            <h2 id="craft-sequence-title">Una secuencia que no necesita espectáculo para sentirse especial.</h2>
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

        <section className="style-book-preview" aria-labelledby="style-book-title">
          <div className="style-book-preview__copy">
            <span>06 / Style Book</span>
            <h2 id="style-book-title">El trabajo habla cuando la edición sabe guardar silencio.</h2>
            <p>Una selección visual de barbería, tattoo, detalles y atmósfera. No es una galería para llenar espacio: es evidencia del lenguaje de la casa.</p>
            <Link className="final-link" to="/style-book">Abrir Style Book</Link>
          </div>
          <div className="style-book-preview__grid" aria-label="Muestra visual de Indian Club">
            <figure className="style-book-preview__a"><img src={media.barber} alt="Detalle de trabajo de barbería" loading="lazy" /><figcaption>OFICIO / 01</figcaption></figure>
            <figure className="style-book-preview__b"><img src={media.tattoo} alt="Artista trabajando una pieza de tattoo" loading="lazy" /><figcaption>TRAZO / 02</figcaption></figure>
            <figure className="style-book-preview__c"><img src={media.exterior} alt="Espacio de cuidado personal visto de noche" loading="lazy" /><figcaption>CASA / 03</figcaption></figure>
          </div>
        </section>

        <section className="promotion-ledger" aria-labelledby="promotion-ledger-title">
          <header>
            <span>07 / Ahora en Indian</span>
            <h2 id="promotion-ledger-title">Promociones con condiciones claras.</h2>
            <p>Sin popups, contadores falsos ni urgencia inventada. Revisa la opción y confirma directamente con el centro.</p>
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
            <span>08 / House Notes</span>
            <h2 id="house-notes-title">Contenido para decidir mejor y mantener lo que eliges.</h2>
          </header>
          <div className="house-notes__lead">
            <img src={journalItems[0].image} alt="Trabajo detallado de barbería" loading="lazy" />
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
            <span>09 / Llegar</span>
            <h2 id="final-visit-title">Tu cita tiene un lugar, un horario y una salida clara.</h2>
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
            <span>AgendaPro / Fase 1</span>
            <h3>Elige servicio, profesional y horario.</h3>
            <p>La reserva continúa en el sistema actual para no interrumpir la operación de Indian Club.</p>
            <a className="final-button final-button--dark" href={bookingUrl} target="_blank" rel="noreferrer">
              Reservar ahora <Arrow />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
