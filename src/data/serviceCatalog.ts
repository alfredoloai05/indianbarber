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
    id: 'tattoo',
    route: 'tattoo-studio',
    aliases: ['tattoo-studio'],
    eyebrow: 'Diseño y ejecución',
    title: 'Tattoo Studio',
    shortTitle: 'Tattoo',
    summary: 'Cotización, preparación y tatuaje con acompañamiento antes y después de la sesión.',
    duration: '30 min–2 h',
    price: 'Desde USD 0',
    media: {
      kind: 'video',
      poster: visualMedia.hero.tattoo.poster,
      video: visualMedia.hero.tattoo.video,
    },
    groups: [
      {
        title: 'Opciones disponibles',
        items: [
          { name: 'Cotización gratuita', duration: '30 min', price: 'USD 0' },
          {
            name: 'Tatuaje pequeño — hasta 8 × 8 cm',
            duration: '2 h aprox.',
            price: 'USD 35',
            note: 'Diseño establecido de un color. Otras piezas se cotizan según diseño, tamaño y ubicación.',
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
];

export function findServiceCatalogArea(slug?: string) {
  return serviceCatalog.find((area) => slug && area.aliases.includes(slug));
}
