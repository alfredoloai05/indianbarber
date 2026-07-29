import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { contact, media } from '../data/site';

export function ClubPage() {
  return (
    <>
      <Seo
        title="La casa"
        description="Descubre Indian Club en Loja: barbería, nails, tattoo studio, cafetería y parqueo exclusivo en una misma casa."
      />

      <section className="chapter-intro chapter-intro--clean">
        <div>
          <p className="final-kicker">El Club</p>
          <h1>Barbería, tattoo, nails y café. <em>Todo en un solo lugar.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Estamos en el centro de Loja y contamos con cafetería, parqueo exclusivo y distintas áreas de servicio dentro de la misma casa.
        </p>
      </section>

      <section className="house-film house-film--clean">
        <div className="house-film__main">
          <img src={media.cafe} alt="Cafetería de ambiente oscuro y cálido" loading="eager" />
          <div><span>Cafetería</span><strong>Un espacio para llegar con tiempo</strong></div>
        </div>
        <div className="house-film__side">
          <img src={media.exterior} alt="Fachada nocturna de Indian Club" loading="lazy" />
          <div><span>Centro de Loja</span><strong>Fácil de encontrar y con parqueo</strong></div>
        </div>
      </section>

      <section className="house-manifesto house-manifesto--direct">
        <div>
          <span>La experiencia completa</span>
          <h2>Tu servicio, la atención y el espacio funcionan juntos.</h2>
        </div>
        <p>
          Puedes reservar barbería, tattoo o nails, llegar con tiempo, usar el parqueo y disfrutar la cafetería antes o después de tu cita.
        </p>
      </section>

      <section className="house-program house-program--complete house-program--clean">
        <article>
          <h2>Cafetería</h2>
          <p>Bebidas y un espacio para esperar o conversar antes y después del servicio.</p>
        </article>
        <article>
          <h2>Parqueo</h2>
          <p>Parqueo exclusivo para clientes durante su visita a Indian Club.</p>
        </article>
        <article>
          <h2>Tattoo Studio</h2>
          <p>Cotización, diseño y tatuaje dentro de un área especializada.</p>
        </article>
        <article>
          <h2>Nails Studio</h2>
          <p>Manicura, pedicura y sistemas semipermanentes en la misma casa.</p>
        </article>
      </section>

      <section className="house-location">
        <div>
          <span>Visítanos</span>
          <h2>{contact.address}</h2>
          <p>{contact.city}</p>
          <a className="final-button" href={contact.mapHref} target="_blank" rel="noreferrer">Abrir en Maps ↗</a>
        </div>
        <div>
          {contact.hours.map((item) => (
            <div key={item.days}><span>{item.days}</span><strong>{item.value}</strong></div>
          ))}
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer">Consultar por WhatsApp ↗</a>
        </div>
      </section>

      <section className="house-quote house-quote--final house-quote--direct">
        <blockquote>Conoce los trabajos realizados por el equipo de Indian Club.</blockquote>
        <Link to="/style-book">Abrir Style Book ↗</Link>
      </section>

      <BookingBand />
    </>
  );
}
