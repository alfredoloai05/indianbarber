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

      <section className="chapter-intro chapter-intro--brand">
        <div className="chapter-intro__index">02 / PERSONAS</div>
        <div>
          <p className="final-kicker">El equipo Indian</p>
          <h1>La marca tiene rostro. <em>Y el oficio tiene nombre.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Esta página utiliza los nombres, especialidades y retratos publicados por Indian Club. Ya no presenta disciplinas genéricas: presenta a las personas de la casa.
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
              <span>INDIAN / 0{index + 1}</span>
              <i aria-hidden="true" />
            </div>
            <div className="team-portrait__copy">
              <small>{member.role}</small>
              <h2>{member.name}</h2>
              <blockquote>“{member.statement}”</blockquote>
              <div className="team-portrait__brand-code">
                <span>R</span><i /><span>B</span>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="craft-code craft-code--complete craft-code--brand">
        <header>
          <span>El código de la casa</span>
          <h2>La confianza se construye con conductas visibles.</h2>
        </header>
        <div>
          <article><span>01</span><strong>Escuchar antes</strong><p>La referencia visual abre una conversación; nunca reemplaza el diagnóstico.</p></article>
          <article><span>02</span><strong>Explicar con claridad</strong><p>Tiempo, alcance, mantenimiento y límites se entienden antes de iniciar.</p></article>
          <article><span>03</span><strong>Ejecutar con higiene</strong><p>Herramientas, preparación y cuidado responden al servicio y a la persona.</p></article>
          <article><span>04</span><strong>Cerrar bien</strong><p>El resultado incluye recomendaciones para sostenerlo fuera de Indian.</p></article>
        </div>
      </section>

      <section className="team-callout team-callout--brand">
        <img src={brand.logoMark} alt="" />
        <span>Elegir profesional</span>
        <h2>La afinidad importa. La evidencia técnica importa más.</h2>
        <p>En AgendaPro podrás revisar disponibilidad y elegir al profesional disponible para el ritual que necesitas.</p>
      </section>

      <BookingBand />
    </>
  );
}
