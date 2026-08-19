# AgendaPro Premium bridge — Indian Fase 1

## Objetivo

Mantener la experiencia de reserva dentro de Indian Club mientras AgendaPro sigue siendo temporalmente la fuente real de disponibilidad y confirmación hasta que Indian Fase 2 reemplace el motor de reservas.

## Fuente

- Sucursal pública: `224670`
- Sitio: `https://indianclub.site.agendapro.com/ec/sucursal/224670`
- Catálogo cruzado desde el export `services_report_240304_1787108531.xlsx` recibido el 2026-08-18.
- HAR público capturado en incógnito el 2026-08-18, sin sesión administrativa.
- No se almacena ninguna API key, cookie ni credencial privada en el repositorio.

## Hallazgos del HAR

El sitio público de AgendaPro consulta disponibilidad mediante peticiones GET JSON sin `Authorization` ni `Cookie` en las solicitudes observadas. El navegador de AgendaPro usa CORS restringido a su propio sitio; por eso Indian no llama estos endpoints directamente desde React. Un Supabase Edge Function actúa como adaptador server-side y normaliza las respuestas.

Endpoints observados:

- `GET /api_views/workflow/v2/service_providers/available_days_sql_improved`
  - devuelve días disponibles para `service_id` + `location`.
- `GET /api_views/workflow/v2/service_providers/available_hours_sql_improved`
  - devuelve bloques reales de mañana/tarde/noche, con `start_block`, `end_block`, `provider_id`, `available_provider`, precio y estado.
- `GET /api/v2/sites/service_providers/date_time`
  - para un servicio + fecha + bloque horario devuelve todos los profesionales disponibles, incluyendo `id`, `public_name` e imagen.

Ejemplo confirmado en el HAR para `Corte Relax (Cabello + Masaje)` (`service_id=2975138`): AgendaPro devolvió horarios reales y profesionales como Santiago Vivanco, Joel Sanmartín, Jose Miguel Guasha, Adrián Pardo y Jackson Guaman según el bloque consultado.

## Arquitectura temporal

```text
React Indian
   ↓ supabase.functions.invoke()
Supabase Edge Function: agendapro-availability
   ↓ GET server-side
Endpoints públicos usados por el sitio de AgendaPro
   ↓ JSON normalizado
React Indian: fecha → hora → profesional
```

La Edge Function:

- fija el local `224670`;
- usa una allow-list de IDs de servicios conocidos;
- no funciona como proxy abierto;
- valida fechas y horarios;
- limita consultas de días a un máximo de 31 días por petición;
- devuelve solo los campos necesarios para la UI;
- requiere JWT de Supabase (`verify_jwt=true`), por lo que el frontend usa el `anon` token normal del proyecto.

## Flujo actual

1. El cliente entra a `/reservar` en Indian.
2. Elige área y servicio dentro de la interfaz Indian.
3. Para servicios mapeados, Indian consulta los próximos días disponibles.
4. El cliente puede elegir cualquier fecha dentro del rango permitido, incluido noviembre de 2026 para QA.
5. Indian consulta y muestra las horas reales de esa fecha.
6. Al elegir hora, Indian consulta los profesionales realmente disponibles para ese bloque.
7. El cliente elige profesional dentro de Indian.
8. El último paso de confirmación todavía se completa en AgendaPro mediante el deep link público del servicio.
9. Servicios sin mapping pasan a coordinación por WhatsApp en vez de mostrar disponibilidad inventada.

## Limitación pendiente

El HAR actual no incluye la creación final de una reserva. Por eso todavía no reproducimos el POST de confirmación ni intentamos automatizarlo. Para completar la transición casi invisible necesitamos capturar un segundo HAR haciendo una reserva de prueba en noviembre de 2026 y analizar únicamente las llamadas del último paso.

Hasta entonces, Indian puede mostrar disponibilidad real sin iframe, pero AgendaPro sigue siendo el responsable de la confirmación final.

## Regla de datos

Para servicios mapeados, el precio y duración visibles se sincronizan en runtime con el último export de AgendaPro. Los textos editoriales, imágenes y estructura continúan administrables desde el CMS.

## Sustitución en Fase 2

Cuando el sistema propio de reservas esté listo:

- reemplazar `src/integrations/agendapro.ts` y `src/integrations/agendaproAvailability.ts` por el cliente del backend propio;
- retirar `supabase/functions/agendapro-availability`;
- conservar el catálogo, rutas y componentes de fecha/hora/profesional;
- conectar esos mismos componentes con el backend propio y crear la reserva directamente.

La UI queda diseñada para que Fase 2 sustituya el origen de datos, no la experiencia completa.
