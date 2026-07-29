import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { brand, media } from '../data/site';

const frames = [
  { image: media.hero, label: 'Corte y acabado', alt: 'Cliente atendido dentro de Indian Club', className: 'style-book-grid__hero' },
  { image: media.tattoo, label: 'Tattoo Studio', alt: 'Tatuaje realizado por Indian Club Tattoo Studio', className: 'style-book-grid__tall' },
  { image: media.barber, label: 'Barbería', alt: 'Corte realizado por Indian Club', className: 'style-book-grid__wide' },
  { image: media.nails, label: 'Nails Studio', alt: 'Diseño de uñas realizado por Indian Club Nails Studio', className: 'style-book-grid__small' },
  { image: media.barberAlt, label: 'Barba y perfilado', alt: 'Resultado de barbería realizado en Indian Club', className: 'style-book-grid__portrait' },
  { image: media.tattoo, label: 'Detalle de tatuaje', alt: 'Detalle de trabajo del Tattoo Studio', className: 'style-book-grid__small' },
];

export function StyleBookPage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Seo
        title="Style Book"
        description="Trabajos de cortes, tatuajes y manicura realizados por Indian Club en Loja."
      />

      <section className="chapter-intro chapter-intro--brand chapter-intro--clean">
        <div>
          <p className="final-kicker">Style Book</p>
          <h1>Trabajos realizados por <em>el equipo de Indian Club.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Cortes, perfilados, tatuajes y uñas para que encuentres referencias antes de reservar.
        </p>
        <motion.img
          className="chapter-intro__brand-mark"
          src={brand.logoMark}
          alt=""
          initial={reduceMotion ? false : { opacity: 0, rotate: -8, scale: 0.7 }}
          animate={{ opacity: 0.12, rotate: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </section>

      <section className="style-book-opening style-book-opening--brand style-book-opening--clean">
        <span>Indian Club · Loja</span>
        <p>Cortes, tattoo y nails en una sola galería.</p>
        <strong>Ver · Elegir · Reservar</strong>
      </section>

      <section className="style-book-grid style-book-grid--official" aria-label="Galería de trabajos de Indian Club">
        {frames.map((frame, index) => (
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
            src={brand.logoMark}
            alt=""
            animate={reduceMotion ? undefined : { rotate: [0, 2, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p>El resultado se adapta a tu cabello, tus uñas, tu piel y al tipo de trabajo que quieras realizar.</p>
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
