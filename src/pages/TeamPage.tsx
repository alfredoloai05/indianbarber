import { motion, useReducedMotion } from 'framer-motion';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { brand, team } from '../data/site';

export function TeamPage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Seo
        title="Equipo"
        description="Conoce a René Chamba, César Castejón, Alisson Ruiz, Santiago Vivanco y Adrián Pardo, profesionales de Indian Club Loja."
      />

      <section className="chapter-intro chapter-intro--brand chapter-intro--clean">
        <div>
          <p className="final-kicker">Equipo Indian Club</p>
          <h1>Barbería, tattoo y nails. <em>Personas que conocen su oficio.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Conoce al equipo y encuentra al profesional adecuado para el servicio que quieres reservar.
        </p>
        <motion.img
          className="chapter-intro__brand-mark"
          src={brand.logoMark}
          alt=""
          initial={reduceMotion ? false : { opacity: 0, scale: 0.72, rotate: -6 }}
          animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </section>

      <section className="team-portraits team-portraits--official" aria-label="Equipo de Indian Club">
        {team.map((member, index) => (
          <motion.article
            className="team-portrait"
            key={member.name}
            initial={reduceMotion ? false : { opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="team-portrait__media team-portrait__media--official">
              <motion.img
                src={member.image}
                alt={`${member.name}: ${member.role}`}
                loading={index < 2 ? 'eager' : 'lazy'}
                whileHover={reduceMotion ? undefined : { scale: 1.04, rotate: index % 2 === 0 ? -1 : 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
              <span>INDIAN CLUB</span>
              <i aria-hidden="true" />
            </div>
            <div className="team-portrait__copy">
              <small>{member.role}</small>
              <h2>{member.name}</h2>
              <blockquote>“{member.statement}”</blockquote>
              <div className="team-portrait__brand-code" aria-hidden="true">
                <span>R</span><i /><span>B</span>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="team-collaboration">
        <div className="team-collaboration__intro">
          <span>Trabajo en equipo</span>
          <h2>Tres especialidades dentro de la misma casa.</h2>
          <p>
            Barbería, tattoo y nails comparten el espacio y la atención para que puedas combinar distintos servicios en una sola visita.
          </p>
        </div>
        <div className="team-collaboration__areas">
          <article><strong>Barbería</strong><p>Cortes, barba, afeitado y recomendaciones de mantenimiento.</p></article>
          <article><strong>Tattoo Studio</strong><p>Cotización, diseño, preparación y cuidado posterior.</p></article>
          <article><strong>Nails Studio</strong><p>Manicura, pedicura, sistemas semipermanentes y retiro.</p></article>
        </div>
      </section>

      <section className="team-callout team-callout--brand">
        <img src={brand.logoMark} alt="" />
        <span>Reserva con el equipo</span>
        <h2>Elige el servicio y revisa quién está disponible.</h2>
        <p>AgendaPro te permite consultar horarios y seleccionar al profesional para tu próxima visita.</p>
      </section>

      <BookingBand />
    </>
  );
}
