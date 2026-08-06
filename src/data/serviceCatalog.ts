import { visualMedia } from './visualMedia';

export type SpaceId = 'barberia' | 'fotografia' | 'nails' | 'spa';

export type ServiceMedia = {
  poster: string;
  video?: string;
};

export type ServiceOption = {
  name: string;
  duration: string;
  price: string;
  note?: string;
  media?: ServiceMedia;
};

export type ServiceOptionGroup = {
  title: string;
  items: ServiceOption[];
};

export type ServiceCatalogArea = {
  id: SpaceId;
  route: string;
  aliases: string[];
  eyebrow: string;
  title: string;
  shortTitle: string;
  summary: string;
  duration: string;
  price: string;
  media: {
    kind: 'video' | 'image';
    poster: string;
    video?: string;
  };
  groups: ServiceOptionGroup[];
};

const cutMedia = { poster: visualMedia.intent.cut.poster, video: visualMedia.intent.cut.video };
const beardMedia = { poster: visualMedia.intent.beard.poster, video: visualMedia.intent.beard.video };
const barberMedia = { poster: visualMedia.hero.barber.poster, video: visualMedia.hero.barber.video };
const barberDetailMedia = { poster: visualMedia.services[0].poster, video: visualMedia.services[0].video };
const barberComboMedia = { poster: visualMedia.services[1].poster, video: visualMedia.services[1].video };
const nailsMedia = { poster: visualMedia.intent.nails.poster, video: visualMedia.intent.nails.video };
const nailsDetailMedia = { poster: visualMedia.services[3].poster, video: visualMedia.services[3].video };
const spaMedia = { poster: visualMedia.hero.spa.poster, video: visualMedia.services[5].video };
const photoMedia = { poster: visualMedia.hero.photoStudio.poster, video: visualMedia.services[2].video };

