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
import type { SpaceId } from '../data/serviceCatalog';
import { spaceLabels, spaceOrder, spacePath } from '../utils/spaces';

const secondaryNavigation = [
  { label: 'Gift Cards', to: '/tarjetas-regalo' },
  { label: 'Contacto', to: '/contacto' },
];

const spaceSectionNavigation = [
  { label: 'Servicios', anchor: 'servicios' },
  { label: 'Equipo', anchor: 'equipo' },
  { label: 'Style Book', anchor: 'style-book' },
  { label: 'Consejos', anchor: 'consejos' },
  { label: 'Beneficios', anchor: 'beneficios' },
  { label: 'Consulta', anchor: 'consulta' },
] as const;

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSpaceMenu, setOpenSpaceMenu] = useState<SpaceId | null>(null);
  const [mobileSpaceMenu, setMobileSpaceMenu] = useState<SpaceId | null>(null);
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

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest('.compact-space-nav__item')) return;
      setOpenSpaceMenu(null);
    };
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenSpaceMenu(null);
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeWithEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeWithEscape);
    };
  }, []);

  const primaryNavigation = spaceOrder.map((id) => ({ label: spaceLabels[id], to: spacePath(id), id }));

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileSpaceMenu(null);
  };

  return (
    <div className="site-shell site-shell--brand">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      {!reduceMotion ? <motion.div className="ambient-cursor" style={{ x: cursorX, y: cursorY }} aria-hidden="true" /> : null}

      <header className="site-header site-header--compact site-header--four-spaces">
        <Link className="compact-brand" to="/" aria-label={`${settings.brandName}, inicio`} onClick={closeMobileMenu}>
          <img src={settings.logoMark} alt="" />
          <span>{settings.brandName.toUpperCase()}</span>
        </Link>

        <nav className="compact-space-nav" aria-label="Espacios de Indian House">
          {primaryNavigation.map((item) => {
            const isOpen = openSpaceMenu === item.id;
            return (
              <div
                className={`compact-space-nav__item${isOpen ? ' is-open' : ''}`}
                key={item.to}
                onMouseEnter={() => setOpenSpaceMenu(item.id)}
                onMouseLeave={() => setOpenSpaceMenu(null)}
                onBlurCapture={(event) => {
                  const nextTarget = event.relatedTarget;
                  if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                    setOpenSpaceMenu(null);
                  }
                }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                  onFocus={() => setOpenSpaceMenu(item.id)}
                  onClick={() => setOpenSpaceMenu(null)}
                >
                  {item.label}
                </NavLink>
                <button
                  type="button"
                  aria-label={isOpen ? `Cerrar menú de ${item.label}` : `Abrir menú de ${item.label}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpenSpaceMenu((current) => current === item.id ? null : item.id)}
                >
                  <span aria-hidden="true">⌄</span>
                </button>

                <div className="compact-space-nav__submenu" aria-label={`Secciones de ${item.label}`}>
                  {spaceSectionNavigation.map((subItem) => (
                    <Link
                      key={subItem.anchor}
                      to={spacePath(item.id, subItem.anchor)}
                      onClick={() => setOpenSpaceMenu(null)}
                    >
                      <span>{subItem.label}</span><i aria-hidden="true">↘</i>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="compact-actions">
          <Link className="compact-booking" to="/reservar">Reservar</Link>
          <button
            className={`menu-trigger menu-trigger--compact menu-trigger--clean${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((current) => !current);
              setMobileSpaceMenu(null);
              setOpenSpaceMenu(null);
            }}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay menu-overlay--brand menu-overlay--spaces"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.24 }}
          >
            <img className="menu-overlay__brand-mark" src={settings.logoMark} alt="" />
            <div className="menu-overlay__index">INDIAN HOUSE · LOJA</div>
            <nav aria-label="Navegación móvil">
              {primaryNavigation.map((item, index) => {
                const isOpen = mobileSpaceMenu === item.id;
                return (
                  <motion.div
                    className={`menu-overlay__space${isOpen ? ' is-open' : ''}`}
                    key={item.to}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduceMotion ? 0 : index * 0.04 }}
                  >
                    <div className="menu-overlay__space-row">
                      <NavLink to={item.to} onClick={closeMobileMenu}>{item.label}</NavLink>
                      <button
                        type="button"
                        aria-label={isOpen ? `Cerrar secciones de ${item.label}` : `Abrir secciones de ${item.label}`}
                        aria-expanded={isOpen}
                        onClick={() => setMobileSpaceMenu((current) => current === item.id ? null : item.id)}
                      >
                        <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          className="menu-overlay__subnav"
                          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {spaceSectionNavigation.map((subItem) => (
                            <Link
                              to={spacePath(item.id, subItem.anchor)}
                              key={subItem.anchor}
                              onClick={closeMobileMenu}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              {secondaryNavigation.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : (primaryNavigation.length + index) * 0.04 }}
                >
                  <NavLink to={item.to} onClick={closeMobileMenu}>{item.label}</NavLink>
                </motion.div>
              ))}
            </nav>
            <Link className="menu-overlay__booking" to="/reservar" onClick={closeMobileMenu}>
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
          <span>Cuatro experiencias. Un mismo lugar.</span>
        </div>

        <nav className="compact-footer__nav" aria-label="Espacios de Indian House">
          {primaryNavigation.map((item) => <Link to={item.to} key={item.to}>{item.label}</Link>)}
          <Link to="/tarjetas-regalo">Gift Cards</Link>
          <Link to="/contacto">Contacto</Link>
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
