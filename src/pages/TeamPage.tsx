import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { team } from '../data/site';

export function TeamPage() {
  return (
    <>
      <Seo
        title="Equipo"
        description="Conoce las disciplinas y el estándar de oficio que sostienen barbería, nails, tattoo y hospitalidad en Indian Club Loja."
      />

      <section className="chapter-intro">
        <div className="chapter-intro__index">02 / PERSONAS</div>
        <div>
          <p className="final-kicker">El equipo Indian</p>
          <h1>Cuatro disciplinas. <em>Un mismo estándar de cuidado.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          En esta versión presentamos las áreas de oficio de la casa. Al confirmar el equipo definitivo, cada perfil podrá mostrar nombre, especialidad y agenda sin cambiar la arquitectura.
        </p>
      </section>

      <section className="team-portraits" aria-label="Disciplinas del equipo Indian Club">
        {team.map((member, index) => (
          <article className="team-portrait" key={member.name}>
            <div className="team-portrait__media">
              <img src={member.image} alt={`${member.name}: ${member.role}`} loading="lazy" />
              <span>IC / 0{index + 1}</span>
            </div>
            <div className="team-portrait__copy">
              <small>{member.role}</small>
              <h2>{member.name}</h2>
              <blockquote>“{member.statement}”</blockquote>
            </div>
          </article>
        ))}
      </section>

      <section className="craft-code craft-code--complete">
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

      <section className="team-callout">
        <span>Elegir profesional</span>
        <h2>La afinidad importa. La evidencia técnica importa más.</h2>
        <p>En AgendaPro podrás revisar disponibilidad y elegir el profesional disponible para el ritual que necesitas.</p>
      </section>

      <BookingBand />
    </>
  );
}
