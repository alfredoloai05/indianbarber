import { type CSSProperties, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const bookingUrl = 'https://indianclubec.com';

const navItems = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'La casa', href: '#casa' },
  { label: 'Ritual', href: '#ritual' },
  { label: 'Inspírate', href: '#inspirate' },
];

const services = [
  {
    number: '01',
    title: 'Corte de autor',
    kicker: 'Arquitectura, textura y caída.',
    detail:
      'Una lectura completa de rostro, cabello y rutina para construir una forma que siga funcionando cuando salgas de la silla.',
    duration: '45–60 min',
    signature: 'Precisión visible',
  },
  {
    number: '02',
    title: 'Barba ritual',
    kicker: 'Contorno, vapor y cuidado.',
    detail:
      'Definición sin rigidez, preparación de piel y acabados pensados para que la presencia se sostenga, no solo para la fotografía.',
    duration: '35–45 min',
    signature: 'Detalle sereno',
  },
  {
    number: '03',
    title: 'Signature combo',
    kicker: 'Una sesión. Una lectura completa.',
    detail:
      'Corte y barba trabajados como un único sistema visual, con tiempo suficiente para conversar, ajustar y cerrar cada decisión.',
    duration: '80–95 min',
    signature: 'Ritual completo',
  },
  {
    number: '04',
    title: 'Tattoo & Nails',
    kicker: 'Expresión dentro de la casa.',
    detail:
      'Servicios de expresión personal conectados por el mismo estándar: criterio, higiene, escucha y una estética que no busca copiar a nadie.',
    duration: 'Según sesión',
    signature: 'Lenguaje propio',
  },
];

const ritualSteps = [
  ['Escuchar', 'Antes de tocar una herramienta, entendemos contexto, rutina y lo que necesitas comunicar.'],
  ['Construir', 'Técnica, proporción y detalle convierten la intención en una forma precisa.'],
  ['Cerrar', 'Revisamos, afinamos y dejamos claro cómo sostener el resultado fuera de Indian.'],
  ['Volver', 'La relación continúa con memoria, recomendación y un próximo momento sin fricción.'],
];

