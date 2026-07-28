import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { bookingUrl, contact, navItems } from '../data/site';

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return undefined;

    const moveCursor = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener('pointermove', moveCursor, { passive: true });
    return () => window.removeEventListener('pointermove', moveCursor);
  }, [cursorX, cursorY, reduceMotion]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      {!reduceMotion ? <motion.div className="ambient-cursor" style={{ x: cursorX, y: cursorY }} aria-hidden="true" /> : null}

      <header className="site-header">
        <Link className="brand" to="/" aria-label="Indian Club, inicio" onClick={() => setMenuOpen(false)}>
          <span className="brand__name">INDIAN CLUB</span>
          <span className="brand__claim">House of Presence</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.slice(1, 6).map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-contact" to="/contacto">Llegar</Link>
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
            <div className="menu-overlay__index">IC / HOUSE 01</div>
            <nav aria-label="Navegación móvil">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.045 }}
                >
                  <NavLink to={item.to} onClick={() => setMenuOpen(false)}>
                    <span>0{index + 1}</span>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <a className="menu-overlay__booking" href={bookingUrl} target="_blank" rel="noreferrer">
              Reservar una cita <span aria-hidden="true">↗</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer site-footer--complete">
        <div className="site-footer__identity">
          <Link className="site-footer__brand" to="/">INDIAN CLUB</Link>
          <span>House of Presence · Loja, Ecuador</span>
          <address>{contact.address}<br />{contact.city}</address>
        </div>
        <div className="site-footer__links">
          <Link to="/servicios">Servicios</Link>
          <Link to="/equipo">Equipo</Link>
          <Link to="/club">La casa</Link>
          <Link to="/style-book">Style Book</Link>
          <Link to="/inspirate">House Notes</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        <div className="site-footer__contact">
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={contact.emailHref}>{contact.email}</a>
          <a href={bookingUrl} target="_blank" rel="noreferrer">Reservar ↗</a>
        </div>
        <div className="site-footer__legal">
          <span>© 2026 Indian Club</span>
          <span>Diseñado para cuidar presencia, tiempo y elección.</span>
        </div>
      </footer>
    </div>
  );
}
