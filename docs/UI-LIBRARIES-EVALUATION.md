# Evaluación de librerías UI para Indian Club

## Principio general

Indian Club no adoptará una librería completa como identidad visual. Cada recurso externo se evaluará como materia prima: se toma el patrón, se adapta a los tokens del proyecto, se simplifica y se valida en accesibilidad, rendimiento y responsive.

## Criterios obligatorios

1. Debe reforzar `House of Presence`, no parecer un bloque de plantilla.
2. Debe funcionar sin depender exclusivamente de hover o animación.
3. Debe respetar `prefers-reduced-motion`.
4. Debe usar los tokens negros, dorados, marfil y piedra de Indian Club.
5. Debe evitar dependencias innecesarias y preservar el presupuesto de JavaScript.
6. Debe mantener HTML semántico, teclado, foco y contraste.
7. El código incorporado pasa a ser mantenido por el proyecto y debe quedar documentado.

## Evaluación

### Unlumen UI

Uso recomendado: revelados tipográficos, transiciones editoriales, navegación inmersiva y pequeños recursos de ambientación.

Regla: incorporar solo componentes aislados y reescribir estilos para Indian Club.

### Magic UI

Uso recomendado: blur reveal, marquee controlado, fondos de grilla o texturas y efectos de entrada muy puntuales.

Regla: evitar efectos decorativos acumulados. Una sección no debe usar más de un gesto protagonista.

### SmoothUI

Uso recomendado: tabs animados, transiciones entre estados, navegación de servicios y microinteracciones de respuesta.

Regla: priorizar patrones que mejoren continuidad y comprensión, no animación por sí misma.

### RetroUI

Uso recomendado: prácticamente ninguno en el sitio público. Puede servir como referencia para piezas temporales, campañas o una exploración gráfica muy controlada.

Regla: su lenguaje neobrutalista no debe contaminar la dirección premium negra y dorada.

### 21st.dev

Uso recomendado: búsqueda de soluciones concretas para menús, calendarios, galerías, loaders, accordions y bloques complejos.

Regla: revisar autor, dependencias, accesibilidad y calidad antes de copiar cualquier componente. No asumir consistencia entre recursos de distintos autores.

### Particles by Casberry

Uso recomendado: una única escena de firma, por ejemplo el monograma IC, una pluma o una formación abstracta ligada a presencia y ritual.

Regla: no convertir toda la web en una demo WebGL. Debe cargar de forma diferida, tener poster/fallback, desactivarse con reduced motion y respetar presupuesto de GPU, batería y datos móviles.

### Origin UI

Uso recomendado: componentes funcionales para formularios, filtros, calendarios, diálogos, tablas y futuro panel administrativo.

Regla: adaptar estructura y accesibilidad, eliminando cualquier apariencia genérica del componente original.

### daisyUI

Uso recomendado: panel administrativo, prototipos internos o herramientas operativas donde velocidad y consistencia pesen más que una dirección artística exclusiva.

Regla: no utilizar como sistema visual principal del sitio público.

## Decisión por superficie

| Superficie | Fuentes prioritarias |
|---|---|
| Sitio público | Unlumen UI, Magic UI, SmoothUI y componentes seleccionados de 21st.dev |
| Escena 3D de firma | Particles by Casberry / Three.js, solo si supera QA de rendimiento |
| Formularios y reservas | Origin UI y patrones accesibles propios |
| Panel administrativo | Origin UI o daisyUI con tema propio |
| Campañas experimentales | RetroUI únicamente con una justificación creativa específica |

## Proceso de adopción

1. Identificar el problema de experiencia.
2. Buscar máximo tres referencias.
3. Elegir el patrón más simple que resuelva el problema.
4. Copiar únicamente el código necesario.
5. Renombrar, limpiar y adaptar a tokens.
6. Añadir fallback y reduced motion.
7. Probar teclado, móvil, red lenta y build.
8. Registrar la decisión en el changelog.

La regla final es simple: la biblioteca nunca debe reconocerse antes que Indian Club.
