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

      <section className="chapter-intro">
        <div className="chapter-intro__index">03 / LA CASA</div>
        <div>
          <p className="final-kicker">Club, café y cultura</p>
          <h1>No vienes solamente a ocupar una silla. <em>Vienes a habitar un momento.</em></h1>
        </div>
        <p className="chapter-intro__aside">
          Indian Club reúne oficio y hospitalidad en el centro de Loja. La cafetería, el parqueo y el ritmo del espacio reducen fricción alrededor de la cita.
        </p>
      </section>

      <section className="house-film">
        <div className="house-film__main">
          <img src={media.cafe} alt="Cafetería de ambiente oscuro y cálido" loading="eager" />
          <div><span>HOUSE / 01</span><strong>Café y conversación</strong></div>
        </div>
        <div className="house-film__side">
          <img src={media.exterior} alt="Fachada nocturna de un espacio de cuidado personal" loading="lazy" />
          <div><span>HOUSE / 02</span><strong>Llegar sin prisa artificial</strong></div>
        </div>
      </section>

      <section className="house-manifesto">
        <div>
          <span>La conducta de un club</span>
          <h2>Un club premium no se anuncia. Se nota en cómo recibe.</h2>
        </div>
        <p>
          Recibir significa orientar sin presionar, explicar antes de cobrar, cuidar el tiempo, recordar preferencias con consentimiento y dejar que la persona vuelva porque encontró criterio, no por culpa o urgencia.
        </p>
      </section>

      <section className="house-program house-program--complete">
        <article>
          <span>01</span>
          <h2>Cafetería</h2>
          <p>Una pausa antes o después del servicio para convertir la espera en una parte agradable de la visita.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Parqueo</h2>
          <p>Parqueo exclusivo para clientes, pensado para reducir la fricción de llegar al centro de Loja.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Arte y tattoo</h2>
          <p>Una disciplina propia dentro de la casa, con conversación creativa, cotización y cuidado posterior.</p>
        </article>
        <article>
          <span>04</span>
          <h2>Nails Studio</h2>
          <p>Manos y pies trabajados con la misma atención a técnica, higiene y acabado que define el resto de Indian.</p>
        </article>
      </section>

      <section className="house-location">
        <div>
          <span>La casa está aquí</span>
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

      <section className="house-quote house-quote--final">
        <blockquote>“La imagen que atrae debe coincidir con el lugar que recibe.”</blockquote>
        <span>Regla de experiencia Indian Club</span>
        <Link to="/style-book">Ver la atmósfera de la casa ↗</Link>
      </section>

      <BookingBand />
    </>
  );
}
