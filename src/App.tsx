import { motion, useReducedMotion } from 'framer-motion';

const services = [
  { title: 'Corte', detail: 'Precisión, conversación y forma.' },
  { title: 'Barba', detail: 'Detalle, cuidado y presencia.' },
  { title: 'Tattoo & Nails', detail: 'Expresión personal dentro de la casa.' },
];

function App() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Indian Club, inicio">
          INDIAN CLUB
        </a>
        <nav aria-label="Navegación principal">
          <a href="#servicios">Servicios</a>
          <a href="#casa">La casa</a>
          <a href="#equipo">Equipo</a>
        </nav>
        <a className="button button--compact" href="#reservar">
          Reservar
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <motion.div
            className="hero__content"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">House of Presence · Loja, Ecuador</p>
            <h1>Presencia, hecha ritual.</h1>
            <p className="hero__lead">
              Grooming, arte y café para llegar como quieres ser recordado.
            </p>
            <div className="hero__actions">
              <a className="button" href="#reservar">Reservar una cita</a>
              <a className="text-link" href="#servicios">Descubrir servicios</a>
            </div>
          </motion.div>
          <div className="hero__media" role="img" aria-label="Interior editorial de Indian Club">
            <span>Indian Club</span>
          </div>
        </section>

        <section className="section" id="servicios">
          <div className="section__intro">
            <p className="eyebrow">El oficio</p>
            <h2>Servicios que empiezan escuchando.</h2>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <motion.article
                className="service-card"
                key={service.title}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <span className="service-card__number">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
                <a href="#reservar">Ver horarios</a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="manifesto" id="casa">
          <p className="eyebrow">La casa</p>
          <p className="manifesto__statement">
            No venimos a fabricar una versión nueva de ti. Venimos a cuidar la forma en que eliges presentarte.
          </p>
        </section>

        <section className="booking" id="reservar">
          <div>
            <p className="eyebrow">Tu momento en Indian</p>
            <h2>Reserva con claridad.</h2>
            <p>La primera versión conservará AgendaPro mientras construimos una experiencia propia sin interrumpir la operación.</p>
          </div>
          <a className="button button--light" href="https://indianclubec.com" target="_blank" rel="noreferrer">
            Ir a reservas
          </a>
        </section>
      </main>

      <footer className="site-footer" id="equipo">
        <span>Indian Club · House of Presence</span>
        <span>Loja, Ecuador</span>
      </footer>
    </div>
  );
}

export default App;
