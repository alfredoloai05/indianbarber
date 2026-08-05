const pexelsVideo = (id: string) => `https://www.pexels.com/download/video/${id}/`;
const unsplashImage = (id: string, width = 2200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=88&w=${width}`;

const spaMedia = {
  poster: unsplashImage('photo-1540555700478-4be289fbecef'),
  video: '',
  source: 'Unsplash 1540555700478',
} as const;

const photoStudioMedia = {
  poster: unsplashImage('photo-1516035069371-29a1b244cc32'),
  video: '',
  source: 'Unsplash 1516035069371',
} as const;

export const visualMedia = {
  hero: {
    barber: {
      poster: unsplashImage('photo-1621605815971-fbc98d665033'),
      video: pexelsVideo('9738001'),
      source: 'Pexels 9738001 / Unsplash 1621605815971',
    },
    spa: spaMedia,
    nails: {
      poster: unsplashImage('photo-1604654894610-df63bc536371'),
      video: pexelsVideo('30706938'),
      source: 'Pexels 30706938 / Unsplash 1604654894610',
    },
    photoStudio: photoStudioMedia,
  },
  intent: {
    cut: {
      poster: unsplashImage('photo-1503951914875-452162b0f3f1'),
      video: pexelsVideo('9737999'),
      source: 'Pexels 9737999 / Unsplash 1503951914875',
    },
    beard: {
      poster: unsplashImage('photo-1599351431202-1e0f0137899a'),
      video: pexelsVideo('8252026'),
      source: 'Pexels 8252026 / Unsplash 1599351431202',
    },
    nails: {
      poster: unsplashImage('photo-1610992015732-2449b76344bc'),
      video: pexelsVideo('7754409'),
      source: 'Pexels 7754409 / Unsplash 1610992015732',
    },
    spa: spaMedia,
  },
  services: [
    {
      poster: unsplashImage('photo-1585747860715-2ba37e788b70'),
      video: pexelsVideo('8252400'),
      source: 'Pexels 8252400 / Unsplash 1585747860715',
    },
    {
      poster: unsplashImage('photo-1622288432450-277d0fef5ed6'),
      video: pexelsVideo('5587280'),
      source: 'Pexels 5587280 / Unsplash 1622288432450',
    },
    {
      poster: unsplashImage('photo-1507003211169-0a1dd7228f2d'),
      video: pexelsVideo('5272685'),
      source: 'Pexels 5272685 / Unsplash 1507003211169',
    },
    {
      poster: unsplashImage('photo-1607779097040-26e80aa78e66'),
      video: pexelsVideo('7754413'),
      source: 'Pexels 7754413 / Unsplash 1607779097040',
    },
    spaMedia,
    {
      poster: unsplashImage('photo-1487412912498-0447578fcca8'),
      video: pexelsVideo('7697135'),
      source: 'Pexels 7697135 / Unsplash 1487412912498',
    },
  ],
  clubFeature: photoStudioMedia,
  journal: {
    poster: unsplashImage('photo-1521590832167-7bcbfaa6381f', 1800),
    source: 'Unsplash 1521590832167',
  },
} as const;
