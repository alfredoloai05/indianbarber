import { useId, useState } from 'react';
import type { CmsJson } from '../content/cmsTypes';

const LOCKED_FIELDS = new Set(['id', 'route', 'aliases', 'slug', 'className', 'kind', 'to']);
const LONG_TEXT_FIELDS = new Set([
  'description',
  'summary',
  'excerpt',
  'statement',
  'lead',
  'note',
  'body',
  'bookingDescription',
  'collaborationDescription',
]);

function isRecord(value: CmsJson): value is Record<string, CmsJson> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function humanize(key: string) {
  const labels: Record<string, string> = {
    eyebrow: 'Etiqueta',
    title: 'Título',
    description: 'Descripción',
    summary: 'Resumen',
    lead: 'Texto principal',
    poster: 'Imagen previa',
    video: 'Video',
    image: 'Imagen',
    logoMark: 'Logo circular',
    logoLockup: 'Logo completo',
    phone: 'Teléfono visible',
    phoneHref: 'Enlace telefónico',
    whatsapp: 'WhatsApp visible',
    whatsappHref: 'Enlace de WhatsApp',
    email: 'Correo',
    emailHref: 'Enlace de correo',
    address: 'Dirección',
    city: 'Ciudad',
    mapHref: 'Enlace de mapa',
    bookingUrl: 'Enlace de reservas',
    primaryLabel: 'Botón principal',
    secondaryLabel: 'Botón secundario',
    ctaLabel: 'Texto del botón',
    buttonLabel: 'Texto del botón',
    duration: 'Duración',
    price: 'Precio',
    visible: 'Visible',
    role: 'Cargo',
    name: 'Nombre',
    label: 'Etiqueta',
    alt: 'Texto alternativo',
    type: 'Categoría',
    values: 'Valores',
    hours: 'Horarios',
    navigation: 'Navegación',
    groups: 'Grupos',
    items: 'Opciones',
    frames: 'Imágenes',
    gallery: 'Galería',
    amenities: 'Beneficios',
    steps: 'Pasos',
    journey: 'Recorrido',
  };
  if (labels[key]) return labels[key];
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (letter) => letter.toUpperCase());
}

function isMediaField(key: string, value: CmsJson) {
  if (typeof value !== 'string') return false;
  return /(image|poster|video|logo|media|photo|thumbnail)/i.test(key);
}

function isVideoUrl(key: string, value: string) {
  return /video/i.test(key) || /\.(mp4|webm|mov)(\?|$)/i.test(value) || value.includes('/video/');
}

function emptyFromTemplate(value: CmsJson): CmsJson {
  if (Array.isArray(value)) return [];
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        LOCKED_FIELDS.has(key) ? child : emptyFromTemplate(child),
      ]),
    );
  }
  if (typeof value === 'boolean') return true;
  if (typeof value === 'number') return 0;
  return '';
}

type StructuredEditorProps = {
  value: CmsJson;
  rootKey: string;
  onChange: (value: CmsJson) => void;
  onUpload: (file: File, folder: string) => Promise<string>;
  path?: string[];
  fieldKey?: string;
};

