import { Link, useParams } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { journalBodies, journalItems } from '../data/journal';

export function ArticlePage() {
  const { slug } = useParams();
  const article = journalItems.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="not-found compact-not-found">
        <span>Artículo no encontrado</span>
        <h1>Esta guía no está disponible.</h1>
        <Link className="button" to="/inspirate">Volver a consejos</Link>
      </section>
    );
  }

  const paragraphs = journalBodies[article.slug] ?? [article.excerpt];

  return (
    <>
      <Seo title={article.title} description={article.excerpt} />
      <article className="article-page article-page--practical">
        <header className="article-page__header">
          <Link to="/inspirate">← Consejos</Link>
          <span>{article.type}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
        </header>

        <div className="article-page__cover">
          <img src={article.image} alt={article.title} loading="eager" />
        </div>

        <div className="article-page__body">
          <aside>
            <span>Guía Indian Club</span>
            <strong>Lectura aproximada: 3 min</strong>
          </aside>
          <div>
            {paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? 'article-page__lead' : undefined}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
      <BookingBand />
    </>
  );
}
