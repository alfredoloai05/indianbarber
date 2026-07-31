import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { StructuredEditor } from '../admin/StructuredEditor';
import { Seo } from '../components/Seo';
import {
  ensureCmsEntries,
  getCmsSession,
  hasDemoSession,
  isCmsDemoAvailable,
  loadCmsEntries,
  loadMediaAssets,
  publishCmsEntry,
  resetCmsDraft,
  saveCmsDraft,
  signInCms,
  signOutCms,
  startDemoSession,
  uploadCmsMedia,
} from '../content/cmsClient';
import { useCms } from '../content/CmsProvider';
import type { CmsEntryRecord, CmsJson, CmsMediaAsset } from '../content/cmsTypes';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const MEDIA_LIBRARY_KEY = '__media_library__';

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function findFirstMedia(value: CmsJson): { url: string; video: boolean } | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const result = findFirstMedia(item);
      if (result) return result;
    }
    return null;
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, CmsJson>;
    const preferredKeys = ['video', 'heroVideo', 'image', 'poster', 'heroPoster', 'logoLockup', 'logoMark'];
    for (const key of preferredKeys) {
      const current = record[key];
      if (typeof current === 'string' && current) {
        return { url: current, video: /video/i.test(key) || /\.(mp4|webm|mov)(\?|$)/i.test(current) || current.includes('/video/') };
      }
    }
    for (const child of Object.values(record)) {
      const result = findFirstMedia(child);
      if (result) return result;
    }
  }
  return null;
}

function findSummary(value: CmsJson) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const record = value as Record<string, CmsJson>;
  const title = [record.title, record.name, record.label, record.brandName].find((item) => typeof item === 'string') as string | undefined;
  const description = [record.description, record.summary, record.lead, record.statement].find((item) => typeof item === 'string') as string | undefined;
  return { title, description };
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DesktopBlocker() {
  return (
    <section className="admin-desktop-blocker">
      <div>
        <span>INDIAN CLUB / ADMIN</span>
        <h1>Abre el panel desde una computadora.</h1>
        <p>La edición de textos, tablas, imágenes y videos está disponible desde 1024 px para mantener una vista previa cómoda y segura.</p>
        <Link to="/">Volver al sitio</Link>
      </div>
    </section>
  );
}

