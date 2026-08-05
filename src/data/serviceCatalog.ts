import { visualMedia } from './visualMedia';

export type ServiceOption = {
  name: string;
  duration: string;
  price: string;
  note?: string;
};

export type ServiceOptionGroup = {
  title: string;
  items: ServiceOption[];
};

export type ServiceCatalogArea = {
  id: 'barberia' | 'combos' | 'spa' | 'nails' | 'fotografia';
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

export const serviceCatalog: ServiceCatalogArea[] = [
  {
    id: 'barberia',
    route: 'corte-de-autor',
    aliases: ['corte-de-autor', 'barba-ritual'],
    eyebrow: 'Cabello, barba y afeitado',
    title: 'Peluquería y barbería',
    shortTitle: 'Barbería',
    summary: 'Cortes, rasurado, perfilado y afeitado clásico realizados por el equipo de barbería.',
    duration: '30–60 min',
    price: 'Desde USD 6',
    media: {
      kind: 'video',
      poster: visualMedia.hero.barber.poster,
      video: visualMedia.hero.barber.video,
    },
    groups: [
      {
        title: 'Cabello',
        items: [
          { name: 'Corte de cabello', duration: '45–60 min aprox.', price: 'USD 10' },
          { name: 'Rasurado de cabeza al cero', duration: '30 min aprox.', price: 'USD 6' },
        ],
      },
      {
        title: 'Barba y afeitado',
        items: [
          { name: 'Perfilado de barba', duration: '30 min aprox.', price: 'USD 6' },
          { name: 'Perfilado de barba con cera caliente', duration: '40 min aprox.', price: 'USD 12' },
          { name: 'Afeitado clásico al ras', duration: '30–40 min aprox.', price: 'USD 6' },
        ],
      },
    ],
  },
  {
    id: 'combos',
    route: 'combos-indian',
    aliases: ['combos-indian', 'servicios-especiales'],
    eyebrow: 'Combina y completa tu visita',
    title: 'Combos y especiales',
    shortTitle: 'Combos',
    summary: 'Servicios combinados y opciones adicionales para resolver varios detalles en una sola visita.',
    duration: '10–120 min',
    price: 'Desde USD 3',
    media: {
      kind: 'image',
      poster: visualMedia.services[2].poster,
    },
    groups: [
      {
        title: 'Combos Indian',
        items: [
          { name: 'Corte Essential — cabello y cejas', duration: '60 min aprox.', price: 'USD 14' },
          { name: 'Corte Premium — cabello y barba', duration: '70 min aprox.', price: 'USD 15' },
          { name: 'Corte Pro — corte y limpieza facial', duration: '75 min aprox.', price: 'USD 15' },
          { name: 'Perfilado de barba y limpieza facial', duration: '50 min aprox.', price: 'USD 10' },
          { name: 'Servicio VIP Indian', duration: '90–100 min aprox.', price: 'USD 22' },
        ],
      },
      {
        title: 'Servicios especiales',
        items: [
          { name: 'Depilación con cera de nariz', duration: '10 min aprox.', price: 'USD 4' },
          { name: 'Depilación con cera de orejas', duration: '10 min aprox.', price: 'USD 4' },
          { name: 'Diseño de cejas con técnica visagista', duration: '20–30 min aprox.', price: 'USD 10' },
          { name: 'Depilación de cejas', duration: '15 min aprox.', price: 'USD 3' },
          { name: 'Laminado de cejas', duration: '30–45 min aprox.', price: 'USD 8' },
          { name: 'Lifting de pestañas', duration: '45–60 min aprox.', price: 'USD 12' },
          { name: 'Tinturado de barba', duration: '20–30 min aprox.', price: 'USD 4' },
          { name: 'Rizos permanentes', duration: '90–120 min aprox.', price: 'USD 35' },
          { name: 'Limpieza facial superficial', duration: '30–40 min aprox.', price: 'USD 7' },
          { name: 'Peinado', duration: '15–25 min aprox.', price: 'USD 4' },
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
      kind: 'image',
      poster: visualMedia.hero.spa.poster,
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
          },
          {
            name: 'Masaje de relajación',
            duration: '30–60 min aprox.',
            price: 'Consultar',
            note: 'Duración y modalidad sujetas a la experiencia seleccionada.',
          },
          {
            name: 'Experiencia SPA personalizada',
            duration: '60–75 min aprox.',
            price: 'Consultar',
            note: 'Una combinación de cuidado y relajación definida directamente con el centro.',
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
      kind: 'image',
      poster: visualMedia.intent.nails.poster,
    },
    groups: [
      {
        title: 'Manicura y sistemas',
        items: [
          { name: 'Manicura sin esmaltado', duration: '30–40 min aprox.', price: 'USD 5' },
          { name: 'Semipermanente con base rubber', duration: '60–75 min aprox.', price: 'USD 12' },
          { name: 'Manicura con esmaltado semipermanente', duration: '50–60 min aprox.', price: 'USD 10' },
          { name: 'Uñas Soft Gel', duration: '90–120 min aprox.', price: 'Consultar' },
          { name: 'Retiro', duration: '20–30 min aprox.', price: 'Consultar' },
        ],
      },
      {
        title: 'Pedicura',
        items: [
          { name: 'Pedicura sin esmaltado', duration: '45–60 min aprox.', price: 'USD 10' },
          { name: 'Pedicura con esmaltado semipermanente', duration: '60–75 min aprox.', price: 'USD 15' },
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
    summary: 'Sesiones para retrato, marca personal y contenido visual realizadas dentro de Indian Club.',
    duration: '30–90 min aprox.',
    price: 'Consultar',
    media: {
      kind: 'image',
      poster: visualMedia.hero.photoStudio.poster,
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
          },
          {
            name: 'Marca personal',
            duration: '60 min aprox.',
            price: 'Consultar',
            note: 'Retratos pensados para perfiles profesionales, portafolios y presencia digital.',
          },
          {
            name: 'Contenido para redes',
            duration: '45–90 min aprox.',
            price: 'Consultar',
            note: 'Producción de una selección visual para publicaciones y comunicación de marca.',
          },
          {
            name: 'Fotografía de producto',
            duration: 'Según proyecto',
            price: 'Consultar',
            note: 'La propuesta se define según cantidad de productos, estilo y formato de entrega.',
          },
        ],
      },
    ],
  },
];

export function findServiceCatalogArea(slug?: string) {
  return serviceCatalog.find((area) => slug && area.aliases.includes(slug));
}
