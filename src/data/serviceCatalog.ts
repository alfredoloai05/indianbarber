import { services } from './site';
import { visualMedia } from './visualMedia';

export const serviceCatalogGroups = [
  {
    title: 'Peluquería y barbería',
    eyebrow: 'Cabello y barba',
    service: services[0],
    media: visualMedia.barber,
    items: [
      'Corte de cabello',
      'Rasurado de cabeza al cero',
      'Perfilado de barba',
      'Perfilado de barba con cera caliente',
      'Afeitado clásico al ras',
    ],
  },
  {
    title: 'Combos Indian',
    eyebrow: 'Servicios combinados',
    service: services[2],
    media: visualMedia.barberDetail,
    items: [
      'Corte Essential (cabello + cejas)',
      'Corte Premium (cabello + barba)',
      'Corte Pro (corte + limpieza)',
      'Perfilado de barba + limpieza facial',
      'Servicio VIP Indian',
    ],
  },
  {
    title: 'Tattoo Studio',
    eyebrow: 'Diseño y tatuaje',
    service: services[4],
    media: visualMedia.tattoo,
    items: ['Cotización gratuita', 'Tatuaje'],
  },
  {
    title: 'Nails Studio',
    eyebrow: 'Manos y pies',
    service: services[3],
    media: visualMedia.nails,
    items: [
      'Manicura sin esmaltado',
      'Semipermanente con base rubber',
      'Manicura con esmaltado semipermanente',
      'Uñas Soft Gel',
      'Pedicura sin esmaltado',
      'Pedicura con esmaltado semipermanente',
      'Retiro',
    ],
  },
  {
    title: 'Servicios especiales',
    eyebrow: 'Detalles y cuidado',
    service: services[5],
    media: {
      poster: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=86&w=2000',
      video: '',
      source: 'Unsplash photo 1596462502278',
    },
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
] as const;
