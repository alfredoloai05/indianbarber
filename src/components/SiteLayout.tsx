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
import { bookingUrl, brand, contact, navItems } from '../data/site';

const desktopItems = navItems.filter((item) =>
  ['/servicios', '/equipo', '/club', '/style-book'].includes(item.to),
);

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
    <div className="site-shell site-shell--brand">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      {!reduceMotion ? <motion.div className="ambient-cursor" style={{ x: cursorX, y: cursorY }} aria-hidden="true" /> : null}

      <header className="site-header site-header--compact">
        <Link className="compact-brand" to="/" aria-label="Indian Club, inicio" onClick={() => setMenuOpen(false)}>
          <img src={brand.logoMark} alt="" />
          <span>INDIAN CLUB</span>
        </Link>

        <nav className="compact-nav" aria-label="Navegación principal">
          {desktopItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="compact-actions">
          <a className="compact-booking" href={bookingUrl} target="_blank" rel="noreferrer">Reservar</a>
          <button
            className="menu-trigger menu-trigger--compact"
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
            className="menu-overlay menu-overlay--brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <img className="menu-overlay__brand-mark" src={brand.logoMark} alt="" />
            <div className="menu-overlay__index">INDIAN CLUB · LOJA</div>
            <nav aria-label="Navegación móvil">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.04 }}
                >
                  <NavLink to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</NavLink>
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

      <footer className="site-footer site-footer--complete site-footer--brand">
        <div className="site-footer__identity">
          <Link className="site-footer__brand site-footer__brand-lockup" to="/">
            <img src={brand.logoMark} alt="" />
            <span>INDIAN CLUB</span>
          </Link>
          <span>Barbería · Tattoo · Nails · Café</span>
          <address>{contact.address}<br />{contact.city}</address>
        </div>
        <div className="site-footer__links">
          <Link to="/servicios">Servicios</Link>
          <Link to="/equipo">Equipo</Link>
          <Link to="/club">El Club</Link>
          <Link to="/style-book">Style Book</Link>
          <Link to="/inspirate">Inspírate</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        <div className="site-footer__links">
          <Link to="/promociones">Promociones</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/tarjetas-regalo">Tarjetas regalo</Link>
          <Link to="/reservar">Cómo reservar</Link>
          <a href={contact.mapHref} target="_blank" rel="noreferrer">Abrir mapa ↗</a>
        </div>
        <div className="site-footer__contact">
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={contact.emailHref}>{contact.email}</a>
          <a href={bookingUrl} target="_blank" rel="noreferrer">Reservar ↗</a>
        </div>
        <div className="site-footer__legal">
          <span>© 2026 Indian Club</span>
          <span>Loja, Ecuador</span>
        </div>
      </footer>
    </div>
  );
}
