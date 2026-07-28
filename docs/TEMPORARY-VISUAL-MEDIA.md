# Medios visuales temporales

Esta versión utiliza clips y fotografías de stock únicamente como referencia visual mientras Indian Club produce material propio.

## Videos Pexels

- Barbería: https://www.pexels.com/video/close-up-of-barber-cutting-hair-9738001/
- Barba y detalle: https://www.pexels.com/video/close-up-view-of-a-barber-trimming-facial-hair-of-a-client-5587280/
- Tattoo: https://www.pexels.com/video/close-up-on-tattoo-artist-working-9966329/
- Nails: https://www.pexels.com/video/a-person-having-a-manicure-4855796/
- Club / café: https://www.pexels.com/video/video-of-a-coffee-shop-interior-7652196/

Los videos se cargan mediante el endpoint de descarga de Pexels y deben sustituirse por archivos optimizados propios antes del lanzamiento definitivo.

## Posters de Unsplash

- Barbería: photo-1621605815971-fbc98d665033
- Barbería detalle: photo-1599351431202-1e0f0137899a
- Tattoo: photo-1611501275019-9b5cda994e8d
- Nails: photo-1604654894610-df63bc536371
- Café: photo-1554118811-1e0d58224f24

## Reemplazo recomendado

Cuando existan los archivos reales:

1. Guardarlos en `public/media/indian/`.
2. Generar versiones WebM y MP4 optimizadas.
3. Generar posters WebP o AVIF.
4. Actualizar `src/data/visualMedia.ts`.
5. Mantener los mismos nombres de claves para no modificar componentes.
6. Verificar peso, contraste, crops móvil/escritorio y reduced motion.
