import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookingBand } from '../components/BookingBand';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { WhatsappInquiryForm } from '../components/WhatsappInquiryForm';
import {
  type JournalArticleContent,
  type PromotionContent,
  type StyleBookFrame,
  type TeamMemberContent,
  useGlobalSettings,
  useJournalArticlesContent,
  usePromotionsContent,
  useServiceCatalogContent,
  useSpacesContent,
  useStyleBookContent,
  useTeamMembersContent,
} from '../content/useSiteContent';
import type { ServiceCatalogArea, SpaceId } from '../data/serviceCatalog';
import { bookingPath } from '../utils/booking';
import { spacePath } from '../utils/spaces';

function memberMatchesSpace(member: TeamMemberContent, id: SpaceId) {
  if (member.areas?.length) return member.areas.includes(id);
  if (/ceo|coordinador/i.test(member.role)) return false;
  if (id === 'barberia') return /barber/i.test(member.role);
  if (id === 'nails') return /manicur|nails|uña/i.test(member.role);
  if (id === 'spa') return /spa|esteti|facial|masaj/i.test(member.role);
  return /fotograf|contenido visual/i.test(member.role);
}

function frameMatchesSpace(frame: StyleBookFrame, id: SpaceId) {
  if (frame.areas?.length) return frame.areas.includes(id);
  const label = frame.label.toLowerCase();
  if (id === 'nails') return /nail|uña/.test(label);
  if (id === 'spa') return /spa|bienestar/.test(label);
  if (id === 'fotografia') return /foto|retrato|contenido/.test(label);
  return !/nail|uña|spa|bienestar|foto|retrato|contenido/.test(label);
}

function articleMatchesSpace(article: JournalArticleContent, id: SpaceId) {
  if (article.areas?.length) return article.areas.includes(id);
  const text = `${article.type} ${article.title}`.toLowerCase();
  if (id === 'nails') return /nail|uña/.test(text);
  if (id === 'spa') return /spa|bienestar|facial|relaj/.test(text);
  if (id === 'fotografia') return /foto|retrato|cámara|sesión/.test(text);
  return /barber|cabello|corte|barba/.test(text);
}

function promotionMatchesSpace(promotion: PromotionContent, id: SpaceId) {
  if (promotion.areas?.length) return promotion.areas.includes(id);
  const text = `${promotion.eyebrow} ${promotion.title}`.toLowerCase();
  if (/barber/.test(text)) return id === 'barberia';
  if (/nail|uña/.test(text) && /spa/.test(text)) return id === 'nails' || id === 'spa';
  if (/nail|uña/.test(text)) return id === 'nails';
  if (/spa/.test(text)) return id === 'spa';
  if (/foto|retrato/.test(text)) return id === 'fotografia';
  return true;
}

function fallbackProfessional(area: ServiceCatalogArea): TeamMemberContent {
  return {
    name: `Equipo ${area.shortTitle} Indian`,
    role: 'Profesional asignado según disponibilidad',
    statement: 'La persona responsable se confirma junto con la fecha, el servicio y el horario solicitado.',
    image: area.media.poster,
    areas: [area.id],
  };
}

