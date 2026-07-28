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

      <section className="chapter-intro">
        <div className="chapter-intro__index">07 / REGALAR</div>
        <div>
          <p className="final-kicker">Tarjetas Indian Club</p>
          <h1>No regales una cosa. <em>Regala un momento bien elegido.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Elige un valor y confirma la compra con Indian Club. La tarjeta puede aplicarse a servicios disponibles según sus condiciones vigentes.
        </p>
      </section>

      <section className="gift-stage">
        <div className="gift-stage__media">
          <img src={media.cafe} alt="Atmósfera cálida de Indian Club" loading="eager" />
        </div>
        <div className="gift-stage__card" aria-label="Vista conceptual de tarjeta Indian Club">
          <span>INDIAN CLUB</span>
          <strong>HOUSE OF PRESENCE</strong>
          <small>GIFT CARD / LOJA</small>
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

      <section className="gift-ritual">
        <article><span>01</span><h2>Elige el valor</h2><p>Selecciona entre USD 10, 20, 30, 40 o 50.</p></article>
        <article><span>02</span><h2>Personaliza</h2><p>Indica para quién es y confirma el mensaje o forma de entrega.</p></article>
        <article><span>03</span><h2>Entrega presencia</h2><p>La persona podrá consultar el servicio disponible que mejor corresponda a su intención.</p></article>
      </section>
    </>
  );
}
