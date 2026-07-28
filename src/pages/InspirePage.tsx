import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { journalItems } from '../data/site';

export function InspirePage() {
  return (
    <>
      <Seo
        title="Inspírate"
        description="Guías de estilo, oficio y cultura de Indian Club para elegir, cuidar y mantener tu imagen."
      />
      <PageHero
        index="04 / JOURNAL"
        eyebrow="Inspírate"
        title="Ideas para elegir mejor, "
        accent="cuidar y mantener."
        description="Guías breves sobre cortes, textura, diagnóstico, cuidado y la experiencia de Indian Club."
      />

      <section className="journal-cover">
        <div className="journal-cover__feature">
          <span>Edición 01 · House Notes</span>
          <h2>Tu estilo continúa después de salir de Indian.</h2>
          <p>Consejos sobre forma, mantenimiento, productos y hábitos para sostener mejor cada resultado.</p>
        </div>
        <div className="journal-cover__mark" aria-hidden="true">HOUSE<br />NOTES</div>
      </section>

      <section className="article-index" aria-label="Artículos">
        {journalItems.map((item) => (
          <Link className="article-index__row" to={`/inspirate/${item.slug}`} key={item.slug}>
            <span>{item.number}</span>
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
