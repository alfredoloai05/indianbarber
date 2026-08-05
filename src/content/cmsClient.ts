import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { normalizeCmsEntries, normalizeCmsValue, normalizePublishedCmsMap } from './cmsCompatibility';
import { cmsDefaultMap, cmsDefinitions } from './cmsDefaults';
import type { CmsEntryRecord, CmsJson, CmsMediaAsset, CmsPublishedMap } from './cmsTypes';

const DEMO_ENTRIES_KEY = 'indian-cms-demo-entries';
const DEMO_SESSION_KEY = 'indian-cms-demo-session';
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const MAX_VIDEO_SIZE = 25 * 1024 * 1024;

export const cmsAdminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@indianclubec.com';
export const isCmsDemoAvailable = !isSupabaseConfigured && (import.meta.env.DEV || import.meta.env.VITE_ADMIN_DEMO === 'true');

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function defaultRecords(): CmsEntryRecord[] {
  const timestamp = new Date().toISOString();
  return normalizeCmsEntries(
    cmsDefinitions.map((definition, index) => ({
      id: `demo-${definition.key}`,
      key: definition.key,
      group_name: definition.group,
      label: definition.label,
      description: definition.description,
      kind: definition.kind,
      sort_order: index,
      draft_value: clone(definition.value),
      published_value: clone(definition.value),
      updated_at: timestamp,
      published_at: timestamp,
    })),
  );
}

function getDemoRecords() {
  if (typeof window === 'undefined') return defaultRecords();
  const saved = window.localStorage.getItem(DEMO_ENTRIES_KEY);
  if (!saved) return defaultRecords();
  try {
    return normalizeCmsEntries(JSON.parse(saved) as CmsEntryRecord[]);
  } catch {
    return defaultRecords();
  }
}

function setDemoRecords(records: CmsEntryRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(DEMO_ENTRIES_KEY, JSON.stringify(normalizeCmsEntries(records)));
}

export function hasDemoSession() {
  return typeof window !== 'undefined' && window.sessionStorage.getItem(DEMO_SESSION_KEY) === 'true';
}

export function startDemoSession(username: string, password: string) {
  if (!isCmsDemoAvailable || username !== 'admin' || password !== 'admin') return false;
  window.sessionStorage.setItem(DEMO_SESSION_KEY, 'true');
  return true;
}

export function stopDemoSession() {
  if (typeof window !== 'undefined') window.sessionStorage.removeItem(DEMO_SESSION_KEY);
}

export async function signInCms(username: string, password: string) {
  if (!supabase) throw new Error('Supabase todavía no está configurado.');
  const email = username.includes('@') ? username : cmsAdminEmail;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

export async function signOutCms() {
  if (supabase) await supabase.auth.signOut();
  stopDemoSession();
}

export async function getCmsSession(): Promise<Session | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function ensureCmsEntries() {
  if (!supabase) return;
  const rows = cmsDefinitions.map((definition, index) => ({
    key: definition.key,
    group_name: definition.group,
    label: definition.label,
    description: definition.description,
    kind: definition.kind,
    sort_order: index,
    draft_value: definition.value,
    published_value: definition.value,
    is_locked: true,
  }));
  const { error } = await supabase.from('cms_entries').upsert(rows, {
    onConflict: 'key',
    ignoreDuplicates: true,
  });
  if (error) throw error;
}

export async function loadCmsEntries(): Promise<CmsEntryRecord[]> {
  if (!supabase) return getDemoRecords();
  const { data, error } = await supabase
    .from('cms_entries')
    .select('id,key,group_name,label,description,kind,sort_order,draft_value,published_value,updated_at,published_at')
    .order('sort_order');
  if (error) throw error;
  return normalizeCmsEntries((data ?? []) as CmsEntryRecord[]);
}

export async function loadPublishedCmsMap(): Promise<CmsPublishedMap> {
  if (!supabase) return normalizePublishedCmsMap(clone(cmsDefaultMap) as CmsPublishedMap);
  const { data, error } = await supabase.from('cms_entries').select('key,published_value');
  if (error) throw error;
  const map: CmsPublishedMap = clone(cmsDefaultMap) as CmsPublishedMap;
  for (const row of data ?? []) {
    if (row.published_value !== null) map[row.key] = row.published_value as CmsJson;
  }
  return normalizePublishedCmsMap(map);
}

export async function saveCmsDraft(key: string, value: CmsJson) {
  const normalizedValue = normalizeCmsValue(key, value);
  if (!supabase) {
    const timestamp = new Date().toISOString();
    const records = getDemoRecords().map((entry) =>
      entry.key === key ? { ...entry, draft_value: clone(normalizedValue), updated_at: timestamp } : entry,
    );
    setDemoRecords(records);
    return;
  }
  const { error } = await supabase.from('cms_entries').update({ draft_value: normalizedValue }).eq('key', key);
  if (error) throw error;
}

export async function publishCmsEntry(key: string) {
  if (!supabase) {
    const timestamp = new Date().toISOString();
    const records = getDemoRecords().map((entry) =>
      entry.key === key
        ? { ...entry, published_value: clone(entry.draft_value), updated_at: timestamp, published_at: timestamp }
        : entry,
    );
    setDemoRecords(records);
    return;
  }
  const { error } = await supabase.rpc('publish_cms_entry', { p_entry_key: key });
  if (error) throw error;
}

export async function resetCmsDraft(key: string) {
  if (!supabase) {
    const records = getDemoRecords().map((entry) =>
      entry.key === key && entry.published_value !== null
        ? { ...entry, draft_value: clone(entry.published_value) }
        : entry,
    );
    setDemoRecords(records);
    return;
  }
  const { data, error } = await supabase.from('cms_entries').select('published_value').eq('key', key).single();
  if (error) throw error;
  const normalizedValue = normalizeCmsValue(key, data.published_value as CmsJson);
  const { error: updateError } = await supabase
    .from('cms_entries')
    .update({ draft_value: normalizedValue })
    .eq('key', key);
  if (updateError) throw updateError;
}

export async function loadMediaAssets(): Promise<CmsMediaAsset[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('media_assets')
    .select('id,storage_path,public_url,media_type,mime_type,original_name,size_bytes,alt_text,created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as CmsMediaAsset[];
}

function sanitizeFileName(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function uploadCmsMedia(file: File, folder = 'uploads'): Promise<CmsMediaAsset> {
  if (!supabase) throw new Error('La subida de archivos necesita Supabase configurado.');
  const mediaType = file.type.startsWith('video/') ? 'video' : file.type.startsWith('image/') ? 'image' : null;
  if (!mediaType) throw new Error('Solo se permiten imágenes y videos.');
  if (mediaType === 'image' && file.size > MAX_IMAGE_SIZE) throw new Error('La imagen supera el límite de 4 MB.');
  if (mediaType === 'video' && file.size > MAX_VIDEO_SIZE) throw new Error('El video supera el límite de 25 MB.');

  const fileName = `${Date.now()}-${sanitizeFileName(file.name)}`;
  const storagePath = `${folder}/${fileName}`;
  const { error: uploadError } = await supabase.storage.from('site-media').upload(storagePath, file, {
    cacheControl: '31536000',
    upsert: false,
    contentType: file.type,
  });
  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from('site-media').getPublicUrl(storagePath);
  const record = {
    storage_path: storagePath,
    public_url: urlData.publicUrl,
    media_type: mediaType,
    mime_type: file.type,
    original_name: file.name,
    size_bytes: file.size,
  };
  const { data, error } = await supabase.from('media_assets').insert(record).select().single();
  if (error) throw error;
  return data as CmsMediaAsset;
}
