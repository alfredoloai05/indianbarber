import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { useGlobalSettings, useStyleBookContent } from '../content/useSiteContent';

export function StyleBookPage() {
  const reduceMotion = useReducedMotion();
  const settings = useGlobalSettings();
  const content = useStyleBookContent();

  return (
    <>
      <Seo
        title="Style Book"
        description={`Trabajos de barbería, nails, SPA y fotografía de ${settings.brandName} en Loja.`}
      />

      <section className="chapter-intro chapter-intro--brand chapter-intro--clean">
        <div>
          <p className="final-kicker">{content.eyebrow}</p>
          <h1>{content.title}</h1>
        </div>
        <p className="chapter-intro__aside">{content.description}</p>
        <motion.img
          className="chapter-intro__brand-mark"
          src={settings.logoMark}
          alt=""
          initial={reduceMotion ? false : { opacity: 0, rotate: -8, scale: 0.7 }}
          animate={{ opacity: 0.12, rotate: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </section>

      <section className="style-book-opening style-book-opening--brand style-book-opening--clean">
        <span>{settings.brandName} · Loja</span>
        <p>Barbería, SPA, nails y fotografía en una sola galería.</p>
        <strong>Ver · Elegir · Reservar</strong>
      </section>

      <section className="style-book-grid style-book-grid--official" aria-label={`Galería de trabajos de ${settings.brandName}`}>
        {content.frames.map((frame, index) => (
          <motion.figure
            className={frame.className}
            key={`${frame.label}-${index}`}
            initial={reduceMotion ? false : { opacity: 0, y: 60, clipPath: 'inset(8% 0 12% 0)' }}
            whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0% 0)' }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.75, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduceMotion ? undefined : { y: -10 }}
          >
            <img src={frame.image} alt={frame.alt} loading={index < 2 ? 'eager' : 'lazy'} />
            <figcaption><span>{frame.label}</span><i>INDIAN</i></figcaption>
          </motion.figure>
        ))}
      </section>

      <section className="style-book-manifesto style-book-manifesto--brand style-book-manifesto--direct">
        <div>
          <span>¿Viste algo que te gusta?</span>
          <h2>Guarda la referencia y coméntala con el profesional.</h2>
        </div>
        <div className="style-book-manifesto__mark">
          <motion.img
            src={settings.logoMark}
            alt=""
            animate={reduceMotion ? undefined : { rotate: [0, 2, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p>El resultado se adapta a tu cabello, tus uñas, tu piel y al tipo de experiencia que quieras realizar.</p>
        </div>
      </section>

      <section className="style-book-next style-book-next--brand">
        <span>Continúa desde aquí</span>
        <Link to="/servicios">Explorar servicios ↗</Link>
        <Link to="/equipo">Conocer al equipo ↗</Link>
      </section>

      <BookingBand />
    </>
  );
}
