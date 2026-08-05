import { serviceCatalog } from '../data/serviceCatalog';
import { visualMedia } from '../data/visualMedia';
import type { CmsEntryRecord, CmsJson, CmsPublishedMap } from './cmsTypes';

const LEGACY_CAFE_IMAGE =
  'https://images.unsplash.com/photo-1780398645489-85968d809196?auto=format&fit=crop&q=82&w=1800';
const PHOTO_STUDIO_IMAGE = visualMedia.hero.photoStudio.poster;
const SPA_IMAGE = visualMedia.hero.spa.poster;

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isRecord(value: CmsJson): value is { [key: string]: CmsJson } {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function replaceVisibleText(text: string) {
  return text
    .replace(/Tattoo Studio/gi, 'SPA')
    .replace(/tattoo/gi, 'SPA')
    .replace(/tatuajes?/gi, 'SPA')
    .replace(/cafetería/gi, 'Estudio Fotográfico')
    .replace(/café/gi, 'Estudio Fotográfico');
}

function normalizeTextFields(value: CmsJson, field = ''): CmsJson {
  if (typeof value === 'string') {
    const protectedFields = new Set(['route', 'aliases', 'slug', 'to', 'href', 'image', 'video', 'poster']);
    return protectedFields.has(field) ? value : replaceVisibleText(value);
  }

  if (Array.isArray(value)) return value.map((item) => normalizeTextFields(item, field));
  if (!isRecord(value)) return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, normalizeTextFields(item, key)]),
  ) as CmsJson;
}

function normalizeServices(value: CmsJson): CmsJson {
  if (!Array.isArray(value)) return clone(serviceCatalog) as unknown as CmsJson;
  const spaArea = serviceCatalog.find((area) => area.id === 'spa');
  if (!spaArea) return normalizeTextFields(value);

  const normalized = value.map((item) => {
    if (!isRecord(item)) return item;
    const id = typeof item.id === 'string' ? item.id.toLowerCase() : '';
    const title = typeof item.title === 'string' ? item.title.toLowerCase() : '';
    const route = typeof item.route === 'string' ? item.route.toLowerCase() : '';
    if (id === 'tattoo' || id === 'spa' || title.includes('tattoo') || route === 'tattoo-studio') {
      return clone(spaArea) as unknown as CmsJson;
    }
    return normalizeTextFields(item);
  });

  return normalized as CmsJson;
}

function normalizeTeam(value: CmsJson): CmsJson {
  if (!Array.isArray(value)) return value;
  return value
    .filter((item) => {
      if (!isRecord(item)) return true;
      const role = typeof item.role === 'string' ? item.role.toLowerCase() : '';
      const statement = typeof item.statement === 'string' ? item.statement.toLowerCase() : '';
      return !role.includes('tatuador') && !role.includes('tattoo') && !statement.includes('tatuaje');
    })
    .map((item) => normalizeTextFields(item)) as CmsJson;
}

function normalizeHomeClub(value: CmsJson): CmsJson {
  if (!isRecord(value)) return value;
  const normalized = normalizeTextFields(value) as { [key: string]: CmsJson };
  const serialized = JSON.stringify(value).toLowerCase();
  if (serialized.includes('café') || serialized.includes('cafetería')) {
    normalized.video = '';
    normalized.poster = PHOTO_STUDIO_IMAGE;
  }
  return normalized;
}

function normalizeClub(value: CmsJson): CmsJson {
  if (!isRecord(value)) return value;
  const normalized = normalizeTextFields(value) as { [key: string]: CmsJson };
  const serialized = JSON.stringify(value).toLowerCase();

  if (serialized.includes('café') || serialized.includes('cafetería')) {
    normalized.heroVideo = '';
    normalized.heroPoster = PHOTO_STUDIO_IMAGE;
  }

  if (Array.isArray(normalized.gallery)) {
    normalized.gallery = normalized.gallery.map((item) => {
      if (!isRecord(item)) return item;
      const source = JSON.stringify(item).toLowerCase();
      if (source.includes('café') || source.includes('cafetería')) {
        return {
          label: 'Estudio Fotográfico',
          title: 'Retratos y contenido visual dentro de Indian Club.',
          image: PHOTO_STUDIO_IMAGE,
        };
      }
      if (source.includes('tattoo') || source.includes('tatuaje')) {
        return {
          label: 'SPA',
          title: 'Bienestar, relajación y cuidado personal.',
          image: SPA_IMAGE,
        };
      }
      return normalizeTextFields(item);
    });
  }

  return normalized;
}

function normalizeStyleBook(value: CmsJson): CmsJson {
  if (!isRecord(value)) return value;
  const normalized = normalizeTextFields(value) as { [key: string]: CmsJson };
  if (!Array.isArray(normalized.frames)) return normalized;

  normalized.frames = normalized.frames.map((frame) => {
    if (!isRecord(frame)) return frame;
    const source = JSON.stringify(frame).toLowerCase();
    if (source.includes('tattoo') || source.includes('tatuaje')) {
      return { ...frame, image: SPA_IMAGE, label: 'SPA', alt: 'Experiencia SPA en Indian Club' };
    }
    if (source.includes('café') || source.includes('cafetería')) {
      return {
        ...frame,
        image: PHOTO_STUDIO_IMAGE,
        label: 'Estudio Fotográfico',
        alt: 'Estudio fotográfico de Indian Club',
      };
    }
    return normalizeTextFields(frame);
  });
  return normalized;
}

function normalizeGiftCardImage(value: CmsJson): CmsJson {
  if (!isRecord(value)) return value;
  const normalized = normalizeTextFields(value) as { [key: string]: CmsJson };
  if (normalized.image === LEGACY_CAFE_IMAGE) normalized.image = PHOTO_STUDIO_IMAGE;
  return normalized;
}

export function normalizeCmsValue(key: string, value: CmsJson): CmsJson {
  const source = clone(value);
  switch (key) {
    case 'services.catalog':
      return normalizeServices(source);
    case 'team.members':
      return normalizeTeam(source);
    case 'home.club':
      return normalizeHomeClub(source);
    case 'club.page':
      return normalizeClub(source);
    case 'stylebook.gallery':
      return normalizeStyleBook(source);
    case 'home.giftCards':
    case 'giftcards.page':
      return normalizeGiftCardImage(source);
    default:
      return normalizeTextFields(source);
  }
}

export function normalizePublishedCmsMap(map: CmsPublishedMap): CmsPublishedMap {
  return Object.fromEntries(
    Object.entries(map).map(([key, value]) => [key, normalizeCmsValue(key, value)]),
  );
}

export function normalizeCmsEntries(entries: CmsEntryRecord[]): CmsEntryRecord[] {
  return entries.map((entry) => ({
    ...entry,
    draft_value: normalizeCmsValue(entry.key, entry.draft_value),
    published_value:
      entry.published_value === null ? null : normalizeCmsValue(entry.key, entry.published_value),
  }));
}
