import type { ServiceMedia, SpaceId } from './serviceCatalog';
import { visualMedia } from './visualMedia';

const pexelsVideo = (id: string) => `https://www.pexels.com/download/video/${id}/`;
const unsplashImage = (id: string, width = 2200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=88&w=${width}`;

export const houseHeroMedia: ServiceMedia = {
  poster: unsplashImage('photo-1600607687939-ce8a6c25118c'),
  video: pexelsVideo('10827607'),
};

export const spaceExperienceMedia: Record<SpaceId, ServiceMedia> = {
  barberia: {
    poster: visualMedia.hero.barber.poster,
    video: pexelsVideo('9738001'),
  },
  fotografia: {
    poster: visualMedia.hero.photoStudio.poster,
    video: pexelsVideo('36893324'),
  },
  nails: {
    poster: visualMedia.hero.nails.poster,
    video: pexelsVideo('30706938'),
  },
  spa: {
    poster: visualMedia.hero.spa.poster,
    video: pexelsVideo('28952907'),
  },
};

const serviceVideoByName: Record<string, string> = {
  'Corte de cabello': '9737999',
  'Rasurado de cabeza al cero': '9738000',
  'Perfilado de barba': '8252400',
  'Perfilado de barba con cera caliente': '7426676',
  'Afeitado clásico al ras': '7426383',
  'Corte Essential — cabello y cejas': '8867533',
  'Corte Premium — cabello y barba': '5587255',
  'Corte Pro — corte y limpieza facial': '5587254',
  'Perfilado de barba y limpieza facial': '5587280',
  'Servicio VIP Indian': '7686590',
  'Depilación con cera de nariz': '7086059',
  'Depilación con cera de orejas': '5496187',
  'Diseño de cejas con técnica visagista': '5483574',
  'Depilación de cejas': '6113144',
  'Laminado de cejas': '32000083',
  'Lifting de pestañas': '30747522',
  'Tinturado de barba': '5450147',
  'Rizos permanentes': '37770201',
  'Limpieza facial superficial': '34803476',
  Peinado: '8252026',
  'Retrato personal express': '35313988',
  'Marca personal': '13399630',
  'Contenido para redes': '31512161',
  'Fotografía de producto': '31512162',
  'Manicura sin esmaltado': '16117302',
  'Semipermanente con base rubber': '8022926',
  'Manicura con esmaltado semipermanente': '10609138',
  'Uñas Soft Gel': '16117306',
  Retiro: '16117150',
  'Pedicura sin esmaltado': '4855997',
  'Pedicura con esmaltado semipermanente': '4855928',
  'Ritual facial': '31797385',
  'Masaje de relajación': '30365548',
  'Experiencia SPA personalizada': '7582847',
};

export function getServiceExperienceMedia(
  spaceId: SpaceId,
  serviceName: string,
  fallback: ServiceMedia,
): ServiceMedia {
  const videoId = serviceVideoByName[serviceName];
  return {
    poster: fallback.poster || spaceExperienceMedia[spaceId].poster,
    video: videoId ? pexelsVideo(videoId) : fallback.video || spaceExperienceMedia[spaceId].video,
  };
}

export const genericTeamBySpace: Record<SpaceId, {
  name: string;
  role: string;
  statement: string;
  image: string;
}> = {
  barberia: {
    name: 'Equipo Barbería Indian',
    role: 'Barbería y cuidado masculino',
    statement: 'Profesionales asignados según el servicio, la fecha y la disponibilidad seleccionada.',
    image: unsplashImage('photo-1507003211169-0a1dd7228f2d', 1400),
  },
  fotografia: {
    name: 'Equipo Estudio Fotográfico',
    role: 'Dirección y producción visual',
    statement: 'Acompañamiento para retrato, marca personal, contenido y fotografía de producto.',
    image: unsplashImage('photo-1500648767791-00dcc994a43e', 1400),
  },
  nails: {
    name: 'Equipo Nails Studio',
    role: 'Manicura, pedicura y sistemas',
    statement: 'Técnica, preparación e higiene para construir acabados limpios y duraderos.',
    image: unsplashImage('photo-1494790108377-be9c29b29330', 1400),
  },
  spa: {
    name: 'Equipo SPA Indian',
    role: 'Bienestar y cuidado personal',
    statement: 'La profesional se confirma según la experiencia, la valoración y el horario solicitado.',
    image: unsplashImage('photo-1594824476967-48c8b964273f', 1400),
  },
};
