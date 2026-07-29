import { visualMedia } from './visualMedia';

export type ServiceOptionGroup = {
  title: string;
  items: string[];
};

export type ServiceCatalogArea = {
  id: 'barberia' | 'combos' | 'tattoo' | 'nails';
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
        items: ['Corte de cabello', 'Rasurado de cabeza al cero'],
      },
      {
        title: 'Barba y afeitado',
        items: [
          'Perfilado de barba',
          'Perfilado de barba con cera caliente',
          'Afeitado clásico al ras',
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
    duration: '15–100 min',
    price: 'Desde USD 3',
    media: {
      kind: 'image',
      poster: visualMedia.services[2].poster,
    },
    groups: [
      {
        title: 'Combos Indian',
        items: [
          'Corte Essential — cabello y cejas',
          'Corte Premium — cabello y barba',
          'Corte Pro — corte y limpieza facial',
          'Perfilado de barba y limpieza facial',
          'Servicio VIP Indian',
        ],
      },
      {
        title: 'Servicios especiales',
        items: [
          'Depilación con cera de nariz',
          'Depilación con cera de orejas',
          'Diseño de cejas con técnica visagista',
          'Depilación de cejas',
          'Laminado de cejas',
          'Lifting de pestañas',
          'Tinturado de barba',
          'Rizos permanentes',
          'Limpieza facial superficial',
          'Peinado',
        ],
      },
    ],
  },
  {
    id: 'tattoo',
    route: 'tattoo-studio',
    aliases: ['tattoo-studio'],
    eyebrow: 'Diseño y ejecución',
    title: 'Tattoo Studio',
    shortTitle: 'Tattoo',
    summary: 'Cotización, preparación y tatuaje con acompañamiento antes y después de la sesión.',
    duration: 'Según la pieza',
    price: 'Cotización gratuita',
    media: {
      kind: 'video',
      poster: visualMedia.hero.tattoo.poster,
      video: visualMedia.hero.tattoo.video,
    },
    groups: [
      {
        title: 'Opciones disponibles',
        items: ['Cotización gratuita', 'Tatuaje'],
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
    duration: 'Según el servicio',
    price: 'Consultar',
    media: {
      kind: 'image',
      poster: visualMedia.intent.nails.poster,
    },
    groups: [
      {
        title: 'Manicura y sistemas',
        items: [
          'Manicura sin esmaltado',
          'Semipermanente con base rubber',
          'Manicura con esmaltado semipermanente',
          'Uñas Soft Gel',
          'Retiro',
        ],
      },
      {
        title: 'Pedicura',
        items: ['Pedicura sin esmaltado', 'Pedicura con esmaltado semipermanente'],
      },
    ],
  },
];

export function findServiceCatalogArea(slug?: string) {
  return serviceCatalog.find((area) => slug && area.aliases.includes(slug));
}