export function StructuredEditor({
  value,
  rootKey,
  onChange,
  onUpload,
  path = [],
  fieldKey = 'content',
}: StructuredEditorProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const locked = LOCKED_FIELDS.has(fieldKey);
  const currentPath = [...path, fieldKey];

  if (Array.isArray(value)) {
    const rootCollectionLocked =
      (rootKey === 'services.catalog' && path.length === 0) ||
      (rootKey === 'global.settings' && fieldKey === 'navigation');

    function updateAt(index: number, nextValue: CmsJson) {
      onChange(value.map((item, itemIndex) => (itemIndex === index ? nextValue : item)));
    }

    function removeAt(index: number) {
      onChange(value.filter((_, itemIndex) => itemIndex !== index));
    }

    function move(index: number, direction: -1 | 1) {
      const target = index + direction;
      if (target < 0 || target >= value.length) return;
      const next = [...value];
      [next[index], next[target]] = [next[target], next[index]];
      onChange(next);
    }

    const template = value[0] ?? '';
    return (
      <section className="cms-array-field">
        <div className="cms-field-heading">
          <div>
            <span>{humanize(fieldKey)}</span>
            <small>{value.length} elemento{value.length === 1 ? '' : 's'}</small>
          </div>
          {!rootCollectionLocked && !locked ? (
            <button type="button" onClick={() => onChange([...value, emptyFromTemplate(template)])}>
              Agregar
            </button>
          ) : null}
        </div>
        <div className="cms-array-list">
          {value.map((item, index) => (
            <article className="cms-array-item" key={`${currentPath.join('.')}-${index}`}>
              <header>
                <strong>{isRecord(item) && typeof item.title === 'string' ? item.title : isRecord(item) && typeof item.name === 'string' ? item.name : `${humanize(fieldKey)} ${index + 1}`}</strong>
                <div>
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Mover arriba">↑</button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === value.length - 1} aria-label="Mover abajo">↓</button>
                  {!rootCollectionLocked && !locked ? <button type="button" onClick={() => removeAt(index)}>Eliminar</button> : null}
                </div>
              </header>
              <StructuredEditor
                value={item}
                rootKey={rootKey}
                onChange={(next) => updateAt(index, next)}
                onUpload={onUpload}
                path={currentPath}
                fieldKey={String(index)}
              />
            </article>
          ))}
          {value.length === 0 ? <p className="cms-empty-list">No hay elementos. Usa “Agregar” para crear el primero.</p> : null}
        </div>
      </section>
    );
  }

  if (isRecord(value)) {
    return (
      <div className={`cms-object-field${path.length === 0 ? ' cms-object-field--root' : ''}`}>
        {Object.entries(value).map(([key, child]) => (
          <StructuredEditor
            key={`${currentPath.join('.')}-${key}`}
            value={child}
            rootKey={rootKey}
            onChange={(nextChild) => onChange({ ...value, [key]: nextChild })}
            onUpload={onUpload}
            path={currentPath}
            fieldKey={key}
          />
        ))}
      </div>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <label className="cms-toggle-field" htmlFor={inputId}>
        <span>{humanize(fieldKey)}</span>
        <input id={inputId} type="checkbox" checked={value} disabled={locked} onChange={(event) => onChange(event.target.checked)} />
        <i aria-hidden="true" />
      </label>
    );
  }

  if (typeof value === 'number') {
    return (
      <label className="cms-input-field" htmlFor={inputId}>
        <span>{humanize(fieldKey)}</span>
        <input id={inputId} type="number" value={value} disabled={locked} onChange={(event) => onChange(Number(event.target.value))} />
      </label>
    );
  }

  const stringValue = value === null ? '' : String(value);

  if (isMediaField(fieldKey, stringValue)) {
    const video = isVideoUrl(fieldKey, stringValue);
    async function handleFile(file?: File) {
      if (!file) return;
      setUploading(true);
      setUploadError('');
      try {
        const url = await onUpload(file, `${rootKey.replaceAll('.', '/')}/${fieldKey}`);
        onChange(url);
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : 'No se pudo subir el archivo.');
      } finally {
        setUploading(false);
      }
    }

    return (
      <section className="cms-media-field">
        <div className="cms-field-heading">
          <div><span>{humanize(fieldKey)}</span><small>{video ? 'Video' : 'Imagen'}</small></div>
        </div>
        <div className="cms-media-preview">
          {stringValue ? (
            video ? <video src={stringValue} muted loop playsInline controls preload="metadata" /> : <img src={stringValue} alt="Vista previa del recurso actual" />
          ) : (
            <div className="cms-media-placeholder">Sin recurso</div>
          )}
        </div>
        <label className="cms-input-field" htmlFor={inputId}>
          <span>Dirección del archivo</span>
          <input id={inputId} type="url" value={stringValue} disabled={locked} onChange={(event) => onChange(event.target.value)} />
        </label>
        {!locked ? (
          <label className="cms-upload-control">
            <input type="file" accept={video ? 'video/mp4,video/webm,video/quicktime' : 'image/jpeg,image/png,image/webp,image/avif'} onChange={(event) => void handleFile(event.target.files?.[0])} />
            <span>{uploading ? 'Subiendo…' : `Reemplazar ${video ? 'video' : 'imagen'}`}</span>
          </label>
        ) : null}
        {uploadError ? <p className="cms-field-error" role="alert">{uploadError}</p> : null}
      </section>
    );
  }

  const useTextarea = LONG_TEXT_FIELDS.has(fieldKey) || stringValue.length > 120;
  return (
    <label className="cms-input-field" htmlFor={inputId}>
      <span>{humanize(fieldKey)}</span>
      {useTextarea ? (
        <textarea id={inputId} value={stringValue} disabled={locked} rows={Math.min(8, Math.max(3, Math.ceil(stringValue.length / 90)))} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input id={inputId} type={/href|url/i.test(fieldKey) ? 'url' : 'text'} value={stringValue} disabled={locked} onChange={(event) => onChange(event.target.value)} />
      )}
      {locked ? <small>Este campo mantiene la estructura y no puede cambiarse desde el panel.</small> : null}
    </label>
  );
}
