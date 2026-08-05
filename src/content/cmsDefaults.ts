import { giftCards, products } from '../data/catalog';
import { journalBodies, journalItems } from '../data/journal';
import { serviceCatalog } from '../data/serviceCatalog';
import { bookingUrl, brand, contact, media, navItems, promotions, team } from '../data/site';
import { visualMedia } from '../data/visualMedia';
import type { CmsEntryDefinition, CmsJson } from './cmsTypes';

function json<T>(value: T): CmsJson {
  return JSON.parse(JSON.stringify(value)) as CmsJson;
}

const articles = journalItems.map((item) => ({
  ...item,
  body: journalBodies[item.slug] ?? [],
  visible: true,
}));

const spaImage = visualMedia.hero.spa.poster;
const photoStudioImage = visualMedia.hero.photoStudio.poster;
const clubHeroImage = media.hero;
const activeTeam = team.filter((member) => member.name !== 'César Castejón');
const updatedPromotions = promotions.map((promotion) => ({
  ...promotion,
  title: promotion.title.replace(/tattoo/gi, 'SPA'),
  visible: true,
}));

export const cmsDefinitions: CmsEntryDefinition[] = [
  {
    key: 'global.settings',
    group: 'Configuración',
    label: 'Datos generales',
    description: 'Logo, contacto, horarios, reservas y enlaces principales.',
    kind: 'settings',
    value: json({
      brandName: brand.name,
      logoMark: brand.logoMark,
      logoLockup: brand.logoLockup,
      phone: contact.phone,
      phoneHref: contact.phoneHref,
      whatsapp: contact.whatsapp,
      whatsappHref: contact.whatsappHref,
      email: contact.email,
      emailHref: contact.emailHref,
      address: contact.address,
      city: contact.city,
      mapHref: contact.mapHref,
      bookingUrl,
      hours: contact.hours,
      navigation: navItems,
    }),
  },
  {
    key: 'home.hero',
    group: 'Inicio',
    label: 'Hero principal',
    description: 'Video, imagen previa, título, texto y botones del primer pantallazo.',
    kind: 'section',
    value: json({
      location: 'Loja · Ecuador',
      founded: 'Desde 2018',
      title: 'Barbería, SPA, nails y estudio fotográfico.',
      lead: 'Cuidado, estilo y experiencias en un solo lugar.',
      video: visualMedia.hero.barber.video,
      poster: visualMedia.hero.barber.poster,
      primaryLabel: 'Reservar cita',
      secondaryLabel: 'Ver trabajos',
    }),
  },
  {
    key: 'home.services',
    group: 'Inicio',
    label: 'Portales de servicios',
    description: 'Título y comportamiento visual de las cinco áreas de servicio.',
    kind: 'section',
    value: json({
      eyebrow: 'Servicios',
      title: 'Cinco formas de vivir Indian.',
    }),
  },
  {
    key: 'home.club',
    group: 'Inicio',
    label: 'El Club en Home',
    description: 'Imagen y textos del bloque visual del Club.',
    kind: 'section',
    value: json({
      eyebrow: 'La casa',
      title: 'Barbería, SPA, nails, fotografía y parqueo en un mismo lugar.',
      description: 'Conoce un espacio pensado para resolver tu visita completa sin salir de Indian Club.',
      ctaLabel: 'Conocer la casa',
      video: '',
      poster: clubHeroImage,
    }),
  },
  {
    key: 'promotions.list',
    group: 'Inicio',
    label: 'Promociones',
    description: 'Promociones visibles en Home y en la página de promociones. Se pueden agregar, ordenar o desactivar.',
    kind: 'collection',
    value: json(updatedPromotions),
  },
  {
    key: 'home.giftCards',
    group: 'Inicio',
    label: 'Gift Cards',
    description: 'Contenido y presentación de la franja premium de tarjetas regalo.',
    kind: 'section',
    value: json({
      eyebrow: 'Gift Cards Indian Club',
      title: 'Regala Indian Club.',
      description: 'Una visita, un servicio o un detalle para alguien especial.',
      image: photoStudioImage,
      values: giftCards,
      primaryLabel: 'Ver Gift Cards',
      secondaryLabel: 'Solicitar por WhatsApp',
    }),
  },
  {
    key: 'home.guides',
    group: 'Inicio',
    label: 'Consejos en Home',
    description: 'Título y enlace de la selección editorial de consejos.',
    kind: 'section',
    value: json({
      eyebrow: 'Consejos Indian Club',
      title: 'Cuida mejor el resultado entre visitas.',
      ctaLabel: 'Ver todos los consejos',
    }),
  },
  {
    key: 'home.visit',
    group: 'Inicio',
    label: 'Visítanos',
    description: 'Texto del cierre de ubicación y reserva de la página principal.',
    kind: 'section',
    value: json({
      eyebrow: 'Cómo llegar',
      title: 'Indian Club está en el centro de Loja.',
      bookingTitle: 'Elige servicio, profesional y horario.',
      bookingLabel: 'Reservar ahora',
    }),
  },
  {
    key: 'services.catalog',
    group: 'Servicios',
    label: 'Catálogo completo',
    description: 'Categorías, textos, precios, duraciones, imágenes, videos y opciones disponibles.',
    kind: 'collection',
    value: json(serviceCatalog),
  },
  {
    key: 'team.members',
    group: 'Equipo',
    label: 'Integrantes del equipo',
    description: 'Nombre, cargo, fotografía, descripción, visibilidad y orden.',
    kind: 'collection',
    value: json(activeTeam.map((member) => ({ ...member, visible: true }))),
  },
  {
    key: 'team.page',
    group: 'Equipo',
    label: 'Textos de Equipo',
    description: 'Título, introducción, colaboración y llamado de reserva.',
    kind: 'section',
    value: json({
      eyebrow: 'Equipo Indian Club',
      title: 'Personas que conocen su oficio.',
      description: 'Conoce al equipo y encuentra al profesional adecuado para el servicio que quieres reservar.',
      collaborationEyebrow: 'Todo en la misma casa',
      collaborationTitle: 'Servicios que pueden convivir en una sola visita.',
      collaborationDescription: 'Barbería, SPA, nails y fotografía comparten la misma experiencia Indian Club.',
      bookingTitle: 'Elige el servicio y revisa quién está disponible.',
      bookingDescription: 'La plataforma de reservas te permite consultar horarios y seleccionar al profesional para tu próxima visita.',
    }),
  },
  {
    key: 'club.page',
    group: 'El Club',
    label: 'Página del Club',
    description: 'Hero, galería, beneficios y textos del espacio físico.',
    kind: 'section',
    value: json({
      eyebrow: 'Indian Club · Loja',
      title: 'Una casa para cuidar, crear y volver.',
      description: 'Barbería, SPA, nails, estudio fotográfico y parqueo dentro de una misma experiencia en el centro de Loja.',
      heroVideo: '',
      heroPoster: clubHeroImage,
      gallery: [
        { label: 'Barbería', title: 'Corte, barba y afeitado con precisión.', image: media.barber },
        { label: 'Barba y perfilado', title: 'Detalles que sostienen mejor el resultado.', image: media.barberAlt },
        { label: 'Nails Studio', title: 'Manicura, pedicura y sistemas semipermanentes.', image: media.nails },
        { label: 'SPA', title: 'Bienestar, relajación y cuidado personal.', image: spaImage },
        { label: 'Estudio Fotográfico', title: 'Retratos, marca personal y contenido visual.', image: photoStudioImage },
        { label: 'Parqueo exclusivo', title: 'Llega y estaciona durante tu visita.', image: media.parking },
      ],
      amenitiesTitle: 'Todo lo que necesitas para una visita completa.',
      amenities: [
        { title: 'Barbería', description: 'Corte, barba, afeitado y servicios especiales con reserva.' },
        { title: 'SPA', description: 'Experiencias de cuidado y relajación coordinadas según disponibilidad.' },
        { title: 'Nails Studio', description: 'Servicios para manos y pies dentro del mismo espacio.' },
        { title: 'Estudio Fotográfico', description: 'Sesiones de retrato, marca personal y contenido visual.' },
        { title: 'Parqueo exclusivo', description: 'Estaciona durante tu visita sin buscar espacio en el centro.' },
      ],
    }),
  },
  {
    key: 'stylebook.gallery',
    group: 'Style Book',
    label: 'Galería de trabajos',
    description: 'Textos y fotografías de la galería editorial.',
    kind: 'gallery',
    value: json({
      eyebrow: 'Style Book',
      title: 'Trabajos y experiencias de Indian Club.',
      description: 'Barbería, barba, nails, SPA y fotografía para conocer mejor todo lo que sucede dentro de Indian Club.',
      frames: [
        { image: media.hero, label: 'Indian Club', alt: 'Cliente atendido dentro de Indian Club', className: 'style-book-grid__hero' },
        { image: media.barber, label: 'Corte y acabado', alt: 'Corte realizado por Indian Club', className: 'style-book-grid__wide' },
        { image: media.barberAlt, label: 'Barba y perfilado', alt: 'Resultado de barbería realizado en Indian Club', className: 'style-book-grid__portrait' },
        { image: visualMedia.intent.cut.poster, label: 'Textura y forma', alt: 'Detalle de corte y peinado', className: 'style-book-grid__small' },
        { image: visualMedia.intent.beard.poster, label: 'Afeitado y detalle', alt: 'Servicio de barba y afeitado', className: 'style-book-grid__tall' },
        { image: media.nails, label: 'Nails Studio', alt: 'Diseño de uñas realizado por Indian Club Nails Studio', className: 'style-book-grid__small' },
        { image: spaImage, label: 'SPA', alt: 'Experiencia SPA en Indian Club', className: 'style-book-grid__wide' },
        { image: photoStudioImage, label: 'Estudio Fotográfico', alt: 'Estudio fotográfico de Indian Club', className: 'style-book-grid__portrait' },
      ],
    }),
  },
  {
    key: 'journal.articles',
    group: 'Inspírate',
    label: 'Consejos y artículos',
    description: 'Título, resumen, fotografía, contenido y visibilidad de cada guía.',
    kind: 'collection',
    value: json(articles),
  },
  {
    key: 'journal.page',
    group: 'Inspírate',
    label: 'Textos de Inspírate',
    description: 'Encabezados y descripción de la página editorial.',
    kind: 'section',
    value: json({
      eyebrow: 'Consejos Indian Club',
      title: 'Ideas prácticas para cuidar tu estilo.',
      description: 'Guías breves sobre cortes, cabello, barba y uñas para mantener mejor cada resultado.',
      coverEyebrow: 'Cuidado y mantenimiento',
      coverTitle: 'Tu estilo continúa después de salir de Indian.',
      coverDescription: 'Recomendaciones sencillas para elegir mejor y cuidar el resultado entre una visita y la siguiente.',
    }),
  },
  {
    key: 'products.list',
    group: 'Productos',
    label: 'Productos',
    description: 'Productos, categorías, descripciones, visibilidad y orden.',
    kind: 'collection',
    value: json(products.map((product) => ({ ...product, visible: true }))),
  },
  {
    key: 'giftcards.page',
    group: 'Gift Cards',
    label: 'Página de Gift Cards',
    description: 'Textos, imagen, valores y pasos de la página completa.',
    kind: 'section',
    value: json({
      eyebrow: 'Tarjetas regalo',
      title: 'Regala una visita a Indian Club.',
      description: 'Elige un valor y consulta la forma de entrega, vigencia y condiciones directamente con el centro.',
      image: photoStudioImage,
      values: giftCards,
      buttonLabel: 'Solicitar una tarjeta',
      steps: [
        { title: 'Elige el valor', description: 'Selecciona entre USD 10, 20, 30, 40 o 50.' },
        { title: 'Confirma los datos', description: 'Indica para quién es y consulta la forma de entrega disponible.' },
        { title: 'Úsala en Indian', description: 'La persona podrá aplicarla a los servicios disponibles según las condiciones vigentes.' },
      ],
    }),
  },
  {
    key: 'contact.page',
    group: 'Contacto',
    label: 'Página de Contacto',
    description: 'Encabezado, fotografía y textos operativos de contacto.',
    kind: 'section',
    value: json({
      eyebrow: 'Contacto',
      title: 'Visítanos en el centro de Loja.',
      description: 'Encuentra aquí la dirección, horarios y canales de contacto para reservar o resolver una consulta.',
      image: media.exterior,
      journey: [
        { title: 'Reserva', description: 'Elige el servicio, profesional, fecha y horario disponibles.' },
        { title: 'Llega', description: 'Estamos en el centro de Loja y contamos con parqueo exclusivo para clientes.' },
        { title: 'Consulta', description: 'Escríbenos por WhatsApp si necesitas información o ayuda para elegir.' },
        { title: 'Vuelve', description: 'Agenda tu mantenimiento o próxima experiencia cuando la necesites.' },
      ],
    }),
  },
];

export const cmsDefaultMap = Object.fromEntries(cmsDefinitions.map((entry) => [entry.key, entry.value]));

export function getCmsDefinition(key: string) {
  return cmsDefinitions.find((entry) => entry.key === key);
}
