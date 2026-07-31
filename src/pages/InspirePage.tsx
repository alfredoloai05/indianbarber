import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { useJournalArticlesContent, useJournalPageContent } from '../content/useSiteContent';

export function InspirePage() {
  const articles = useJournalArticlesContent();
  const content = useJournalPageContent();
  const [titleStart, titleAccent] = content.title.includes('para ')
    ? content.title.split(/(?=para )/, 2)
    : [content.title, ''];

  return (
    <>
      <Seo
        title="Consejos"
        description="Guías de Indian Club para elegir un corte y cuidar el cabello, la barba y las uñas entre visitas."
      />
      <PageHero
        eyebrow={content.eyebrow}
        title={titleStart}
        accent={titleAccent}
        description={content.description}
      />

      <section className="journal-cover journal-cover--practical">
        <div className="journal-cover__feature">
          <span>{content.coverEyebrow}</span>
          <h2>{content.coverTitle}</h2>
          <p>{content.coverDescription}</p>
        </div>
        <div className="journal-cover__mark" aria-hidden="true">INDIAN<br />TIPS</div>
      </section>

      <section className="article-index article-index--practical" aria-label="Guías de cuidado">
        {articles.map((item) => (
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
