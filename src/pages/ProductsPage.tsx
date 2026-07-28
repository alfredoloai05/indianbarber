import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { products } from '../data/catalog';
import { contact, media } from '../data/site';

export function ProductsPage() {
  return (
    <>
      <Seo
        title="Productos"
        description="Productos profesionales para cabello, barba y cuidado personal disponibles en Indian Club Loja."
      />

      <section className="chapter-intro">
        <div className="chapter-intro__index">06 / PRODUCTOS</div>
        <div>
          <p className="final-kicker">Cuidado fuera de la casa</p>
          <h1>El producto correcto sostiene el resultado. <em>No lo reemplaza.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Esta selección se consulta directamente con Indian Club. El equipo puede recomendar textura, fijación o cuidado según el servicio y tu rutina.
        </p>
      </section>

      <section className="product-editorial">
        <div className="product-editorial__visual">
          <img src={media.barber} alt="Detalle de una sesión profesional de barbería" loading="eager" />
          <span>CARE / 01</span>
        </div>
        <div className="product-editorial__intro">
          <span>Una decisión útil</span>
          <h2>Primero entiende qué necesita tu cabello o barba.</h2>
          <p>Brillo, textura, control, volumen e hidratación resuelven problemas distintos. La recomendación evita comprar un producto que no corresponde al acabado o mantenimiento que buscas.</p>
        </div>
      </section>

      <section className="product-ledger" aria-label="Productos disponibles en Indian Club">
        {products.map((product) => (
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer" key={product.title}>
            <span>{product.number}</span>
            <small>{product.category}</small>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <i aria-hidden="true">Consultar ↗</i>
          </a>
        ))}
      </section>

      <section className="product-guidance">
        <div><span>Orientación</span><h2>Pregunta antes de elegir.</h2></div>
        <p>La disponibilidad puede variar. Consulta por WhatsApp o durante tu visita para confirmar inventario y recibir una recomendación según tu rutina.</p>
        <a className="final-button" href={contact.whatsappHref} target="_blank" rel="noreferrer">Consultar productos ↗</a>
      </section>

      <BookingBand />
    </>
  );
}
