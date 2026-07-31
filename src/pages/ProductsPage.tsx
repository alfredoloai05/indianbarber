import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { useGlobalSettings, useProductsContent } from '../content/useSiteContent';
import { media } from '../data/site';

export function ProductsPage() {
  const products = useProductsContent();
  const settings = useGlobalSettings();

  return (
    <>
      <Seo
        title="Productos"
        description={`Productos profesionales para cabello, barba y cuidado personal disponibles en ${settings.brandName} Loja.`}
      />

      <section className="chapter-intro chapter-intro--clean">
        <div>
          <p className="final-kicker">Productos</p>
          <h1>Cuidado para el cabello y la barba <em>entre visitas.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Consulta disponibilidad y recibe una recomendación según el acabado, la fijación o el cuidado que necesitas.
        </p>
      </section>

      <section className="product-editorial product-editorial--clean">
        <div className="product-editorial__visual">
          <img src={media.barber} alt="Detalle de una sesión profesional de barbería" loading="eager" />
          <span>Productos {settings.brandName}</span>
        </div>
        <div className="product-editorial__intro">
          <span>Recomendación profesional</span>
          <h2>Elige el producto según tu cabello, barba y rutina.</h2>
          <p>Brillo, textura, control, volumen e hidratación resuelven necesidades distintas. Consulta antes de comprar para elegir la opción adecuada.</p>
        </div>
      </section>

      <section className="product-ledger product-ledger--clean" aria-label={`Productos disponibles en ${settings.brandName}`}>
        {products.map((product) => (
          <a href={settings.whatsappHref} target="_blank" rel="noreferrer" key={product.title}>
            <small>{product.category}</small>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <i aria-hidden="true">Consultar ↗</i>
          </a>
        ))}
      </section>

      <section className="product-guidance">
        <div><span>Disponibilidad</span><h2>Consulta antes de elegir.</h2></div>
        <p>El inventario puede variar. Escríbenos por WhatsApp o pregunta durante tu visita para confirmar productos disponibles.</p>
        <a className="final-button" href={settings.whatsappHref} target="_blank" rel="noreferrer">Consultar productos ↗</a>
      </section>

      <BookingBand />
    </>
  );
}
