import { Seo } from '../components/Seo';
import { useGiftCardsPageContent, useGlobalSettings } from '../content/useSiteContent';

export function GiftCardsPage() {
  const content = useGiftCardsPageContent();
  const settings = useGlobalSettings();

  return (
    <>
      <Seo
        title="Tarjetas regalo"
        description={`Tarjetas regalo de ${settings.brandName} para servicios de cuidado personal en Loja.`}
      />

      <section className="chapter-intro chapter-intro--clean">
        <div>
          <p className="final-kicker">{content.eyebrow}</p>
          <h1>{content.title}</h1>
        </div>
        <p className="chapter-intro__aside">{content.description}</p>
      </section>

      <section className="gift-stage">
        <div className="gift-stage__media">
          <img src={content.image} alt={`Atmósfera de ${settings.brandName}`} loading="eager" />
        </div>
        <div className="gift-stage__card" aria-label={`Vista conceptual de tarjeta ${settings.brandName}`}>
          <span>{settings.brandName.toUpperCase()}</span>
          <strong>GIFT CARD</strong>
          <small>LOJA · ECUADOR</small>
        </div>
        <div className="gift-stage__copy">
          <span>Valores disponibles</span>
          <div className="gift-stage__values">
            {content.values.map((value) => <strong key={value}>{value}</strong>)}
          </div>
          <p>{content.description}</p>
          <a className="final-button" href={settings.whatsappHref} target="_blank" rel="noreferrer">{content.buttonLabel} ↗</a>
        </div>
      </section>

      <section className="gift-ritual gift-ritual--clean">
        {content.steps.map((step) => (
          <article key={step.title}><h2>{step.title}</h2><p>{step.description}</p></article>
        ))}
      </section>
    </>
  );
}
