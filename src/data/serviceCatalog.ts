import { services } from './site';
import { visualMedia } from './visualMedia';

export const serviceCatalogGroups = [
  {
    title: 'Peluquería y barbería',
    eyebrow: 'Cabello y barba',
    service: services[0],
    media: visualMedia.services[0],
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
    media: visualMedia.services[2],
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
    media: visualMedia.services[4],
    items: ['Cotización gratuita', 'Tatuaje'],
  },
  {
    title: 'Nails Studio',
    eyebrow: 'Manos y pies',
    service: services[3],
    media: visualMedia.services[3],
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
    media: visualMedia.services[5],
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
