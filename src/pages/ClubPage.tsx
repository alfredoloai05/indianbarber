import { BookingBand } from '../components/BookingBand';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';

export function ClubPage() {
  return (
    <>
      <Seo
        title="La casa"
        description="Descubre Indian Club: una casa de grooming, arte, café y cultura diseñada para bajar el ritmo y cuidar la presencia."
      />
      <PageHero
        index="03 / LA CASA"
        eyebrow="Club, café y cultura"
        title="No vienes solamente a "
        accent="ocupar una silla."
        description="Indian Club se entiende como lugar: una atmósfera que acompaña el oficio, abre conversación y permite que cada visita tenga memoria."
      />

      <section className="house-story">
        <div className="house-story__visual house-story__visual--main" role="img" aria-label="Interior cinematográfico de Indian Club">
          <span>HOUSE / 01</span>
        </div>
        <div className="house-story__copy">
          <p className="eyebrow">Una casa real</p>
          <h2>Materiales con peso. Luz con intención. Tiempo sin prisa artificial.</h2>
          <p>Negro, metal, madera, cuero y cerámica no aparecen como decoración digital. Son la base material de una experiencia que debe sentirse igual en pantalla y en el espacio.</p>
        </div>
      </section>

      <section className="house-program">
        <article>
          <span>01</span>
          <h2>Café</h2>
          <p>Una pausa real antes o después del servicio. Sin convertir la hospitalidad en una promesa vacía.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Arte</h2>
          <p>Colaboraciones y obra con criterio curatorial, no decoración intercambiable.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Eventos</h2>
          <p>Encuentros que extienden la comunidad y dan una razón para volver más allá de la cita.</p>
        </article>
      </section>

      <section className="house-quote">
        <blockquote>“La imagen que atrae debe coincidir con el lugar que recibe.”</blockquote>
        <span>Regla de experiencia Indian Club</span>
      </section>

      <section className="visit-note">
        <div>
          <span>Visita</span>
          <h2>Llega con unos minutos de margen.</h2>
        </div>
        <p>La dirección, horarios y medios de contacto deben validarse con el cliente antes del lanzamiento. Hasta entonces no inventamos datos operativos.</p>
      </section>

      <BookingBand />
    </>
  );
}