const journalItems = [
  ['01', 'Guía', 'Cómo elegir un corte que funcione también dentro de tres semanas'],
  ['02', 'Oficio', 'Lo que un buen diagnóstico revela antes del primer corte'],
  ['03', 'Casa', 'Café, conversación y el valor de bajar el ritmo'],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const portraitY = useTransform(scrollYProgress, [0, 0.3], [0, reduceMotion ? 0 : 88]);
  const active = services[activeService];

  const reveal = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Indian Club, inicio">
          <span className="brand__name">INDIAN CLUB</span>
          <span className="brand__claim">House of Presence</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="button button--compact" href={bookingUrl} target="_blank" rel="noreferrer">
            Reservar
          </a>
          <button
            className="menu-trigger"
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <div className="menu-overlay__index">IC / 2026</div>
            <nav aria-label="Navegación móvil">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <a className="menu-overlay__booking" href={bookingUrl} target="_blank" rel="noreferrer">
              Reservar una cita <Arrow />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="hero" id="inicio">
          <div className="hero__rail" aria-hidden="true">
            <span>01</span>
            <i />
            <span>05</span>
          </div>

          <motion.div
            className="hero__content"
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">House of Presence · Loja, Ecuador</p>
            <h1>
              Presencia,
              <em>hecha ritual.</em>
            </h1>
            <p className="hero__lead">
              Grooming, arte y café para personas que no buscan parecerse a alguien más, sino llegar con intención.
            </p>
            <div className="hero__actions">
              <a className="button" href={bookingUrl} target="_blank" rel="noreferrer">
                Reservar una cita <Arrow />
              </a>
              <a className="text-link" href="#servicios">
                Explorar la casa
              </a>
            </div>
            <div className="hero__proof" aria-label="Principios de Indian Club">
              <span><b>01</b> Oficio</span>
              <span><b>02</b> Presencia</span>
              <span><b>03</b> Comunidad</span>
            </div>
          </motion.div>

          <motion.div className="hero__stage" style={{ y: portraitY }}>
            <div
              className="hero__portrait"
              role="img"
              aria-label="Sesión editorial de grooming dentro de Indian Club"
            >
              <div className="hero__stage-copy">
                <span>Est. Loja</span>
                <span>House / 01</span>
              </div>
              <div className="hero__monogram" aria-hidden="true">IC</div>
              <div className="hero__film">
                <span className="hero__film-icon">▶</span>
                <span>Ver la casa<br /><small>00:42</small></span>
              </div>
            </div>
          </motion.div>

          <div className="hero__side-note">Grooming · Arte · Café · Cultura</div>
        </section>

        <div className="statement-ticker" aria-hidden="true">
          <div>
            <span>NO ES SOLO UN CORTE.</span>
            <i>◆</i>
            <span>ES TU PRESENCIA.</span>
            <i>◆</i>
            <span>NO ES SOLO UN CORTE.</span>
            <i>◆</i>
            <span>ES TU PRESENCIA.</span>
          </div>
        </div>

        <section className="service-atlas" id="servicios">
          <motion.div
            className="service-atlas__intro"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow">El oficio</p>
            <h2>Servicios que no empiezan con una máquina.</h2>
            <p>
              Empiezan observando. La forma, el tiempo disponible, tu rutina y la presencia que necesitas construir.
            </p>
            <a className="text-link" href={bookingUrl} target="_blank" rel="noreferrer">
              Ver disponibilidad
            </a>
          </motion.div>

          <div className="service-atlas__body">
            <div className="service-list" role="list" aria-label="Servicios de Indian Club">
              {services.map((service, index) => (
                <button
                  className={`service-row ${activeService === index ? 'is-active' : ''}`}
                  key={service.number}
                  type="button"
                  role="listitem"
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                >
                  <span className="service-row__number">{service.number}</span>
                  <span className="service-row__title">{service.title}</span>
                  <span className="service-row__duration">{service.duration}</span>
                  <span className="service-row__arrow">↗</span>
                </button>
              ))}
            </div>

            <div className="service-preview" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.number}
                  className={`service-preview__surface service-preview__surface--${activeService + 1}`}
                  initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="service-preview__index">{active.number}</span>
                  <div className="service-preview__orbit" aria-hidden="true" />
                  <div className="service-preview__content">
                    <p>{active.kicker}</p>
                    <h3>{active.signature}</h3>
                    <span>{active.detail}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="manifesto" id="casa">
          <div className="manifesto__index">02 / LA CASA</div>
          <motion.p
            className="manifesto__statement"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.8 }}
          >
            No venimos a fabricar una versión nueva de ti.
            <span>Venimos a cuidar la forma en que eliges presentarte.</span>
          </motion.p>
          <div className="manifesto__foot">
            <p>
              Una casa de grooming, arte y café donde el tiempo se trata con respeto y cada decisión tiene una razón.
            </p>
            <div className="manifesto__seal" aria-hidden="true">HOUSE<br />OF<br />PRESENCE</div>
          </div>
        </section>

        <section className="ritual" id="ritual">
          <div className="ritual__heading">
            <p className="eyebrow">El recorrido</p>
            <h2>Un ritual claro. Sin teatro innecesario.</h2>
          </div>
          <div className="ritual__line" aria-hidden="true" />
          <div className="ritual__steps">
            {ritualSteps.map(([title, detail], index) => (
              <motion.article
                key={title}
                className="ritual-step"
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="house-collage" aria-label="Experiencias dentro de Indian Club">
          <div className="house-collage__main">
            <span>Más que un servicio</span>
            <h2>Un lugar al que vale la pena llegar antes.</h2>
            <a href="#inspirate">Conocer el club <Arrow /></a>
          </div>
          <div className="house-collage__cafe">
            <span>Café / Conversación</span>
            <strong>Quédate un momento.</strong>
          </div>
          <div className="house-collage__culture">
            <span>Arte / Eventos</span>
            <strong>La casa también sucede fuera de la silla.</strong>
          </div>
        </section>

        <section className="journal" id="inspirate">
          <div className="journal__heading">
            <p className="eyebrow">Inspírate</p>
            <h2>Ideas para mirar mejor, no para copiar.</h2>
          </div>
          <div className="journal__list">
            {journalItems.map(([number, type, title]) => (
              <a href="#inicio" key={number} className="journal-row">
                <span>{number}</span>
                <small>{type}</small>
                <strong>{title}</strong>
                <i>↗</i>
              </a>
            ))}
          </div>
        </section>

        <section className="booking" id="reservar">
          <div className="booking__eyebrow">Tu momento en Indian</div>
          <h2>Listo para llegar con otra presencia.</h2>
          <p>
            Revisa disponibilidad en AgendaPro. La selección de servicio y horario ocurre fuera del sitio durante esta primera fase.
          </p>
          <a className="button button--dark" href={bookingUrl} target="_blank" rel="noreferrer">
            Reservar ahora <Arrow />
          </a>
          <div className="booking__mark" aria-hidden="true">IC</div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <span className="site-footer__brand">INDIAN CLUB</span>
          <span>House of Presence · Loja, Ecuador</span>
        </div>
        <div className="site-footer__links">
          <a href="#servicios">Servicios</a>
          <a href="#casa">La casa</a>
          <a href={bookingUrl} target="_blank" rel="noreferrer">Reservar</a>
        </div>
        <span>© 2026 Indian Club</span>
      </footer>
    </div>
  );
}

export default App;
