import { useRef, useState } from 'react';
import {
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

type FinderIntent = keyof typeof finderResults;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function HomePage() {
  const [intent, setIntent] = useState<FinderIntent>('mantener');
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const result = finderResults[intent];
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, reduceMotion ? 1 : 1.12]);
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const logoRotate = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 16]);
  const logoY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : -70]);

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Seo
        title="Indian Club · Barbería, estética, tattoo y café"
        description="Indian Club es barbería, nails, tattoo studio y cafetería en Loja. Una marca con más de siete años de experiencia y una identidad propia."
      />

      <div className="final-home final-home--brand">
        <section className="brand-hero" ref={heroRef} aria-labelledby="brand-hero-title">
          <div className="brand-hero__media">
            <motion.img
              src={media.hero}
              alt="Cliente atendido dentro de Indian Club en Loja"
              loading="eager"
              fetchPriority="high"
              style={{ scale: heroScale }}
            />
            <div className="brand-hero__veil" />
          </div>

          <motion.div className="brand-hero__copy" style={{ y: heroCopyY }}>
            <motion.p
              className="brand-hero__eyebrow"
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Loja · Ecuador · Desde 2018
            </motion.p>
            <motion.h1
              id="brand-hero-title"
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              Indian no es un nombre decorativo.
              <em>Es la identidad de la casa.</em>
            </motion.h1>
            <motion.p
              className="brand-hero__lead"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.34 }}
            >
              Barbería, nails, tattoo y café reunidos alrededor de una marca reconocible: el indio, el rojo, el azul y una forma propia de recibir.
            </motion.p>
            <motion.div
              className="final-actions"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48 }}
            >
              <a className="final-button final-button--brand" href={bookingUrl} target="_blank" rel="noreferrer">
                Reservar en Indian <Arrow />
              </a>
              <Link className="final-link final-link--brand" to="/style-book">Ver trabajos reales</Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="brand-hero__emblem"
            style={{ rotate: logoRotate, y: logoY }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="brand-hero__orbit" aria-hidden="true" />
            <img src={brand.logoMark} alt="Símbolo del indio de Indian Club" />
            <span>IDENTIDAD / 01</span>
          </motion.div>

          <div className="brand-hero__proof" aria-label="Datos de Indian Club">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="brand-marquee" aria-hidden="true">
          <motion.div
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          >
            <span>INDIAN CLUB</span><i>◆</i><span>BARBERÍA</span><i>◆</i><span>NAILS</span><i>◆</i><span>TATTOO</span><i>◆</i><span>CAFÉ</span><i>◆</i>
            <span>INDIAN CLUB</span><i>◆</i><span>BARBERÍA</span><i>◆</i><span>NAILS</span><i>◆</i><span>TATTOO</span><i>◆</i><span>CAFÉ</span><i>◆</i>
          </motion.div>
        </div>

        <section className="brand-origin" aria-labelledby="brand-origin-title">
          <div className="brand-origin__sticky">
            <span>01 / La marca</span>
            <motion.img
              src={brand.logoMark}
              alt="Logotipo histórico de Indian Club"
              whileInView={reduceMotion ? undefined : { rotate: [0, -2, 2, 0], scale: [0.96, 1.02, 1] }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <h2 id="brand-origin-title">El indio se mantiene. La experiencia evoluciona.</h2>
            <p>{brand.campaign} funciona como concepto de campaña, pero Indian Club sigue siendo la marca principal.</p>
          </div>

          <div className="brand-origin__chapters">
            <motion.article
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
            >
              <div className="brand-origin__photo brand-origin__photo--barber">
                <img src={media.barber} alt="Corte realizado dentro de Indian Club" loading="lazy" />
                <span>TRABAJO REAL / 01</span>
              </div>
              <div>
                <small>El oficio</small>
                <h3>La marca vive en el resultado, no solo en el logo.</h3>
                <p>Los cortes del Style Book y las fotografías del equipo conectan la nueva web con la experiencia que ya existe en Loja.</p>
              </div>
            </motion.article>

            <motion.article
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
            >
              <div className="brand-origin__photo brand-origin__photo--tattoo">
                <img src={media.tattoo} alt="Tatuaje realizado por Indian Club Tattoo Studio" loading="lazy" />
                <span>TRAZO REAL / 02</span>
              </div>
              <div>
                <small>La expresión</small>
                <h3>Barbería, tattoo y nails hablan con voces distintas dentro de la misma casa.</h3>
                <p>El rojo y el azul aparecen como pulsos de identidad. El negro sigue dando profundidad y el dorado queda como acento premium.</p>
              </div>
            </motion.article>

            <motion.article
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
            >
              <div className="brand-origin__photo brand-origin__photo--nails">
                <img src={media.nails} alt="Diseño de uñas realizado por Indian Club Nails Studio" loading="lazy" />
                <span>DETALLE REAL / 03</span>
              </div>
              <div>
                <small>El detalle</small>
                <h3>La personalidad se construye con contraste, color y movimiento.</h3>
                <p>Las transiciones, el emblema animado y la fotografía propia evitan que la web parezca una plantilla intercambiable.</p>
              </div>
            </motion.article>
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
              <span>03 / El oficio</span>
              <h2 id="service-reel-title">Seis maneras de entrar a Indian.</h2>
            </div>
            <p>Trabajos y categorías reales de la casa, con intención, tiempo y precio de referencia antes de llegar a la agenda.</p>
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
            <span>04 / Style Book real</span>
            <h2 id="official-stylebook-title">La web deja de imaginar Indian y empieza a mostrarlo.</h2>
            <p>Estas imágenes provienen del Style Book publicado por la marca. La producción final podrá ampliar el archivo sin perder este lenguaje.</p>
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
            <img src={media.cafe} alt="Cafetería de ambiente cálido y oscuro" loading="lazy" />
          </div>
          <div className="house-scene__copy">
            <span>05 / La casa</span>
            <h2 id="house-scene-title">Llegar antes también forma parte de la visita.</h2>
            <p>La cafetería convierte la espera en pausa. El parqueo exclusivo reduce fricción. La conversación y el espacio sostienen el ritmo del servicio.</p>
            <div className="house-scene__facts">
              <div><strong>Café</strong><span>Antes o después de tu cita</span></div>
              <div><strong>Parqueo</strong><span>Exclusivo para clientes</span></div>
              <div><strong>Centro de Loja</strong><span>24 de Mayo y José Antonio Eguiguren</span></div>
            </div>
            <Link className="final-link final-link--brand" to="/club">Entrar a la casa</Link>
          </div>
        </section>

        <section className="craft-sequence" aria-labelledby="craft-sequence-title">
          <header>
            <span>06 / El recorrido</span>
            <h2 id="craft-sequence-title">Una secuencia con ritmo, oficio y memoria.</h2>
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
