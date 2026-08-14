import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ViewportVideo } from '../components/ViewportVideo';
import { WhatsappInquiryForm } from '../components/WhatsappInquiryForm';
import {
  type JournalArticleContent,
  type PromotionContent,
  type StyleBookFrame,
  useGlobalSettings,
  useJournalArticlesContent,
  usePromotionsContent,
  useServiceCatalogContent,
  useSpacesContent,
  useStyleBookContent,
  useTeamMembersContent,
} from '../content/useSiteContent';
import type { SpaceId } from '../data/serviceCatalog';
import { bookingPath } from '../utils/booking';
import { spacePath } from '../utils/spaces';

const sectionDescriptions: Record<SpaceId, {
  team: string;
  styleBook: string;
  advice: string;
}> = {
  barberia: {
    team: 'Conoce a quienes trabajan forma, textura y detalle detrás de cada resultado.',
    styleBook: 'Cortes, barba y acabados para llegar con una referencia más clara.',
    advice: 'Guías breves para mantener el corte y la barba mejor entre una visita y la siguiente.',
  },
  fotografia: {
    team: 'Dirección y acompañamiento para convertir una idea en una sesión con intención.',
    styleBook: 'Retratos, producto y contenido visual para entender el lenguaje del estudio antes de reservar.',
    advice: 'Preparación, vestuario y decisiones prácticas antes de entrar al estudio.',
  },
  nails: {
    team: 'Técnica, preparación e higiene aplicadas a cada sistema y acabado.',
    styleBook: 'Diseños, largos y acabados para elegir una referencia que funcione contigo.',
    advice: 'Cuidados sencillos para prolongar el resultado y proteger la uña natural.',
  },
  spa: {
    team: 'Atención coordinada según el ritual, la valoración y el horario seleccionado.',
    styleBook: 'Ambiente, procesos y referencias para entender mejor la experiencia antes de reservar.',
    advice: 'Recomendaciones para llegar preparado y prolongar el bienestar después de la visita.',
  },
};

const sectionTitles: Record<SpaceId, {
  team: string;
  styleBook: string;
  advice: string;
}> = {
  barberia: {
    team: 'Quienes te atienden.',
    styleBook: 'Resultados y referencias.',
    advice: 'Cuida el resultado.',
  },
  fotografia: {
    team: 'Dirección de la sesión.',
    styleBook: 'Portfolio.',
    advice: 'Antes de tu sesión.',
  },
  nails: {
    team: 'Tu especialista.',
    styleBook: 'Resultados y diseños.',
    advice: 'Cuida tus uñas.',
  },
  spa: {
    team: 'Quienes te acompañan.',
    styleBook: 'Ambiente y rituales.',
    advice: 'Antes y después.',
  },
};

