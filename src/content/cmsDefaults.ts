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
      title: 'Barbería, tattoo, nails y café.',
      lead: 'Cortes, barba y acabado con precisión.',
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
    description: 'Título y comportamiento visual de las cuatro áreas de servicio.',
    kind: 'section',
    value: json({
      eyebrow: 'Servicios',
      title: 'Todo Indian, en un solo lugar.',
    }),
  },
  {
    key: 'home.club',
    group: 'Inicio',
    label: 'El Club en Home',
    description: 'Video, poster y textos del bloque audiovisual del Club.',
    kind: 'section',
    value: json({
      eyebrow: 'El Club',
      title: 'Café, parqueo y todo Indian en un solo lugar.',
      description: 'Llega con tiempo, toma algo y disfruta el espacio antes o después de tu servicio.',
      ctaLabel: 'Conocer el lugar',
      video: visualMedia.clubFeature.video,
      poster: visualMedia.clubFeature.poster,
    }),
  },
  {
    key: 'promotions.list',
    group: 'Inicio',
    label: 'Promociones',
    description: 'Promociones visibles en Home y en la página de promociones. Se pueden agregar, ordenar o desactivar.',
    kind: 'collection',
    value: json(promotions.map((item) => ({ ...item, visible: true }))),
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
      image: media.cafe,
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
      eyebrow: 'Visítanos',
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
    value: json(team.map((member) => ({ ...member, visible: true }))),
  },
  {
    key: 'team.page',
    group: 'Equipo',
    label: 'Textos de Equipo',
    description: 'Título, introducción, colaboración y llamado de reserva.',
    kind: 'section',
    value: json({
      eyebrow: 'Equipo Indian Club',
      title: 'Barbería, tattoo y nails. Personas que conocen su oficio.',
      description: 'Conoce al equipo y encuentra al profesional adecuado para el servicio que quieres reservar.',
      collaborationEyebrow: 'Trabajo en equipo',
      collaborationTitle: 'Tres especialidades dentro de la misma casa.',
      collaborationDescription: 'Barbería, tattoo y nails comparten el espacio y la atención para que puedas combinar distintos servicios en una sola visita.',
      bookingTitle: 'Elige el servicio y revisa quién está disponible.',
      bookingDescription: 'AgendaPro te permite consultar horarios y seleccionar al profesional para tu próxima visita.',
    }),
  },
  {
    key: 'club.page',
    group: 'El Club',
    label: 'Página del Club',
    description: 'Hero, videos, galería, beneficios y textos del espacio físico.',
    kind: 'section',
    value: json({
      eyebrow: 'El Club · Loja',
      title: 'Todo Indian en un solo lugar.',
      description: 'Barbería, tattoo, nails, café y parqueo para que tu visita sea cómoda desde que llegas.',
      heroVideo: visualMedia.clubFeature.video,
      heroPoster: visualMedia.clubFeature.poster,
      gallery: [
        { label: 'Cafetería', title: 'Llega con tiempo, toma algo y disfruta el espacio.', video: visualMedia.hero.club.video, poster: visualMedia.hero.club.poster },
        { label: 'Barbería', title: 'Corte, barba y afeitado.', image: visualMedia.hero.barber.poster },
        { label: 'Tattoo Studio', title: 'Diseño, cotización y tatuaje.', image: visualMedia.hero.tattoo.poster },
        { label: 'Nails Studio', title: 'Manicura, pedicura y sistemas semipermanentes.', image: visualMedia.hero.nails.poster },
      ],
      amenitiesTitle: 'Un espacio para disfrutar la visita completa.',
      amenities: [
        { title: 'Parqueo exclusivo', description: 'Estaciona durante tu visita sin buscar espacio en el centro.' },
        { title: 'Cafetería', description: 'Bebidas y un ambiente cómodo para esperar o conversar.' },
        { title: 'Todo en la misma casa', description: 'Barbería, tattoo y nails sin desplazarte a distintos lugares.' },
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
      title: 'Trabajos realizados por el equipo de Indian Club.',
      description: 'Cortes, perfilados, tatuajes y uñas para que encuentres referencias antes de reservar.',
      frames: [
        { image: media.hero, label: 'Corte y acabado', alt: 'Cliente atendido dentro de Indian Club', className: 'style-book-grid__hero' },
        { image: media.tattoo, label: 'Tattoo Studio', alt: 'Tatuaje realizado por Indian Club Tattoo Studio', className: 'style-book-grid__tall' },
        { image: media.barber, label: 'Barbería', alt: 'Corte realizado por Indian Club', className: 'style-book-grid__wide' },
        { image: media.nails, label: 'Nails Studio', alt: 'Diseño de uñas realizado por Indian Club Nails Studio', className: 'style-book-grid__small' },
        { image: media.barberAlt, label: 'Barba y perfilado', alt: 'Resultado de barbería realizado en Indian Club', className: 'style-book-grid__portrait' },
        { image: media.tattoo, label: 'Detalle de tatuaje', alt: 'Detalle de trabajo del Tattoo Studio', className: 'style-book-grid__small' },
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
      image: media.cafe,
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
        { title: 'Consulta', description: 'Escríbenos por WhatsApp si necesitas cotización o ayuda para elegir.' },
        { title: 'Vuelve', description: 'Agenda tu mantenimiento cuando el corte, la barba o las uñas lo necesiten.' },
      ],
    }),
  },
];

export const cmsDefaultMap = Object.fromEntries(cmsDefinitions.map((entry) => [entry.key, entry.value]));

export function getCmsDefinition(key: string) {
  return cmsDefinitions.find((entry) => entry.key === key);
}
