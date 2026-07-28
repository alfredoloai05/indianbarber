# QA Checklist — Indian Club

## Visual

- [ ] Revisar 1440, 1280, 1024, 768, 430, 390 y 360 px.
- [ ] Confirmar que los títulos no generen cortes accidentales.
- [ ] Verificar contraste negro/dorado/ivory.
- [ ] Sustituir imágenes remotas antes de producción.
- [ ] Confirmar crops por breakpoint.

## Interacción

- [ ] Navegación por teclado completa.
- [ ] Focus visible en enlaces, botones y filas de servicios.
- [ ] Menú móvil abre, cierra y devuelve el foco.
- [ ] El cambio de servicio no desplaza el layout.
- [ ] Enlaces externos comunican correctamente su destino.

## Motion

- [ ] Validar animaciones a 60 FPS.
- [ ] Verificar `prefers-reduced-motion`.
- [ ] No bloquear scroll ni lectura.
- [ ] El contenido principal aparece aunque falle JavaScript de motion.

## Performance

- [ ] Migrar imágenes a AVIF/WebP local o CDN.
- [ ] Definir dimensiones y `srcset`.
- [ ] Evitar que las fuentes externas bloqueen LCP.
- [ ] Medir LCP, INP y CLS.
- [ ] Revisar peso total de JavaScript.

## Contenido

- [ ] Validar servicios, nombres y duraciones.
- [ ] Confirmar dirección, horarios y contacto.
- [ ] Validar CTA y URL real de AgendaPro.
- [ ] Revisar textos con el tono de voz acordado.
- [ ] Añadir textos alternativos definitivos.

## Release

- [ ] `npm run lint` exitoso.
- [ ] `npm run build` exitoso.
- [ ] Revisión manual en Chrome, Safari y Firefox.
- [ ] UAT con el cliente.
