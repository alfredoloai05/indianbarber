import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { useGlobalSettings, useStyleBookContent } from '../content/useSiteContent';
import { bookingPath } from '../utils/booking';

type StyleFilter = 'todos' | 'barberia' | 'nails' | 'spa' | 'fotografia';

const filters: { id: StyleFilter; label: string }[] = [
  { id: 'todos', label: 'Todo' },
  { id: 'barberia', label: 'Barbería' },
  { id: 'nails', label: 'Nails' },
  { id: 'spa', label: 'SPA' },
  { id: 'fotografia', label: 'Fotografía' },
];

function frameCategory(label: string): Exclude<StyleFilter, 'todos'> {
  const normalized = label.toLowerCase();
  if (/nail|uña/.test(normalized)) return 'nails';
  if (/spa/.test(normalized)) return 'spa';
  if (/foto|retrato/.test(normalized)) return 'fotografia';
  return 'barberia';
}

export function StyleBookPage() {
  const [activeFilter, setActiveFilter] = useState<StyleFilter>('todos');
  const reduceMotion = useReducedMotion();
  const settings = useGlobalSettings();
  const content = useStyleBookContent();
  const heroFrame = content.frames[0];
  const previewFrames = content.frames.slice(1, 3);
  const visibleFrames = useMemo(
    () => activeFilter === 'todos'
      ? content.frames
      : content.frames.filter((frame) => frameCategory(frame.label) === activeFilter),
    [activeFilter, content.frames],
  );
  const bookingArea = activeFilter === 'todos' ? undefined : activeFilter;

  return (
    <>
      <Seo
        title="Style Book"
        description={`Trabajos de barbería, nails, SPA y fotografía de ${settings.brandName} en Loja.`}
      />

      {heroFrame ? (
        <section className="stylebook-premiere" aria-labelledby="stylebook-premiere-title">
          <div className="stylebook-premiere__media">
            <img src={heroFrame.image} alt={heroFrame.alt} loading="eager" />
            <div aria-hidden="true" />
          </div>
          <div className="stylebook-premiere__copy">
            <h1 id="stylebook-premiere-title">{content.title}</h1>
            <p>{content.description}</p>
            <div>
              <a href="#galeria">Ver galería ↓</a>
              <Link to={bookingPath(bookingArea)}>Reservar desde una referencia ↗</Link>
            </div>
          </div>
          <div className="stylebook-premiere__reel" aria-hidden="true">
            {previewFrames.map((frame) => (
              <figure key={frame.label}>
                <img src={frame.image} alt="" />
                <figcaption>{frame.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="stylebook-filter" aria-label="Filtrar Style Book">
        {filters.map((filter) => (
          <button
            type="button"
            className={activeFilter === filter.id ? 'is-active' : undefined}
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </section>

      <section id="galeria" className="style-book-grid style-book-grid--official style-book-grid--filtered" aria-label={`Galería de trabajos de ${settings.brandName}`}>
        {visibleFrames.map((frame, index) => (
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
          <h2>¿Viste algo que te gusta?</h2>
          <p>Guarda la referencia y llévala a la reserva. El profesional la adaptará a tu cabello, uñas, piel o sesión.</p>
        </div>
        <div className="style-book-manifesto__actions">
          <Link to={bookingPath(bookingArea)}>Elegir cita ↗</Link>
          <Link to="/equipo">Conocer al equipo</Link>
        </div>
      </section>

      <BookingBand area={bookingArea} />
    </>
  );
}
