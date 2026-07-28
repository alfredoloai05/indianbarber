import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { media } from '../data/site';

const frames = [
  { image: media.barber, label: 'Oficio / 01', alt: 'Barbero trabajando un corte con precisión', className: 'style-book-grid__hero' },
  { image: media.tattoo, label: 'Trazo / 02', alt: 'Artista desarrollando un tatuaje', className: 'style-book-grid__tall' },
  { image: media.cafe, label: 'Pausa / 03', alt: 'Cafetería de ambiente cálido', className: 'style-book-grid__wide' },
  { image: media.exterior, label: 'Casa / 04', alt: 'Espacio nocturno de cuidado personal', className: 'style-book-grid__small' },
  { image: media.hero, label: 'Presencia / 05', alt: 'Sesión cinematográfica de grooming', className: 'style-book-grid__portrait' },
  { image: media.barber, label: 'Detalle / 06', alt: 'Detalle de técnica en barbería', className: 'style-book-grid__small' },
];

export function StyleBookPage() {
  return (
    <>
      <Seo
        title="Style Book"
        description="Una selección editorial del oficio, la atmósfera y el lenguaje visual de Indian Club en Loja."
      />

      <section className="chapter-intro">
        <div className="chapter-intro__index">04 / STYLE BOOK</div>
        <div>
          <p className="final-kicker">Archivo visual Indian Club</p>
          <h1>El resultado se reconoce <em>antes de leer el logotipo.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Ritmo, materia, luz y detalle. Esta edición funciona como prototipo visual y quedará lista para sustituir cada escena por producción fotográfica propia de Indian Club.
        </p>
      </section>

      <section className="style-book-opening">
        <span>EDICIÓN / 01</span>
        <p>Una casa de presencia no necesita mostrarlo todo. Necesita elegir bien qué deja ver.</p>
        <strong>Loja · 2026</strong>
      </section>

      <section className="style-book-grid" aria-label="Galería editorial de Indian Club">
        {frames.map((frame, index) => (
          <figure className={frame.className} key={`${frame.label}-${index}`}>
            <img src={frame.image} alt={frame.alt} loading={index < 2 ? 'eager' : 'lazy'} />
            <figcaption><span>{frame.label}</span><i>IC</i></figcaption>
          </figure>
        ))}
      </section>

      <section className="style-book-manifesto">
        <div><span>Una regla</span><h2>La imagen no adorna el servicio. Demuestra el estándar.</h2></div>
        <p>La producción final debe mostrar manos, herramientas, textura, conversación, detalles del espacio y resultados reales. Cada fotografía tendrá derechos, crop responsive y texto alternativo.</p>
      </section>

      <section className="style-book-next">
        <span>¿Qué escena necesitas vivir?</span>
        <Link to="/servicios">Explorar servicios ↗</Link>
        <Link to="/club">Conocer la casa ↗</Link>
      </section>

      <BookingBand />
    </>
  );
}
