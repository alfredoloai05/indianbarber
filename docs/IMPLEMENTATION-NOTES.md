# Notas de implementación

## Estado

Esta rama contiene la primera dirección visual avanzada del sitio público de Indian Club.

## Decisiones técnicas

- React + TypeScript + Vite.
- Framer Motion para transiciones y scroll progress.
- CSS propio para evitar dependencia visual de un kit.
- Design tokens centralizados.
- Responsive desde 320 px.
- `prefers-reduced-motion` respetado en CSS y componentes.

## Dependencias futuras

No agregar una librería UI completa sin una evaluación previa de:

- peso añadido,
- accesibilidad,
- compatibilidad con SSR si se migra a Next.js,
- capacidad de tematización,
- impacto visual de plantilla,
- mantenimiento.

## Contenido temporal

- Las fotografías externas son placeholders.
- El enlace de reserva apunta temporalmente al sitio actual.
- Textos de servicios deben validarse con el cliente.
- Precios, horarios y políticas todavía no están incorporados.

## Definition of Done para esta iteración

- [x] Dirección negra y dorada.
- [x] Hero editorial.
- [x] Navegación desktop y móvil.
- [x] Atlas interactivo de servicios.
- [x] Manifiesto, ritual, club, journal y CTA.
- [x] Responsive base.
- [x] Reduced motion.
- [x] Lint y build configurados en CI.
- [ ] Reemplazo de imágenes por producción propia.
- [ ] Pruebas visuales en navegadores reales.
- [ ] Auditoría Lighthouse.
- [ ] Integración real con AgendaPro.
