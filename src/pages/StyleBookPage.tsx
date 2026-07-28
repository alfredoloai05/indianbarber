import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { brand, media } from '../data/site';

const frames = [
  { image: media.hero, label: 'Cortes / 01', alt: 'Cliente atendido dentro de Indian Club', className: 'style-book-grid__hero' },
  { image: media.tattoo, label: 'Tatuajes / 02', alt: 'Tatuaje realizado por Indian Club Tattoo Studio', className: 'style-book-grid__tall' },
  { image: media.barber, label: 'Cortes / 03', alt: 'Corte realizado por Indian Club', className: 'style-book-grid__wide' },
  { image: media.nails, label: 'Manicura / 04', alt: 'Diseño de uñas realizado por Indian Club Nails Studio', className: 'style-book-grid__small' },
  { image: media.barberAlt, label: 'Cortes / 05', alt: 'Resultado de barbería realizado en Indian Club', className: 'style-book-grid__portrait' },
  { image: media.tattoo, label: 'Detalle / 06', alt: 'Detalle de trabajo del Tattoo Studio', className: 'style-book-grid__small' },
];

export function StyleBookPage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Seo
        title="Style Book"
        description="Trabajos reales de cortes, tatuajes y manicura publicados por Indian Club en Loja."
      />

      <section className="chapter-intro chapter-intro--brand">
        <div className="chapter-intro__index">04 / STYLE BOOK</div>
        <div>
          <p className="final-kicker">Archivo visual Indian Club</p>
          <h1>Ya no imaginamos la marca. <em>Mostramos su trabajo real.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Esta edición utiliza fotografías publicadas en el Style Book oficial de Indian Club: cortes, tatuajes y manicura realizados por la casa.
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

      <section className="style-book-opening style-book-opening--brand">
        <span>ARCHIVO / INDIAN</span>
        <p>El logo crea reconocimiento. El trabajo demuestra por qué la marca merece recordarse.</p>
        <strong>Loja · Actual</strong>
      </section>

      <section className="style-book-grid style-book-grid--official" aria-label="Galería de trabajos reales de Indian Club">
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

      <section className="style-book-manifesto style-book-manifesto--brand">
        <div>
          <span>Una regla</span>
          <h2>La imagen no adorna el servicio. Demuestra el estándar.</h2>
        </div>
        <div className="style-book-manifesto__mark">
          <motion.img
            src={brand.logoMark}
            alt=""
            animate={reduceMotion ? undefined : { rotate: [0, 2, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p>El archivo final crecerá con producción propia: fachada, manos, herramientas, procesos, retratos y resultados reales.</p>
        </div>
      </section>

      <section className="style-book-next style-book-next--brand">
        <span>¿Qué parte de Indian quieres vivir?</span>
        <Link to="/servicios">Explorar servicios ↗</Link>
        <Link to="/equipo">Conocer al equipo ↗</Link>
      </section>

      <BookingBand />
    </>
  );
}
