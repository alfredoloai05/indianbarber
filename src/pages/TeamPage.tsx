import { BookingBand } from '../components/BookingBand';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { team } from '../data/site';

export function TeamPage() {
  return (
    <>
      <Seo
        title="Equipo"
        description="Conoce el criterio, el oficio y las especialidades que sostienen la experiencia de Indian Club en Loja."
      />
      <PageHero
        index="02 / PERSONAS"
        eyebrow="El equipo"
        title="La confianza no nace de una foto. "
        accent="Nace del oficio."
        description="Cada perfil se presenta por su manera de observar, decidir y cuidar el resultado. La afinidad importa, pero la evidencia técnica importa más."
      />

      <section className="team-ledger">
        {team.map((member, index) => (
          <article className="team-entry" key={member.name}>
            <div className={`team-entry__portrait team-entry__portrait--${index + 1}`} role="img" aria-label={`${member.name}, ${member.role}`}>
              <span>IC / 0{index + 1}</span>
            </div>
            <div className="team-entry__copy">
              <span>0{index + 1}</span>
              <h2>{member.name}</h2>
              <p>{member.role}</p>
              <blockquote>{member.statement}</blockquote>
            </div>
          </article>
        ))}
      </section>

      <section className="craft-code">
        <div><span>01</span><strong>Escucha</strong><p>La referencia visual nunca reemplaza la conversación.</p></div>
        <div><span>02</span><strong>Técnica</strong><p>La forma se construye con proporción, textura y mantenimiento real.</p></div>
        <div><span>03</span><strong>Responsabilidad</strong><p>No prometemos resultados que el servicio o la rutina no puedan sostener.</p></div>
      </section>

      <BookingBand />
    </>
  );
}
