# Configuración del administrador de Indian Club

El administrador vive en `/admin`, utiliza el mismo proyecto React y está diseñado exclusivamente para escritorio desde 1024 px.

## Arquitectura

- Frontend público y `/admin`: React + Vite.
- Hosting final: Cloudflare Pages.
- Base de datos: Supabase PostgreSQL.
- Autenticación: Supabase Auth.
- Imágenes y videos: Supabase Storage, bucket `site-media`.
- Seguridad: Row Level Security (RLS).

La web conserva el contenido incluido en el código como fallback. Si Supabase todavía no está configurado o existe un fallo temporal, las páginas públicas siguen funcionando.

## 1. Crear el proyecto en Supabase

1. Crea un proyecto Free en Supabase.
2. Abre `SQL Editor`.
3. Ejecuta en orden:
   - `supabase/migrations/202607280001_initial_content_admin.sql`
   - `supabase/migrations/202607300002_complete_content_cms.sql`

La segunda migración crea:

- `cms_entries`
- `content_revisions`
- `media_assets`
- `cms_audit_log`
- bucket `site-media`
- políticas RLS
- función de publicación
- creación automática de perfiles

## 2. Crear el usuario administrador

En Supabase:

1. Ve a `Authentication → Users`.
2. Crea el usuario `admin@indianclubec.com`.
3. Utiliza temporalmente una contraseña de al menos 6 caracteres; Supabase no acepta la contraseña `admin` de cinco caracteres.
4. Después de crear el usuario, ejecuta:

```sql
update public.profiles
set
  role = 'admin',
  username = 'admin',
  display_name = 'Administrador Indian Club',
  must_change_password = true
where id = (
  select id from auth.users where email = 'admin@indianclubec.com'
);
```

El formulario del panel seguirá mostrando `admin` como usuario. Internamente lo convierte al correo definido en `VITE_ADMIN_EMAIL`.

### Demostración local

Sin Supabase configurado, al ejecutar `npm run dev` se puede entrar con:

- Usuario: `admin`
- Contraseña: `admin`

Ese modo guarda cambios únicamente en el navegador local y no modifica la web publicada.

No habilites `VITE_ADMIN_DEMO=true` en producción.

## 3. Variables locales

Copia `.env.example` como `.env.local` y completa:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_CLAVE_PUBLICA_ANON
VITE_ADMIN_EMAIL=admin@indianclubec.com
VITE_ADMIN_DEMO=false
VITE_BOOKING_URL=https://indianclubec.com/citas
```

La URL y la clave pública se encuentran en:

`Supabase Dashboard → Project Settings → API`

No coloques en el frontend:

- contraseña de PostgreSQL;
- connection string de la base;
- service_role key;
- secretos privados.

## 4. Variables en Cloudflare Pages

En el proyecto de Cloudflare Pages:

1. Abre `Settings`.
2. Entra a `Environment variables`.
3. Añade las mismas variables para `Production` y `Preview`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_EMAIL`
   - `VITE_ADMIN_DEMO=false`
   - `VITE_BOOKING_URL`
4. Ejecuta un nuevo deployment.

## 5. Primera entrada al panel

Al iniciar sesión por primera vez, el panel crea automáticamente las entradas fijas del CMS utilizando el contenido actual del sitio.

Se pueden modificar:

- Home
- hero
- portales de servicios
- Club
- promociones
- Gift Cards
- consejos
- ubicación
- categorías y opciones de servicio
- precios y duraciones
- integrantes del equipo
- página del Club
- Style Book
- artículos de Inspírate
- productos
- contacto
- teléfono, WhatsApp, correo, horarios, dirección y AgendaPro
- imágenes, posters y videos

No se pueden crear ni eliminar páginas o secciones estructurales.

## 6. Flujo editorial

1. Editar.
2. `Guardar borrador`.
3. Revisar la vista previa.
4. `Publicar`.
5. La web pública obtiene la nueva versión desde Supabase.

Cada publicación conserva la versión anterior en `content_revisions` y registra la acción en `cms_audit_log`.

## Límites de archivos

- Imágenes: máximo 4 MB.
- Videos: máximo 25 MB.
- Formatos de imagen: JPEG, PNG, WebP, AVIF.
- Formatos de video: MP4, WebM, QuickTime.

Los videos deben ser cortos, estar optimizados y preferiblemente no contener audio.
