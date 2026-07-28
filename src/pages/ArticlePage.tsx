import { Link, useParams } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { journalItems } from '../data/site';

const articleBodies: Record<string, string[]> = {
  'corte-que-dura-tres-semanas': [
    'La mejor referencia no es necesariamente la fotografía que más te gusta. Es la forma que puede convivir con tu textura, tu rutina y el tiempo real que dedicas al mantenimiento.',
    'Antes de decidir, conviene observar crecimiento, remolinos, densidad y caída. Un corte sólido anticipa cómo cambia la forma durante las semanas siguientes.',
    'El objetivo no es congelar el resultado del primer día. Es construir una estructura que envejezca con intención.',
  ],
  'diagnostico-antes-del-corte': [
    'Un diagnóstico útil no es una charla decorativa. Es el momento en que se define qué se puede lograr, qué debe evitarse y qué necesita tiempo.',
    'La forma del rostro es una variable, pero no la única. También importan el trabajo, la frecuencia de visita, el uso de productos y la manera en que la persona quiere ser percibida.',
    'Escuchar primero reduce correcciones, promesas irreales y resultados que solo funcionan bajo la luz del estudio.',
  ],
  'cafe-conversacion-y-ritmo': [
    'La hospitalidad no debería sentirse como una venta adicional. Debería ayudar a que la visita tenga un ritmo más humano.',
    'El café, la música y la conversación forman parte de la casa cuando acompañan el oficio sin distraerlo.',
    'Llegar un poco antes deja de ser espera cuando el espacio tiene una razón para ser habitado.',
  ],
};

export function ArticlePage() {
  const { slug } = useParams();
  const article = journalItems.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="not-found compact-not-found">
        <span>Artículo no encontrado</span>
        <h1>Esta nota todavía no forma parte de la casa.</h1>
        <Link className="button" to="/inspirate">Volver al journal</Link>
      </section>
    );
  }

  const paragraphs = articleBodies[article.slug] ?? [article.excerpt];

  return (
    <>
      <Seo title={article.title} description={article.excerpt} />
      <article className="article-page">
        <header className="article-page__header">
          <Link to="/inspirate">← House Notes</Link>
          <span>{article.type} · {article.number}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
        </header>

        <div className="article-page__body">
          <aside>
            <span>Indian Club Journal</span>
            <strong>Lectura aproximada: 3 min</strong>
          </aside>
          <div>
            {paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? 'article-page__lead' : undefined}>{paragraph}</p>
            ))}
            <blockquote>No se trata de perseguir una imagen. Se trata de tomar una decisión que puedas sostener.</blockquote>
          </div>
        </div>
      </article>
      <BookingBand />
    </>
  );
}
