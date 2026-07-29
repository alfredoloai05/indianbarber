import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { bookingUrl, brand, contact } from '../data/site';
import { visualMedia } from '../data/visualMedia';

export function ClubPage() {
  return (
    <>
      <Seo
        title="El Club"
        description="Conoce Indian Club en Loja: barbería, nails, tattoo studio, cafetería y parqueo exclusivo en una misma casa."
      />

      <section className="club-visual-hero" aria-labelledby="club-visual-title">
        <ViewportVideo
          src={visualMedia.clubFeature.video}
          poster={visualMedia.clubFeature.poster}
          label="Ambiente de Indian Club"
          priority
        />
        <div className="club-visual-hero__veil" />
        <div className="club-visual-hero__copy">
          <img src={brand.logoLockup} alt="Indian Club" />
          <span>El Club · Loja</span>
          <h1 id="club-visual-title">Todo Indian en un solo lugar.</h1>
          <p>Barbería, tattoo, nails, café y parqueo para que tu visita sea cómoda desde que llegas.</p>
          <div>
            <a href={bookingUrl} target="_blank" rel="noreferrer">Reservar cita ↗</a>
            <a href={contact.mapHref} target="_blank" rel="noreferrer">Cómo llegar</a>
          </div>
        </div>
      </section>

      <section className="club-visual-grid" aria-label="Espacios y servicios de Indian Club">
        <article className="club-visual-grid__feature">
          <ViewportVideo
            src={visualMedia.hero.club.video}
            poster={visualMedia.hero.club.poster}
            label="Cafetería y ambiente del club"
          />
          <div><span>Cafetería</span><strong>Llega con tiempo, toma algo y disfruta el espacio.</strong></div>
        </article>

        <article>
          <img src={visualMedia.hero.barber.poster} alt="Servicio de barbería" loading="lazy" />
          <div><span>Barbería</span><strong>Corte, barba y afeitado.</strong></div>
        </article>

        <article>
          <img src={visualMedia.hero.tattoo.poster} alt="Tattoo Studio" loading="lazy" />
          <div><span>Tattoo Studio</span><strong>Diseño, cotización y tatuaje.</strong></div>
        </article>

        <article>
          <img src={visualMedia.hero.nails.poster} alt="Nails Studio" loading="lazy" />
          <div><span>Nails Studio</span><strong>Manicura, pedicura y sistemas semipermanentes.</strong></div>
        </article>
      </section>

      <section className="club-amenities" aria-labelledby="club-amenities-title">
        <div>
          <span>Antes y después de tu cita</span>
          <h2 id="club-amenities-title">Un espacio para disfrutar la visita completa.</h2>
        </div>
        <div className="club-amenities__list">
          <article><strong>Parqueo exclusivo</strong><p>Estaciona durante tu visita sin buscar espacio en el centro.</p></article>
          <article><strong>Cafetería</strong><p>Bebidas y un ambiente cómodo para esperar o conversar.</p></article>
          <article><strong>Todo en la misma casa</strong><p>Barbería, tattoo y nails sin desplazarte a distintos lugares.</p></article>
        </div>
      </section>

      <section className="club-visit-compact" aria-labelledby="club-visit-title">
        <div>
          <span>Visítanos</span>
          <h2 id="club-visit-title">{contact.address}</h2>
          <p>{contact.city}</p>
        </div>
        <div className="club-visit-compact__hours">
          {contact.hours.map((item) => (
            <p key={item.days}><span>{item.days}</span><strong>{item.value}</strong></p>
          ))}
        </div>
        <div className="club-visit-compact__actions">
          <a href={contact.mapHref} target="_blank" rel="noreferrer">Abrir mapa ↗</a>
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp ↗</a>
          <a className="club-visit-compact__booking" href={bookingUrl} target="_blank" rel="noreferrer">Reservar ahora ↗</a>
        </div>
      </section>

      <section className="club-work-link">
        <span>Conoce el trabajo del equipo</span>
        <Link to="/style-book">Abrir Style Book ↗</Link>
      </section>
    </>
  );
}
