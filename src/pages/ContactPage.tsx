import { BookingBand } from '../components/BookingBand';
import { PageHero } from '../components/PageHero';
import { Seo } from '../components/Seo';
import { bookingUrl } from '../data/site';

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contacto"
        description="Información de llegada y contacto de Indian Club en Loja, Ecuador. Reserva tu cita mediante el flujo actual de AgendaPro."
      />
      <PageHero
        index="05 / LLEGAR"
        eyebrow="Contacto"
        title="La experiencia empieza "
        accent="antes de abrir la puerta."
        description="Dirección, horarios, canales de soporte y políticas se publicarán únicamente después de validarlos con la operación de Indian Club."
      />

      <section className="contact-board">
        <div className="contact-board__map" role="img" aria-label="Mapa conceptual de Loja, Ecuador">
          <span>LOJA / ECUADOR</span>
          <div aria-hidden="true">IC</div>
        </div>
        <div className="contact-board__details">
          <div>
            <span>Ciudad</span>
            <strong>Loja, Ecuador</strong>
          </div>
          <div>
            <span>Dirección exacta</span>
            <strong>Por validar con el cliente</strong>
          </div>
          <div>
            <span>Horarios</span>
            <strong>Por validar con la operación</strong>
          </div>
          <div>
            <span>Reservas</span>
            <a href={bookingUrl} target="_blank" rel="noreferrer">Abrir flujo actual ↗</a>
          </div>
        </div>
      </section>

      <section className="contact-principles">
        <article><span>01</span><h2>Antes de llegar</h2><p>Revisa servicio, duración y disponibilidad en el flujo de reserva.</p></article>
        <article><span>02</span><h2>Durante la visita</h2><p>Conversa sobre rutina, expectativas y mantenimiento antes de iniciar.</p></article>
        <article><span>03</span><h2>Después</h2><p>Conserva las recomendaciones y vuelve cuando la forma lo necesite, no por presión artificial.</p></article>
      </section>

      <BookingBand />
    </>
  );
}
