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

      <section className="chapter-intro">
        <div className="chapter-intro__index">05 / PROMOCIONES</div>
        <div>
          <p className="final-kicker">Ahora en Indian</p>
          <h1>Una buena promoción informa. <em>No persigue.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Todas las promociones se muestran con su condición principal. La aplicación definitiva se confirma directamente con el centro y no son acumulables.
        </p>
      </section>

      <section className="promotions-stage">
        {promotions.map((promotion, index) => (
          <a href={bookingUrl} target="_blank" rel="noreferrer" key={promotion.title}>
            <span>0{index + 1}</span>
            <div><small>{promotion.eyebrow}</small><h2>{promotion.title}</h2></div>
            <p>{promotion.note}</p>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
        <a href={bookingUrl} target="_blank" rel="noreferrer">
          <span>05</span>
          <div><small>Mayores de 55 años</small><h2>20% en servicios de barbería</h2></div>
          <p>Beneficio sujeto a validación y preconfirmación del centro.</p>
          <i aria-hidden="true">↗</i>
        </a>
      </section>

      <section className="promotion-terms">
        <div><span>Condiciones esenciales</span><h2>Claridad antes que urgencia.</h2></div>
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
