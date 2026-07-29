import { Seo } from '../components/Seo';
import { giftCards } from '../data/catalog';
import { contact, media } from '../data/site';

export function GiftCardsPage() {
  return (
    <>
      <Seo
        title="Tarjetas regalo"
        description="Tarjetas regalo de Indian Club en valores de USD 10 a USD 50 para servicios de cuidado personal en Loja."
      />

      <section className="chapter-intro chapter-intro--clean">
        <div>
          <p className="final-kicker">Tarjetas regalo</p>
          <h1>Regala una visita <em>a Indian Club.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Elige un valor y consulta la forma de entrega, vigencia y condiciones directamente con el centro.
        </p>
      </section>

      <section className="gift-stage">
        <div className="gift-stage__media">
          <img src={media.cafe} alt="Atmósfera cálida de Indian Club" loading="eager" />
        </div>
        <div className="gift-stage__card" aria-label="Vista conceptual de tarjeta Indian Club">
          <span>INDIAN CLUB</span>
          <strong>GIFT CARD</strong>
          <small>LOJA · ECUADOR</small>
        </div>
        <div className="gift-stage__copy">
          <span>Valores disponibles</span>
          <div className="gift-stage__values">
            {giftCards.map((value) => <strong key={value}>{value}</strong>)}
          </div>
          <p>Consulta disponibilidad, forma de entrega y condiciones directamente con el centro.</p>
          <a className="final-button" href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar una tarjeta ↗</a>
        </div>
      </section>

      <section className="gift-ritual gift-ritual--clean">
        <article><h2>Elige el valor</h2><p>Selecciona entre USD 10, 20, 30, 40 o 50.</p></article>
        <article><h2>Confirma los datos</h2><p>Indica para quién es y consulta la forma de entrega disponible.</p></article>
        <article><h2>Úsala en Indian</h2><p>La persona podrá aplicarla a los servicios disponibles según las condiciones vigentes.</p></article>
      </section>
    </>
  );
}