export function SpacePage({ spaceId }: { spaceId: SpaceId }) {
  const settings = useGlobalSettings();
  const catalog = useServiceCatalogContent();
  const pages = useSpacesContent();
  const allTeam = useTeamMembersContent();
  const styleBook = useStyleBookContent();
  const allArticles = useJournalArticlesContent();
  const allPromotions = usePromotionsContent();
  const area = catalog.find((item) => item.id === spaceId);
  const page = pages.find((item) => item.id === spaceId);
  const services = useMemo(
    () => area?.groups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title }))) ?? [],
    [area],
  );
  const [selectedName, setSelectedName] = useState(services[0]?.name ?? '');
  const selectedService = services.find((item) => item.name === selectedName) ?? services[0];

  if (!area || !page) return null;

  const team = allTeam.filter((member) => memberMatchesSpace(member, spaceId));
  const visibleTeam = team.length ? team : [fallbackProfessional(area)];
  const frames = styleBook.frames.filter((frame) => frameMatchesSpace(frame, spaceId));
  const articles = allArticles.filter((article) => articleMatchesSpace(article, spaceId));
  const promotions = allPromotions.filter((promotion) => promotionMatchesSpace(promotion, spaceId));
  const activeMedia = selectedService?.media ?? area.media;

  return (
    <>
      <Seo title={area.title} description={page.lead} />

      <section className={`space-hero space-hero--${spaceId}`}>
        <div className="space-hero__media">
          {area.media.video ? (
            <ViewportVideo src={area.media.video} poster={area.media.poster} label={`${area.title} en ${settings.brandName}`} priority />
          ) : (
            <img src={area.media.poster} alt={`${area.title} en ${settings.brandName}`} loading="eager" />
          )}
          <div aria-hidden="true" />
        </div>
        <div className="space-hero__copy">
          <Link to="/">Indian House</Link>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
          <div>
            <a href="#servicios">Explorar el espacio ↓</a>
            <Link to={bookingPath(spaceId)}>Reservar ↗</Link>
          </div>
        </div>
      </section>

      <nav className="space-local-nav" aria-label={`Secciones de ${area.title}`}>
        <a href="#servicios">Servicios</a>
        <a href="#equipo">Equipo</a>
        <a href="#style-book">Style Book</a>
        <a href="#consejos">Consejos</a>
        <a href="#beneficios">Beneficios</a>
        <a href="#consulta">Consulta</a>
      </nav>

      <section id="servicios" className="space-services" aria-labelledby="space-services-title">
        <header>
          <h2 id="space-services-title">{page.servicesTitle}</h2>
          <p>{area.summary}</p>
        </header>
        <div className="space-services__workspace">
          <div className="space-service-preview" key={selectedService?.name}>
            {activeMedia.video ? (
              <ViewportVideo
                src={activeMedia.video}
                poster={activeMedia.poster}
                label={selectedService?.name ?? area.title}
              />
            ) : (
              <img src={activeMedia.poster} alt={selectedService?.name ?? area.title} loading="lazy" />
            )}
            <div className="space-service-preview__veil" aria-hidden="true" />
            <div className="space-service-preview__copy">
              <span>{selectedService?.group}</span>
              <h3>{selectedService?.name}</h3>
              <p>{selectedService?.note ?? area.summary}</p>
              <div><strong>{selectedService?.duration}</strong><b>{selectedService?.price}</b></div>
              <Link to={bookingPath(spaceId, selectedService?.name)}>Reservar este servicio ↗</Link>
            </div>
          </div>

          <div className="space-service-list" role="list">
            {services.map((service) => (
              <button
                type="button"
                className={service.name === selectedService?.name ? 'is-active' : undefined}
                key={service.name}
                onClick={() => setSelectedName(service.name)}
              >
                <span>{service.group}</span>
                <strong>{service.name}</strong>
                <small>{service.duration} · {service.price}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="equipo" className="space-team" aria-labelledby="space-team-title">
        <header><h2 id="space-team-title">{page.teamTitle}</h2></header>
        <div className="space-team__grid">
          {visibleTeam.map((member) => (
            <article key={member.name}>
              <img src={member.image} alt={`${member.name}, ${member.role}`} loading="lazy" />
              <div><span>{member.role}</span><h3>{member.name}</h3><p>{member.statement}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section id="style-book" className="space-stylebook" aria-labelledby="space-stylebook-title">
        <header>
          <h2 id="space-stylebook-title">{page.styleBookTitle}</h2>
          <Link to={bookingPath(spaceId)}>Reservar desde una referencia ↗</Link>
        </header>
        <div className="space-stylebook__grid">
          {(frames.length ? frames : styleBook.frames.slice(0, 3)).slice(0, 6).map((frame, index) => (
            <figure key={`${frame.label}-${index}`}>
              <img src={frame.image} alt={frame.alt} loading="lazy" />
              <figcaption>{frame.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="consejos" className="space-journal" aria-labelledby="space-journal-title">
        <header><h2 id="space-journal-title">{page.adviceTitle}</h2></header>
        <div className="space-journal__grid">
          {articles.slice(0, 3).map((article) => (
            <Link to={`/inspirate/${article.slug}`} key={article.slug}>
              <img src={article.image} alt="" loading="lazy" />
              <div><span>{article.type}</span><h3>{article.title}</h3><p>{article.excerpt}</p><i>Leer guía ↗</i></div>
            </Link>
          ))}
        </div>
      </section>

      <section id="beneficios" className="space-benefits" aria-labelledby="space-benefits-title">
        <header><h2 id="space-benefits-title">{page.benefitsTitle}</h2></header>
        <div className="space-benefits__grid">
          {page.benefits.map((benefit) => (
            <article key={benefit.title}><h3>{benefit.title}</h3><p>{benefit.description}</p></article>
          ))}
        </div>
        {promotions.length ? (
          <div className="space-promotions">
            {promotions.map((promotion) => (
              <Link to={bookingPath(spaceId)} key={promotion.title}>
                <span>{promotion.eyebrow}</span><strong>{promotion.title}</strong><p>{promotion.note}</p><i>↗</i>
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <div id="consulta" className="space-inquiry-wrap">
        <WhatsappInquiryForm
          title={page.inquiryTitle}
          lead={page.inquiryLead}
          context={area.title}
        />
      </div>

      <BookingBand area={spaceId} service={selectedService?.name} />

      <nav className="space-next" aria-label="Explorar otros espacios de Indian House">
        {catalog.filter((item) => item.id !== spaceId).map((item) => (
          <Link to={spacePath(item.id)} key={item.id}>{item.title} ↗</Link>
        ))}
      </nav>
    </>
  );
}
