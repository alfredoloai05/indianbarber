# AgendaPro Premium bridge — Indian Fase 1

## Objetivo

Mantener la experiencia visual y de descubrimiento dentro de Indian Club mientras AgendaPro sigue siendo temporalmente la fuente real de disponibilidad y confirmación hasta que Indian Fase 2 reemplace el motor de reservas.

## Fuente

- Sucursal pública: `224670`
- Sitio: `https://indianclub.site.agendapro.com/ec/sucursal/224670`
- Iframe oficial suministrado por AgendaPro: `https://agendapro.com/iframe/overview/ee389fa5-e2a8-4ac2-a824-94221f4c47f0`
- Catálogo cruzado desde el export `services_report_240304_1787108531.xlsx` recibido el 2026-08-18.
- No se almacena ninguna API key ni credencial privada en el repositorio.

## Flujo actual

1. El cliente entra a `/reservar` en Indian.
2. Elige área y servicio dentro de la interfaz Indian.
3. Si el servicio tiene un `services_id` público mapeado, Indian muestra `Agenda online`.
4. `Ver horarios disponibles` abre el iframe oficial de AgendaPro dentro de un modal de pantalla completa con shell visual Indian.
5. AgendaPro gestiona profesional, fecha, hora, datos del cliente y confirmación real.
6. Siempre existe un enlace externo al deep link público `?services_id=...` como fallback.
7. Servicios sin mapping (por ejemplo fotografía o experiencias SPA genéricas aún no equivalentes) pasan a coordinación por WhatsApp en vez de mostrar horarios ficticios.

## Regla de datos

Para servicios mapeados, el precio y duración visibles en el sitio se sincronizan en runtime con el último export de AgendaPro. Los textos editoriales, imágenes y estructura siguen siendo administrables desde el CMS.

El bridge no intenta leer el DOM del iframe ni extraer disponibilidad porque AgendaPro corre en otro origen. Eso evita depender de scraping o de mecanismos frágiles/no documentados.

## Sustitución en Fase 2

Cuando el sistema propio de reservas esté listo:

- reemplazar `src/integrations/agendapro.ts` por el cliente del backend propio;
- reemplazar el modal/iframe de `ReservePage` por componentes nativos de disponibilidad, profesional, fecha, hora y confirmación;
- conservar las rutas `bookingPath`, el catálogo CMS y la mayor parte de la UI actual.

La integración está diseñada precisamente para que ese reemplazo no requiera otro rediseño de la web.
