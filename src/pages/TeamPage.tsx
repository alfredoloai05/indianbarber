import { motion, useReducedMotion } from 'framer-motion';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { useGlobalSettings, useTeamMembersContent, useTeamPageContent } from '../content/useSiteContent';

export function TeamPage() {
  const reduceMotion = useReducedMotion();
  const settings = useGlobalSettings();
  const team = useTeamMembersContent();
  const content = useTeamPageContent();

  return (
    <>
      <Seo
        title="Equipo"
        description={`Conoce al equipo profesional de ${settings.brandName} en Loja.`}
      />

      <section className="chapter-intro chapter-intro--brand chapter-intro--clean">
        <div>
          <p className="final-kicker">{content.eyebrow}</p>
          <h1>{content.title}</h1>
        </div>
        <p className="chapter-intro__aside">{content.description}</p>
        <motion.img
          className="chapter-intro__brand-mark"
          src={settings.logoMark}
          alt=""
          initial={reduceMotion ? false : { opacity: 0, scale: 0.72, rotate: -6 }}
          animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </section>

      <section className="team-portraits team-portraits--official" aria-label={`Equipo de ${settings.brandName}`}>
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
              <span>{settings.brandName.toUpperCase()}</span>
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
          <span>{content.collaborationEyebrow}</span>
          <h2>{content.collaborationTitle}</h2>
          <p>{content.collaborationDescription}</p>
        </div>
        <div className="team-collaboration__areas team-collaboration__areas--four">
          <article><strong>Barbería</strong><p>Cortes, barba, afeitado y recomendaciones de mantenimiento.</p></article>
          <article><strong>SPA</strong><p>Bienestar, relajación y cuidado personal con reserva previa.</p></article>
          <article><strong>Nails Studio</strong><p>Manicura, pedicura, sistemas semipermanentes y retiro.</p></article>
          <article><strong>Estudio Fotográfico</strong><p>Retrato, marca personal y contenido visual dentro de Indian Club.</p></article>
        </div>
      </section>

      <section className="team-callout team-callout--brand">
        <img src={settings.logoMark} alt="" />
        <span>Reserva con el equipo</span>
        <h2>{content.bookingTitle}</h2>
        <p>{content.bookingDescription}</p>
      </section>

      <BookingBand />
    </>
  );
}