function serviceGroupId(title: string) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function memberMatchesSpace(member: ReturnType<typeof useTeamMembersContent>[number], id: SpaceId) {
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
  const firstGroupTitle = area?.groups[0]?.title ?? '';
  const firstServiceName = area?.groups[0]?.items[0]?.name ?? '';
  const [openGroups, setOpenGroups] = useState<Partial<Record<SpaceId, string>>>({});
  const [selectedServices, setSelectedServices] = useState<Partial<Record<SpaceId, string>>>({});
  const openGroup = openGroups[spaceId] ?? firstGroupTitle;
  const selectedName = selectedServices[spaceId] ?? firstServiceName;
  const selectedService = services.find((item) => item.name === selectedName) ?? services[0];

  if (!area || !page) return null;

  const team = allTeam.filter((member) => memberMatchesSpace(member, spaceId));
  const frames = styleBook.frames.filter((frame) => frameMatchesSpace(frame, spaceId)).slice(0, 6);
  const articles = allArticles.filter((article) => articleMatchesSpace(article, spaceId)).slice(0, 3);
  const promotions = allPromotions.filter((promotion) => promotionMatchesSpace(promotion, spaceId));
  const activeMedia = selectedService?.media ?? area.media;
  const descriptions = sectionDescriptions[spaceId];
  const titles = sectionTitles[spaceId];

  const servicesSection = (
    <section key="services" id="servicios" className="space-services" aria-labelledby="space-services-title">
      <header className="space-section-heading">
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

        <div className="space-service-list" role="list" aria-label={`Servicios de ${area.title}`}>
          {area.groups.map((group) => {
            const isOpen = openGroup === group.title;
            return (
              <section
                id={serviceGroupId(group.title)}
                className={`space-service-group${isOpen ? ' is-open' : ''}`}
                key={group.title}
                role="listitem"
              >
                <button
                  type="button"
                  className="space-service-group__toggle"
                  aria-expanded={isOpen}
                  onClick={() => setOpenGroups((current) => ({
                    ...current,
                    [spaceId]: isOpen ? '' : group.title,
                  }))}
                >
                  <span>{group.title}</span>
                  <small>{group.items.length} {group.items.length === 1 ? 'opción' : 'opciones'}</small>
                  <i aria-hidden="true">{isOpen ? '−' : '+'}</i>
                </button>

                {isOpen ? (
                  <div className="space-service-group__items">
                    {group.items.map((service) => (
                      <button
                        type="button"
                        className={service.name === selectedService?.name ? 'is-active' : undefined}
                        key={service.name}
                        onClick={() => setSelectedServices((current) => ({
                          ...current,
                          [spaceId]: service.name,
                        }))}
                      >
                        <strong>{service.name}</strong>
                        <small>{service.duration} · {service.price}</small>
                        <i aria-hidden="true">↗</i>
                      </button>
                    ))}
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );

  const teamSection = team.length ? (
    <section key="team" id="equipo" className="space-team" aria-labelledby="space-team-title">
      <header className="space-section-heading">
        <h2 id="space-team-title">{titles.team}</h2>
        <p>{descriptions.team}</p>
      </header>
      <div className="space-team__grid">
        {team.map((member) => (
          <article key={member.name}>
            <img src={member.image} alt={`${member.name}, ${member.role}`} loading="lazy" />
            <div><span>{member.role}</span><h3>{member.name}</h3><p>{member.statement}</p></div>
          </article>
        ))}
      </div>
    </section>
  ) : null;

  const styleBookSection = frames.length ? (
    <section key="style-book" id="style-book" className="space-stylebook" aria-labelledby="space-stylebook-title">
      <header className="space-section-heading space-section-heading--with-link">
        <h2 id="space-stylebook-title">{titles.styleBook}</h2>
        <div>
          <p>{descriptions.styleBook}</p>
          <Link to={bookingPath(spaceId)}>{spaceId === 'fotografia' ? 'Solicitar una sesión' : 'Reservar desde una referencia'} ↗</Link>
        </div>
      </header>
      <div className="space-stylebook__grid">
        {frames.map((frame, index) => (
          <figure key={`${frame.label}-${index}`}>
            <img src={frame.image} alt={frame.alt} loading="lazy" />
            <figcaption>{frame.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  ) : null;

  const journalSection = articles.length ? (
    <section key="journal" id="consejos" className="space-journal" aria-labelledby="space-journal-title">
      <header className="space-section-heading">
        <h2 id="space-journal-title">{titles.advice}</h2>
        <p>{descriptions.advice}</p>
      </header>
      <div className="space-journal__grid">
        {articles.map((article) => (
          <Link to={`/inspirate/${article.slug}`} key={article.slug}>
            <img src={article.image} alt="" loading="lazy" />
            <div><span>{article.type}</span><h3>{article.title}</h3><p>{article.excerpt}</p><i>Leer guía ↗</i></div>
          </Link>
        ))}
      </div>
    </section>
  ) : null;

  const promotionsSection = promotions.length ? (
    <section key="promotions" id="beneficios" className="space-benefits space-benefits--promotions-only" aria-label="Promociones disponibles">
      <div className="space-promotions">
        {promotions.map((promotion) => (
          <Link to={bookingPath(spaceId)} key={`${promotion.eyebrow}-${promotion.title}`}>
            <span>{promotion.eyebrow}</span><strong>{promotion.title}</strong><p>{promotion.note}</p><i>↗</i>
          </Link>
        ))}
      </div>
    </section>
  ) : null;

  const inquirySection = (
    <div key="inquiry" id="consulta" className="space-inquiry-wrap">
      <WhatsappInquiryForm
        title={page.inquiryTitle}
        lead={page.inquiryLead}
        context={area.title}
        compact
      />
    </div>
  );

  const orderedSections = {
    barberia: [servicesSection, teamSection, styleBookSection, promotionsSection, journalSection, inquirySection],
    fotografia: [styleBookSection, servicesSection, teamSection, journalSection, inquirySection, promotionsSection],
    nails: [servicesSection, styleBookSection, teamSection, journalSection, promotionsSection, inquirySection],
    spa: [servicesSection, styleBookSection, teamSection, promotionsSection, journalSection, inquirySection],
  }[spaceId];

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
          <Link to="/">{settings.brandName}</Link>
          <h1>{page.title}</h1>
          <p>{page.lead}</p>
          <div>
            <a href={spaceId === 'fotografia' && frames.length ? '#style-book' : '#servicios'}>
              {spaceId === 'fotografia' ? 'Ver portfolio' : 'Explorar el espacio'} ↓
            </a>
            <Link to={bookingPath(spaceId)}>{spaceId === 'fotografia' ? 'Solicitar sesión' : 'Reservar'} ↗</Link>
          </div>
        </div>
      </section>

      {orderedSections}

      <nav className="space-next" aria-label={`Explorar otros espacios de ${settings.brandName}`}>
        {catalog.filter((item) => item.id !== spaceId).map((item) => (
          <Link to={spacePath(item.id)} key={item.id}>{item.title} ↗</Link>
        ))}
      </nav>
    </>
  );
}
