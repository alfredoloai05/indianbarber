import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { giftCards } from '../data/catalog';
import { brand, contact, media } from '../data/site';

export function HomeGiftCards() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="home-gift" aria-labelledby="home-gift-title">
      <div className="home-gift__media" aria-hidden="true">
        <img src={media.cafe} alt="" loading="lazy" />
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
          <img src={brand.logoMark} alt="" />
          <span>INDIAN CLUB</span>
        </div>
        <strong>GIFT CARD</strong>
        <div className="home-gift__card-bottom">
          <span>LOJA · ECUADOR</span>
          <span>USD 10—50</span>
        </div>
      </motion.div>

      <motion.div
        className="home-gift__copy"
        initial={reduceMotion ? false : { opacity: 0, x: 36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>Gift Cards</span>
        <h2 id="home-gift-title">Regala Indian Club.</h2>
        <p>Tarjetas de USD 10 a USD 50 para utilizar en los servicios disponibles del club.</p>
        <div className="home-gift__values" aria-label="Valores disponibles">
          {giftCards.map((value) => <i key={value}>{value}</i>)}
        </div>
        <div className="home-gift__actions">
          <Link to="/tarjetas-regalo">Ver Gift Cards ↗</Link>
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer">Solicitar por WhatsApp</a>
        </div>
      </motion.div>
    </section>
  );
}
