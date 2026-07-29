import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { bookingUrl, promotions } from '../data/site';

export function PromotionsPage() {
  return (
    <>
      <Seo
        title="Promociones"
        description="Promociones vigentes de Indian Club para barbería, nails, tattoo y fechas especiales en Loja."
      />

      <section className="chapter-intro chapter-intro--clean">
        <div>
          <p className="final-kicker">Promociones</p>
          <h1>Beneficios disponibles <em>en Indian Club.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Revisa las condiciones principales y confirma disponibilidad directamente con el centro antes de reservar.
        </p>
      </section>

      <section className="promotions-stage promotions-stage--clean">
        {promotions.map((promotion) => (
          <a href={bookingUrl} target="_blank" rel="noreferrer" key={promotion.title}>
            <div><small>{promotion.eyebrow}</small><h2>{promotion.title}</h2></div>
            <p>{promotion.note}</p>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
        <a href={bookingUrl} target="_blank" rel="noreferrer">
          <div><small>Mayores de 55 años</small><h2>20% en servicios de barbería</h2></div>
          <p>Beneficio sujeto a validación y preconfirmación del centro.</p>
          <i aria-hidden="true">↗</i>
        </a>
      </section>

      <section className="promotion-terms">
        <div><span>Condiciones</span><h2>Lo que debes saber antes de reservar.</h2></div>
        <ul>
          <li>Las promociones están sujetas a preconfirmación del centro.</li>
          <li>No son acumulables con otras ofertas.</li>
          <li>La disponibilidad depende del servicio, profesional y horario.</li>
          <li>Presenta el documento o carnet correspondiente cuando la promoción lo requiera.</li>
        </ul>
      </section>

      <BookingBand />
    </>
  );
}
