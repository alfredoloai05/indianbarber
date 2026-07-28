# Indian Club — House of Presence

Frontend del rediseño digital de Indian Club, construido a partir de la Auditoría Forense, la Estrategia de Marca y el Master Blueprint.

## Stack

- React
- TypeScript
- Vite
- Framer Motion
- CSS propio con design tokens
- GitHub Actions para lint y build

## Ejecutar localmente

```bash
git fetch origin
git switch feature/initial-frontend
npm install
npm run dev
```

La aplicación se abre normalmente en:

```text
http://localhost:5173
```

## Validaciones

```bash
npm run lint
npm run build
```

## Dirección visual actual

La interfaz utiliza una dirección **negra y dorada**, editorial y cinematográfica. Se evita deliberadamente la típica landing construida como una sucesión de tarjetas intercambiables.

La composición incluye:

- Hero editorial de gran formato
- Navegación fija y menú móvil inmersivo
- Progreso de scroll
- Tipografía display y sistema de color negro/dorado
- Atlas interactivo de servicios en formato lista, no card grid
- Manifiesto de marca a página completa
- Recorrido del ritual
- Collage visual para club, café y cultura
- Journal editorial
- CTA de reserva conectado temporalmente al flujo actual
- Motion con soporte para `prefers-reduced-motion`
- Layout responsive para escritorio, tablet y móvil

## Criterio sobre librerías UI

No se incorporan kits completos de UI por defecto. Recursos de Magic UI, Smooth UI, 21st.dev, Origin UI u otras bibliotecas pueden utilizarse de manera selectiva cuando aporten una interacción concreta, pero cada pieza debe adaptarse al lenguaje visual de Indian Club.

El objetivo es evitar que el proyecto herede la estética reconocible de una plantilla o de una landing generada por IA.

## Recursos temporales

Las fotografías remotas actuales son referencias de prototipo. Antes de producción deben sustituirse por fotografías propias de Indian Club, con derechos, crops responsive, textos alternativos y optimización local/CDN.

## Rama de trabajo

```text
feature/initial-frontend
```
