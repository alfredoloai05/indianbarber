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
import { useGlobalSettings } from '../content/useSiteContent';
import { spaceOrder, spacePath, spaceLabels } from '../utils/spaces';

const secondaryNavigation = [
  { label: 'La Casa', to: '/club' },
  { label: 'Gift Cards', to: '/tarjetas-regalo' },
  { label: 'Contacto', to: '/contacto' },
];

const barberNavigation = [
  { label: 'Cabello', to: '/barberia#cabello' },
  { label: 'Barba y afeitado', to: '/barberia#barba-y-afeitado' },
  { label: 'Combos Indian', to: '/barberia#combos-indian' },
  { label: 'Servicios especiales', to: '/barberia#servicios-especiales' },
];

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [barberMenuOpen, setBarberMenuOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const settings = useGlobalSettings();
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, reduceMotion]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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

  const primaryNavigation = spaceOrder.map((id) => ({ label: spaceLabels[id], to: spacePath(id), id }));

  return (
    <div className="site-shell site-shell--brand">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      {!reduceMotion ? <motion.div className="ambient-cursor" style={{ x: cursorX, y: cursorY }} aria-hidden="true" /> : null}

      <header className="site-header site-header--compact site-header--four-spaces">
        <Link className="compact-brand" to="/" aria-label={`${settings.brandName}, inicio`} onClick={() => setMenuOpen(false)}>
          <img src={settings.logoMark} alt="" />
          <span>{settings.brandName.toUpperCase()}</span>
        </Link>

        <nav className="compact-space-nav" aria-label="Espacios de Indian House">
          {primaryNavigation.map((item) => item.id === 'barberia' ? (
            <div
              className={`compact-space-nav__item compact-space-nav__item--barber${barberMenuOpen ? ' is-open' : ''}`}
              key={item.to}
              onMouseLeave={() => setBarberMenuOpen(false)}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                onFocus={() => setBarberMenuOpen(true)}
              >
                {item.label}
              </NavLink>
              <button
                type="button"
                aria-label={barberMenuOpen ? 'Cerrar submenú de Barbería' : 'Abrir submenú de Barbería'}
                aria-expanded={barberMenuOpen}
                onClick={() => setBarberMenuOpen((current) => !current)}
              >
                <span aria-hidden="true">⌄</span>
              </button>

              <div className="compact-space-nav__submenu" aria-label="Servicios de Barbería">
                {barberNavigation.map((subItem) => (
                  <Link key={subItem.to} to={subItem.to} onClick={() => setBarberMenuOpen(false)}>
                    <span>{subItem.label}</span><i aria-hidden="true">↘</i>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="compact-space-nav__item" key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {item.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="compact-actions">
          <Link className="compact-booking" to="/reservar">Reservar</Link>
          <button
            className={`menu-trigger menu-trigger--compact menu-trigger--clean${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay menu-overlay--brand"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.24 }}
          >
            <img className="menu-overlay__brand-mark" src={settings.logoMark} alt="" />
            <div className="menu-overlay__index">INDIAN HOUSE · LOJA</div>
            <nav aria-label="Navegación móvil">
              {primaryNavigation.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.04 }}
                >
                  <NavLink to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</NavLink>
                  {item.id === 'barberia' ? (
                    <div className="menu-overlay__subnav">
                      {barberNavigation.map((subItem) => (
                        <Link to={subItem.to} key={subItem.to} onClick={() => setMenuOpen(false)}>{subItem.label}</Link>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              ))}
              {secondaryNavigation.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : (primaryNavigation.length + index) * 0.04 }}
                >
                  <NavLink to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</NavLink>
                </motion.div>
              ))}
            </nav>
            <Link className="menu-overlay__booking" to="/reservar" onClick={() => setMenuOpen(false)}>
              Reservar una cita <span aria-hidden="true">↗</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content"><Outlet /></main>

      <footer className="site-footer site-footer--compact-final site-footer--house">
        <div className="compact-footer__brand">
          <Link to="/" aria-label={`${settings.brandName}, inicio`}>
            <img src={settings.logoMark} alt="" />
            <strong>INDIAN HOUSE</strong>
          </Link>
          <span>Cuatro espacios. Una sola casa.</span>
        </div>

        <nav className="compact-footer__nav" aria-label="Espacios de Indian House">
          {primaryNavigation.map((item) => <Link to={item.to} key={item.to}>{item.label}</Link>)}
          <Link to="/club">La Casa</Link>
          <Link to="/tarjetas-regalo">Gift Cards</Link>
        </nav>

        <div className="compact-footer__contact">
          {(settings.socialLinks ?? []).slice(0, 3).map((social) => (
            <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>{social.label}</a>
          ))}
          <Link to="/reservar">Reservar ↗</Link>
        </div>

        <div className="compact-footer__bottom">
          <span>{settings.address} · {settings.city}</span>
          <span>© 2026 {settings.brandName}</span>
        </div>
      </footer>
    </div>
  );
}