export function AdminPage() {
  const { refresh: refreshPublicContent } = useCms();
  const [session, setSession] = useState<Session | null>(null);
  const [demoAuthenticated, setDemoAuthenticated] = useState(hasDemoSession());
  const [desktop, setDesktop] = useState(() => typeof window === 'undefined' || window.innerWidth >= 1024);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState<CmsEntryRecord[]>([]);
  const [mediaAssets, setMediaAssets] = useState<CmsMediaAsset[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [draft, setDraft] = useState<CmsJson>({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const authenticated = Boolean(session || demoAuthenticated);

  const loadWorkspace = useCallback(async () => {
    setLoading(true);
    setMessage('');
    try {
      await ensureCmsEntries();
      const [nextEntries, nextMedia] = await Promise.all([loadCmsEntries(), loadMediaAssets()]);
      setEntries(nextEntries);
      setMediaAssets(nextMedia);
      setSelectedKey((current) => current || nextEntries[0]?.key || '');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo cargar el administrador.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const onResize = () => setDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    void getCmsSession().then(setSession);
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (authenticated) void loadWorkspace();
  }, [authenticated, loadWorkspace]);

  const selected = entries.find((entry) => entry.key === selectedKey) ?? null;

  useEffect(() => {
    if (selected) setDraft(clone(selected.draft_value));
  }, [selected]);

  const dirty = selected ? JSON.stringify(draft) !== JSON.stringify(selected.draft_value) : false;
  const unpublished = selected ? JSON.stringify(selected.draft_value) !== JSON.stringify(selected.published_value) : false;

  const groups = useMemo(() => {
    const map = new Map<string, CmsEntryRecord[]>();
    for (const entry of entries) {
      const current = map.get(entry.group_name) ?? [];
      current.push(entry);
      map.set(entry.group_name, current);
    }
    return [...map.entries()];
  }, [entries]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (!isSupabaseConfigured) {
        if (!startDemoSession(username, password)) throw new Error('En demostración local utiliza admin / admin.');
        setDemoAuthenticated(true);
      } else {
        const nextSession = await signInCms(username, password);
        setSession(nextSession);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await signOutCms();
    setSession(null);
    setDemoAuthenticated(false);
    setEntries([]);
    setMediaAssets([]);
    setSelectedKey('');
  }

  async function handleSave() {
    if (!selected) return;
    setLoading(true);
    setMessage('');
    try {
      await saveCmsDraft(selected.key, draft);
      setMessage('Borrador guardado. La web pública todavía no cambió.');
      await loadWorkspace();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo guardar el borrador.');
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    if (!selected) return;
    setLoading(true);
    setMessage('');
    try {
      if (dirty) await saveCmsDraft(selected.key, draft);
      await publishCmsEntry(selected.key);
      await Promise.all([loadWorkspace(), refreshPublicContent()]);
      setMessage('Contenido publicado correctamente.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo publicar el contenido.');
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    if (!selected) return;
    setLoading(true);
    setMessage('');
    try {
      await resetCmsDraft(selected.key);
      await loadWorkspace();
      setMessage('El borrador volvió a la versión publicada.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo restaurar el borrador.');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(file: File, folder: string) {
    if (!isSupabaseConfigured) return URL.createObjectURL(file);
    const asset = await uploadCmsMedia(file, folder);
    setMediaAssets((current) => [asset, ...current]);
    return asset.public_url;
  }

  if (!desktop) return <DesktopBlocker />;

  if (!isSupabaseConfigured && !isCmsDemoAvailable) {
    return (
      <>
        <Seo title="Admin sin configurar" description="Configuración administrativa de Indian Club." noIndex />
        <section className="admin-setup admin-setup--complete">
          <span>INDIAN CLUB / CONFIGURACIÓN</span>
          <h1>El administrador está listo para conectarse.</h1>
          <p>Configura la URL y la clave pública de Supabase en las variables del proyecto. No necesitas colocar la contraseña de la base de datos ni la service role key en React.</p>
          <div>
            <code>VITE_SUPABASE_URL</code>
            <code>VITE_SUPABASE_ANON_KEY</code>
            <code>VITE_ADMIN_EMAIL</code>
          </div>
          <Link className="button" to="/">Volver al sitio</Link>
        </section>
      </>
    );
  }

  if (!authenticated) {
    return (
      <>
        <Seo title="Acceso administrativo" description="Acceso privado al administrador de Indian Club." noIndex />
        <section className="admin-login admin-login--complete">
          <div className="admin-login__identity">
            <span>INDIAN CLUB / ADMIN</span>
            <h1>Controla el contenido sin tocar el diseño.</h1>
            <p>Actualiza textos, fotografías, videos, promociones, servicios, integrantes, consejos, datos de contacto y enlaces de reserva.</p>
            {!isSupabaseConfigured ? <small>Modo local: usuario admin · contraseña admin</small> : null}
          </div>
          <form onSubmit={handleLogin}>
            <label>
              Usuario
              <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
            </label>
            <label>
              Contraseña
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
            </label>
            <button type="submit" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar'}</button>
            {message ? <p role="status">{message}</p> : null}
          </form>
        </section>
      </>
    );
  }

  const previewMedia = selected ? findFirstMedia(draft) : null;
  const previewSummary = selected ? findSummary(draft) : null;

  return (
    <>
      <Seo title="Administrador" description="Panel privado de Indian Club." noIndex />
      <section className="admin-cms-shell">
        <header className="admin-cms-header">
          <Link to="/" className="admin-cms-brand"><strong>INDIAN CLUB</strong><span>Administrador de contenido</span></Link>
          <div>
            <span className={`admin-environment${isSupabaseConfigured ? '' : ' is-demo'}`}>{isSupabaseConfigured ? 'Supabase conectado' : 'Demostración local'}</span>
            <a href="./" target="_blank" rel="noreferrer">Ver web ↗</a>
            <button type="button" onClick={() => void handleSignOut()}>Salir</button>
          </div>
        </header>

        <aside className="admin-cms-sidebar">
          <div className="admin-sidebar-heading"><span>Contenido</span><small>{entries.length} secciones fijas</small></div>
          <nav aria-label="Secciones del administrador">
            {groups.map(([group, groupEntries]) => (
              <section key={group}>
                <h2>{group}</h2>
                {groupEntries.map((entry) => {
                  const entryDirty = JSON.stringify(entry.draft_value) !== JSON.stringify(entry.published_value);
                  return (
                    <button
                      type="button"
                      className={selectedKey === entry.key ? 'is-active' : ''}
                      key={entry.key}
                      onClick={() => setSelectedKey(entry.key)}
                    >
                      <span>{entry.label}</span>
                      {entryDirty ? <i>cambios</i> : <i>publicado</i>}
                    </button>
                  );
                })}
              </section>
            ))}
            <section>
              <h2>Archivos</h2>
              <button type="button" className={selectedKey === MEDIA_LIBRARY_KEY ? 'is-active' : ''} onClick={() => setSelectedKey(MEDIA_LIBRARY_KEY)}>
                <span>Biblioteca multimedia</span><i>{mediaAssets.length}</i>
              </button>
            </section>
          </nav>
          <footer><span>No se pueden crear páginas ni secciones nuevas desde este panel.</span></footer>
        </aside>

        <main className="admin-cms-main">
          {selectedKey === MEDIA_LIBRARY_KEY ? (
            <section className="admin-media-library">
              <header><div><span>Archivos</span><h1>Biblioteca multimedia</h1></div><p>Imágenes de hasta 4 MB y videos de hasta 25 MB.</p></header>
              {!isSupabaseConfigured ? <div className="admin-notice">La biblioteca persistente se habilitará cuando conectes Supabase. En modo local los archivos solo sirven como vista previa temporal.</div> : null}
              <div className="admin-media-grid">
                {mediaAssets.map((asset) => (
                  <article key={asset.id}>
                    {asset.media_type === 'video' ? <video src={asset.public_url} muted controls preload="metadata" /> : <img src={asset.public_url} alt={asset.alt_text ?? asset.original_name} loading="lazy" />}
                    <div><strong>{asset.original_name}</strong><span>{formatBytes(asset.size_bytes)}</span><button type="button" onClick={() => void navigator.clipboard.writeText(asset.public_url)}>Copiar URL</button></div>
                  </article>
                ))}
                {mediaAssets.length === 0 ? <div className="admin-empty-media">Los recursos que subas desde cualquier sección aparecerán aquí.</div> : null}
              </div>
            </section>
          ) : selected ? (
            <>
              <header className="admin-editor-header">
                <div><span>{selected.group_name}</span><h1>{selected.label}</h1><p>{selected.description}</p></div>
                <div className="admin-editor-status">
                  <span>{unpublished || dirty ? 'Borrador con cambios' : 'Publicado'}</span>
                  <small>Actualizado {new Date(selected.updated_at).toLocaleString('es-EC')}</small>
                </div>
              </header>

              <div className="admin-editor-layout">
                <section className="admin-form-panel">
                  <StructuredEditor value={draft} rootKey={selected.key} fieldKey="content" onChange={setDraft} onUpload={handleUpload} />
                </section>

                <aside className="admin-preview-panel">
                  <span>Vista previa del contenido</span>
                  <div className="admin-preview-media">
                    {previewMedia ? previewMedia.video ? <video src={previewMedia.url} muted loop autoPlay playsInline /> : <img src={previewMedia.url} alt="Vista previa" /> : <div>Sin imagen o video</div>}
                  </div>
                  <div className="admin-preview-copy">
                    <small>{selected.group_name}</small>
                    <h2>{previewSummary?.title ?? selected.label}</h2>
                    {previewSummary?.description ? <p>{previewSummary.description}</p> : null}
                  </div>
                  <div className="admin-preview-note">Esta vista confirma contenido y medios. El diseño final se conserva en la página pública.</div>
                </aside>
              </div>

              <footer className="admin-editor-actions">
                <div>{message ? <p role="status">{message}</p> : <span>{dirty ? 'Tienes cambios sin guardar.' : unpublished ? 'El borrador todavía no está publicado.' : 'La web pública está actualizada.'}</span>}</div>
                <button type="button" onClick={() => void handleReset()} disabled={loading || (!dirty && !unpublished)}>Restaurar</button>
                <button type="button" onClick={() => void handleSave()} disabled={loading || !dirty}>Guardar borrador</button>
                <button className="is-primary" type="button" onClick={() => void handlePublish()} disabled={loading || (!dirty && !unpublished)}>{loading ? 'Procesando…' : 'Publicar'}</button>
              </footer>
            </>
          ) : (
            <div className="admin-empty"><span>Administrador</span><h1>{loading ? 'Cargando contenido…' : 'Selecciona una sección.'}</h1></div>
          )}
        </main>
      </section>
    </>
  );
}
