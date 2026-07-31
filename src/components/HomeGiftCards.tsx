import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGlobalSettings, useHomeGiftCards } from '../content/useSiteContent';

export function HomeGiftCards() {
  const reduceMotion = useReducedMotion();
  const content = useHomeGiftCards();
  const settings = useGlobalSettings();
  const valuesLabel = content.values
    .map((value) => value.replace(/[^0-9]/g, ''))
    .filter(Boolean)
    .join('—');

  return (
    <section className="home-gift" aria-labelledby="home-gift-title">
      <div className="home-gift__media" aria-hidden="true">
        <img src={content.image} alt="" loading="lazy" />
        <div className="home-gift__veil" />
      </div>

      <motion.div
        className="home-gift__card"
        initial={reduceMotion ? false : { opacity: 0, y: 42, rotate: -7 }}
        whileInView={{ opacity: 1, y: 0, rotate: -4 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="home-gift__card-top">
          <img src={settings.logoMark} alt="" />
          <span>{settings.brandName.toUpperCase()}</span>
        </div>
        <strong>GIFT CARD</strong>
        <div className="home-gift__card-bottom">
          <span>LOJA · ECUADOR</span>
          <span>{valuesLabel ? `USD ${valuesLabel}` : 'VALOR A ELECCIÓN'}</span>
        </div>
      </motion.div>

      <motion.div
        className="home-gift__copy"
        initial={reduceMotion ? false : { opacity: 0, x: 36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>{content.eyebrow}</span>
        <h2 id="home-gift-title">{content.title}</h2>
        <p>{content.description}</p>
        <div className="home-gift__values" aria-label="Valores disponibles">
          {content.values.map((value) => <i key={value}>{value}</i>)}
        </div>
        <div className="home-gift__actions">
          <Link to="/tarjetas-regalo">{content.primaryLabel} ↗</Link>
          <a href={settings.whatsappHref} target="_blank" rel="noreferrer">{content.secondaryLabel}</a>
        </div>
      </motion.div>
    </section>
  );
}
