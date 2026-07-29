import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { journalItems } from '../data/journal';

export function InspirePage() {
  return (
    <>
      <Seo
        title="Consejos"
        description="Guías de Indian Club para elegir un corte y cuidar el cabello, la barba y las uñas entre visitas."
      />
      <PageHero
        eyebrow="Consejos Indian Club"
        title="Ideas prácticas para "
        accent="cuidar tu estilo."
        description="Guías breves sobre cortes, cabello, barba y uñas para mantener mejor cada resultado."
      />

      <section className="journal-cover journal-cover--practical">
        <div className="journal-cover__feature">
          <span>Cuidado y mantenimiento</span>
          <h2>Tu estilo continúa después de salir de Indian.</h2>
          <p>Recomendaciones sencillas para elegir mejor y cuidar el resultado entre una visita y la siguiente.</p>
        </div>
        <div className="journal-cover__mark" aria-hidden="true">INDIAN<br />TIPS</div>
      </section>

      <section className="article-index article-index--practical" aria-label="Guías de cuidado">
        {journalItems.map((item) => (
          <Link className="article-index__row" to={`/inspirate/${item.slug}`} key={item.slug}>
            <img src={item.image} alt="" loading="lazy" />
            <small>{item.type}</small>
            <div>
              <h2>{item.title}</h2>
              <p>{item.excerpt}</p>
            </div>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
      </section>
    </>
  );
}
