import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { useGlobalSettings, usePromotionsContent } from '../content/useSiteContent';

export function PromotionsPage() {
  const promotions = usePromotionsContent();
  const settings = useGlobalSettings();

  return (
    <>
      <Seo
        title="Promociones"
        description={`Promociones vigentes de ${settings.brandName} para barbería, nails, SPA y fechas especiales en Loja.`}
      />

      <section className="chapter-intro chapter-intro--clean">
        <div>
          <p className="final-kicker">Promociones</p>
          <h1>Beneficios disponibles <em>en {settings.brandName}.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Revisa las condiciones principales y confirma disponibilidad directamente con el centro antes de reservar.
        </p>
      </section>

      <section className="promotions-stage promotions-stage--clean">
        {promotions.map((promotion) => (
          <a href={settings.bookingUrl} target="_blank" rel="noreferrer" key={promotion.title}>
            <div><small>{promotion.eyebrow}</small><h2>{promotion.title}</h2></div>
            <p>{promotion.note}</p>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
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
