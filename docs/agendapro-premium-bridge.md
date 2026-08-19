# AgendaPro Premium bridge — Indian Fase 1

## Objetivo

Mantener toda la experiencia visual y de descubrimiento dentro de Indian Club mientras AgendaPro sigue siendo temporalmente la fuente real de profesional, fecha, hora y confirmación hasta que Indian Fase 2 reemplace el motor de reservas.

## Fuente

- Sucursal pública: `224670`
- Sitio: `https://indianclub.site.agendapro.com/ec/sucursal/224670`
- Catálogo cruzado desde el export `services_report_240304_1787108531.xlsx` recibido el 2026-08-18.
- No se almacena ninguna API key ni credencial privada en el repositorio.

## Flujo actual

1. El cliente entra a `/reservar` en Indian.
2. Elige área y servicio dentro de la interfaz Indian.
3. Si el servicio tiene un `services_id` público mapeado, Indian muestra `Reserva online`.
4. `Elegir profesional y horario` abre el deep link público del servicio en una ventana compacta centrada, pensada para forzar una composición más cercana a móvil y evitar incrustar todo el sitio de AgendaPro a pantalla completa.
5. AgendaPro gestiona profesional, fecha, hora, datos del cliente y confirmación real.
6. Existe además un enlace `Abrir pantalla completa` como fallback.
7. Servicios sin mapping (por ejemplo fotografía o experiencias SPA genéricas aún no equivalentes) pasan a coordinación por WhatsApp en vez de mostrar horarios ficticios.

## Por qué ya no usamos iframe

El iframe oficial de AgendaPro carga su experiencia completa y no permite que Indian modifique el DOM o el CSS interno por tratarse de otro origen. En desktop generaba una composición visual demasiado grande, repetitiva y ajena al lenguaje de Indian.

El bridge ahora mantiene Indian hasta el último paso y abre AgendaPro únicamente en una ventana compacta usando el deep link público `?services_id=...` del servicio seleccionado. Esto evita el modal fullscreen, no inventa disponibilidad y sigue usando la agenda real.

## Regla de datos

Para servicios mapeados, el precio y duración visibles en el sitio se sincronizan en runtime con el último export de AgendaPro. Los textos editoriales, imágenes y estructura siguen siendo administrables desde el CMS.

## Sustitución en Fase 2

Cuando el sistema propio de reservas esté listo:

- reemplazar `src/integrations/agendapro.ts` por el cliente del backend propio;
- sustituir el handoff externo de `ReservePage` por componentes nativos de profesional, disponibilidad, fecha, hora y confirmación;
- conservar las rutas `bookingPath`, el catálogo CMS y la mayor parte de la UI actual.

La integración queda encapsulada para que ese reemplazo no requiera otro rediseño de la web.
