# Indian Club — House of Presence

Frontend del rediseño digital de Indian Club, construido a partir de la Auditoría Forense, la Estrategia de Marca y el Master Blueprint.

## Stack

- React + TypeScript
- Vite
- React Router
- Framer Motion
- Supabase Auth, PostgreSQL y RLS para el panel de contenido
- CSS propio con design tokens
- GitHub Actions para lint y build

## Ejecutar localmente

```bash
git fetch origin
git switch feature/initial-frontend
git pull origin feature/initial-frontend
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

## Rutas públicas

```text
/                         Home cinematográfica
/servicios                Catálogo editorial
/servicios/:slug          Detalle y ritual de servicio
/equipo                    Oficio y perfiles
/club                      Casa, café y cultura
/inspirate                 Journal
/inspirate/:slug           Plantilla de artículo
/contacto                  Llegada y datos operativos
/reservar                  Handoff transparente a AgendaPro
/admin                     Panel privado de contenido
/*                         Recuperación 404
```

## Configuración

Copia el archivo de ejemplo:

```bash
cp .env.example .env.local
```

En PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Completa solamente estas variables:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_BOOKING_URL=
```

La clave `service_role` jamás debe colocarse en el frontend ni subirse al repositorio.

## Supabase

La migración inicial está en:

```text
supabase/migrations/202607280001_initial_content_admin.sql
```

Incluye:

- `profiles` con roles `admin` y `editor`
- `site_content` con contenido JSON versionable
- RLS habilitado
- lectura pública únicamente para contenido publicado
- escritura limitada a usuarios autorizados
- eliminación limitada a administradores
- contenido inicial de referencia

Después de crear un usuario en Supabase Auth, su rol debe registrarse manualmente en `public.profiles` desde un entorno administrativo seguro.

## Dirección visual

La interfaz utiliza una dirección **negra y dorada**, editorial y cinematográfica. Se evita deliberadamente la típica landing construida como una sucesión de tarjetas intercambiables.

La composición incluye:

- Hero editorial de gran formato
- Navegación fija y menú móvil inmersivo
- Progreso de scroll
- Atlas interactivo de servicios en formato lista
- Manifiesto de marca a página completa
- Recorrido del ritual
- Collage visual para club, café y cultura
- Journal editorial
- Páginas internas con composición propia
- CTA de reserva conectado temporalmente al flujo actual
- Motion con soporte para `prefers-reduced-motion`
- Layout responsive para escritorio, tablet y móvil

## Criterio sobre librerías UI

No se incorporan kits completos de UI por defecto. Recursos de Magic UI, Smooth UI, 21st.dev, Origin UI, Unlumen UI u otras bibliotecas pueden utilizarse selectivamente cuando aporten una interacción concreta, pero cada pieza debe adaptarse al lenguaje visual de Indian Club.

El objetivo es evitar que el proyecto herede la estética reconocible de una plantilla o de una landing generada por IA.

## Datos pendientes de validación

No se inventaron datos operativos. Antes de producción deben confirmarse:

- URL exacta de AgendaPro
- nombres, especialidades y fotografías reales del equipo
- servicios, duraciones y precios
- dirección exacta
- horarios
- WhatsApp y correo
- políticas de cancelación y reagendamiento
- derechos y crops de cada fotografía o video

## Rama de trabajo

```text
feature/initial-frontend
```