export const serviceCatalog: ServiceCatalogArea[] = [
  {
    id: 'barberia',
    route: 'corte-de-autor',
    aliases: ['corte-de-autor', 'barba-ritual', 'combos-indian', 'servicios-especiales'],
    eyebrow: 'Cabello, barba y afeitado',
    title: 'Barbería',
    shortTitle: 'Barbería',
    summary: 'Cortes, barba, afeitado, combos y servicios especiales dentro del universo de barbería Indian.',
    duration: '10–120 min',
    price: 'Desde USD 3',
    media: {
      kind: 'video',
      poster: visualMedia.hero.barber.poster,
      video: visualMedia.hero.barber.video,
    },
    groups: [
      {
        title: 'Cabello',
        items: [
          { name: 'Corte de cabello', duration: '45–60 min aprox.', price: 'USD 10', media: cutMedia },
          { name: 'Rasurado de cabeza al cero', duration: '30 min aprox.', price: 'USD 6', media: barberDetailMedia },
        ],
      },
      {
        title: 'Barba y afeitado',
        items: [
          { name: 'Perfilado de barba', duration: '30 min aprox.', price: 'USD 6', media: beardMedia },
          { name: 'Perfilado de barba con cera caliente', duration: '40 min aprox.', price: 'USD 12', media: barberComboMedia },
          { name: 'Afeitado clásico al ras', duration: '30–40 min aprox.', price: 'USD 6', media: beardMedia },
        ],
      },
      {
        title: 'Combos Indian',
        items: [
          { name: 'Corte Essential — cabello y cejas', duration: '60 min aprox.', price: 'USD 14', media: barberMedia },
          { name: 'Corte Premium — cabello y barba', duration: '70 min aprox.', price: 'USD 15', media: barberComboMedia },
          { name: 'Corte Pro — corte y limpieza facial', duration: '75 min aprox.', price: 'USD 15', media: barberDetailMedia },
          { name: 'Perfilado de barba y limpieza facial', duration: '50 min aprox.', price: 'USD 10', media: beardMedia },
          { name: 'Servicio VIP Indian', duration: '90–100 min aprox.', price: 'USD 22', media: barberMedia },
        ],
      },
      {
        title: 'Servicios especiales',
        items: [
          { name: 'Depilación con cera de nariz', duration: '10 min aprox.', price: 'USD 4', media: barberDetailMedia },
          { name: 'Depilación con cera de orejas', duration: '10 min aprox.', price: 'USD 4', media: barberDetailMedia },
          { name: 'Diseño de cejas con técnica visagista', duration: '20–30 min aprox.', price: 'USD 10', media: cutMedia },
          { name: 'Depilación de cejas', duration: '15 min aprox.', price: 'USD 3', media: cutMedia },
          { name: 'Laminado de cejas', duration: '30–45 min aprox.', price: 'USD 8', media: barberDetailMedia },
          { name: 'Lifting de pestañas', duration: '45–60 min aprox.', price: 'USD 12', media: barberDetailMedia },
          { name: 'Tinturado de barba', duration: '20–30 min aprox.', price: 'USD 4', media: beardMedia },
          { name: 'Rizos permanentes', duration: '90–120 min aprox.', price: 'USD 35', media: cutMedia },
          { name: 'Limpieza facial superficial', duration: '30–40 min aprox.', price: 'USD 7', media: barberComboMedia },
          { name: 'Peinado', duration: '15–25 min aprox.', price: 'USD 4', media: cutMedia },
        ],
      },
    ],
  },
  {
    id: 'fotografia',
    route: 'estudio-fotografico',
    aliases: ['estudio-fotografico', 'fotografia'],
    eyebrow: 'Retrato y contenido',
    title: 'Estudio Fotográfico',
    shortTitle: 'Fotografía',
    summary: 'Sesiones para retrato, marca personal, contenido para redes y producto dentro de Indian House.',
    duration: '30–90 min aprox.',
    price: 'Consultar',
    media: {
      kind: 'video',
      poster: photoMedia.poster,
      video: photoMedia.video,
    },
    groups: [
      {
        title: 'Sesiones disponibles',
        items: [
          {
            name: 'Retrato personal express',
            duration: '30 min aprox.',
            price: 'Consultar',
            note: 'Sesión breve para fotografías personales o actualización de perfil.',
            media: photoMedia,
          },
          {
            name: 'Marca personal',
            duration: '60 min aprox.',
            price: 'Consultar',
            note: 'Retratos pensados para perfiles profesionales, portafolios y presencia digital.',
            media: photoMedia,
          },
          {
            name: 'Contenido para redes',
            duration: '45–90 min aprox.',
            price: 'Consultar',
            note: 'Producción de una selección visual para publicaciones y comunicación de marca.',
            media: photoMedia,
          },
          {
            name: 'Fotografía de producto',
            duration: 'Según proyecto',
            price: 'Consultar',
            note: 'La propuesta se define según cantidad de productos, estilo y formato de entrega.',
            media: photoMedia,
          },
        ],
      },
    ],
  },
  {
    id: 'nails',
    route: 'nails-studio',
    aliases: ['nails-studio'],
    eyebrow: 'Manos y pies',
    title: 'Nails Studio',
    shortTitle: 'Nails',
    summary: 'Manicura, pedicura y sistemas semipermanentes con preparación y acabado profesional.',
    duration: '20–120 min',
    price: 'Desde USD 5',
    media: {
      kind: 'video',
      poster: nailsMedia.poster,
      video: nailsMedia.video,
    },
    groups: [
      {
        title: 'Manicura y sistemas',
        items: [
          { name: 'Manicura sin esmaltado', duration: '30–40 min aprox.', price: 'USD 5', media: nailsMedia },
          { name: 'Semipermanente con base rubber', duration: '60–75 min aprox.', price: 'USD 12', media: nailsDetailMedia },
          { name: 'Manicura con esmaltado semipermanente', duration: '50–60 min aprox.', price: 'USD 10', media: nailsMedia },
          { name: 'Uñas Soft Gel', duration: '90–120 min aprox.', price: 'Consultar', media: nailsDetailMedia },
          { name: 'Retiro', duration: '20–30 min aprox.', price: 'Consultar', media: nailsMedia },
        ],
      },
      {
        title: 'Pedicura',
        items: [
          { name: 'Pedicura sin esmaltado', duration: '45–60 min aprox.', price: 'USD 10', media: nailsDetailMedia },
          { name: 'Pedicura con esmaltado semipermanente', duration: '60–75 min aprox.', price: 'USD 15', media: nailsMedia },
        ],
      },
    ],
  },
  {
    id: 'spa',
    route: 'spa',
    aliases: ['spa', 'tattoo-studio'],
    eyebrow: 'Bienestar y cuidado',
    title: 'SPA',
    shortTitle: 'SPA',
    summary: 'Rituales de bienestar, relajación y cuidado personal coordinados según la experiencia que buscas.',
    duration: '30–75 min aprox.',
    price: 'Consultar',
    media: {
      kind: 'video',
      poster: spaMedia.poster,
      video: spaMedia.video,
    },
    groups: [
      {
        title: 'Cuidado y relajación',
        items: [
          {
            name: 'Ritual facial',
            duration: '45–60 min aprox.',
            price: 'Consultar',
            note: 'La técnica y los productos se coordinan según la valoración previa y la disponibilidad del centro.',
            media: spaMedia,
          },
          {
            name: 'Masaje de relajación',
            duration: '30–60 min aprox.',
            price: 'Consultar',
            note: 'Duración y modalidad sujetas a la experiencia seleccionada.',
            media: spaMedia,
          },
          {
            name: 'Experiencia SPA personalizada',
            duration: '60–75 min aprox.',
            price: 'Consultar',
            note: 'Una combinación de cuidado y relajación definida directamente con el centro.',
            media: spaMedia,
          },
        ],
      },
    ],
  },
];

export function findServiceCatalogArea(slug?: string) {
  return serviceCatalog.find((area) => slug && area.aliases.includes(slug));
}
