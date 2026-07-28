import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { journalItems } from '../data/site';

export function InspirePage() {
  return (
    <>
      <Seo
        title="Inspírate"
        description="Guías de estilo, oficio y cultura de Indian Club para tomar mejores decisiones sobre presencia, cuidado y ritual."
      />
      <PageHero
        index="04 / JOURNAL"
        eyebrow="Inspírate"
        title="Ideas para mirar mejor, "
        accent="no para copiar."
        description="El contenido editorial debe ayudar a decidir, mantener y comprender. No existe para llenar una cuadrícula ni perseguir palabras clave sin valor."
      />

      <section className="journal-cover">
        <div className="journal-cover__feature">
          <span>Edición 01 · House Notes</span>
          <h2>La presencia se construye antes de entrar al espejo.</h2>
          <p>Una colección de criterios sobre forma, tiempo, cuidado y cultura para tomar decisiones que sigan funcionando fuera de Indian.</p>
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
