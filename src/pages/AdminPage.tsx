import { type FormEvent, useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type SiteContent = {
  id: string;
  key: string;
  section: string;
  value: unknown;
  status: 'draft' | 'published';
  updated_at: string;
};

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<SiteContent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadContent = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('site_content')
      .select('id,key,section,value,status,updated_at')
      .order('section')
      .order('key');

    if (error) {
      setMessage(error.message);
    } else {
      const nextItems = (data ?? []) as SiteContent[];
      setItems(nextItems);
      if (!selectedId && nextItems[0]) {
        setSelectedId(nextItems[0].id);
        setDraftValue(JSON.stringify(nextItems[0].value, null, 2));
      }
    }
    setLoading(false);
  }, [selectedId]);

  useEffect(() => {
    if (!supabase) return;
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) void loadContent();
  }, [loadContent, session]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : 'Acceso correcto.');
    setLoading(false);
  }

  function selectItem(item: SiteContent) {
    setSelectedId(item.id);
    setDraftValue(JSON.stringify(item.value, null, 2));
    setMessage('');
  }

  async function saveItem() {
    if (!supabase || !selectedId) return;
    try {
      const parsed = JSON.parse(draftValue) as unknown;
      setLoading(true);
      const { error } = await supabase
        .from('site_content')
        .update({ value: parsed })
        .eq('id', selectedId);
      setMessage(error ? error.message : 'Contenido guardado.');
      if (!error) await loadContent();
    } catch {
      setMessage('El contenido debe ser JSON válido.');
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setItems([]);
    setSelectedId(null);
  }

  const selected = items.find((item) => item.id === selectedId);

  if (!isSupabaseConfigured) {
    return (
      <>
        <Seo title="Admin sin configurar" description="Configuración administrativa de Indian Club." noIndex />
        <section className="admin-setup">
          <span>ADMIN / CONFIGURACIÓN</span>
          <h1>El panel está preparado, pero Supabase todavía no está conectado.</h1>
          <p>Copia <code>.env.example</code> a <code>.env.local</code> y completa únicamente la URL pública y la clave anónima del proyecto. Nunca uses la service role key en el frontend.</p>
          <Link className="button" to="/">Volver al sitio</Link>
        </section>
      </>
    );
  }

  if (!session) {
    return (
      <>
        <Seo title="Acceso administrativo" description="Acceso privado al panel de contenido de Indian Club." noIndex />
        <section className="admin-login">
          <div>
            <span>INDIAN CLUB / ADMIN</span>
            <h1>Contenido con criterio. Acceso con control.</h1>
            <p>El acceso depende de Supabase Auth y de las políticas RLS incluidas en la migración.</p>
          </div>
          <form onSubmit={handleLogin}>
            <label>
              Correo
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
            </label>
            <label>
              Contraseña
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
            </label>
            <button className="button" type="submit" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar'}</button>
            {message ? <p role="status">{message}</p> : null}
          </form>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo title="Panel de contenido" description="Panel privado de contenido de Indian Club." noIndex />
      <section className="admin-shell">
        <header>
          <div><span>INDIAN CLUB</span><small>Content governance</small></div>
          <div><strong>{session.user.email}</strong><button type="button" onClick={signOut}>Salir</button></div>
        </header>
        <aside>
          <span>Contenido</span>
          {items.map((item) => (
            <button className={item.id === selectedId ? 'is-active' : ''} type="button" key={item.id} onClick={() => selectItem(item)}>
              <small>{item.section}</small>
              <strong>{item.key}</strong>
              <i>{item.status}</i>
            </button>
          ))}
          {!loading && items.length === 0 ? <p>No hay contenido disponible para este usuario.</p> : null}
        </aside>
        <main>
          {selected ? (
            <>
              <div className="admin-editor__heading">
                <div><span>{selected.section}</span><h1>{selected.key}</h1></div>
                <small>Actualizado: {new Date(selected.updated_at).toLocaleString('es-EC')}</small>
              </div>
              <label className="admin-json-editor">
                Valor JSON
                <textarea value={draftValue} onChange={(event) => setDraftValue(event.target.value)} spellCheck={false} />
              </label>
              <div className="admin-editor__actions">
                <button className="button" type="button" onClick={saveItem} disabled={loading}>{loading ? 'Guardando…' : 'Guardar cambios'}</button>
                {message ? <p role="status">{message}</p> : null}
              </div>
            </>
          ) : (
            <div className="admin-empty"><span>Sin selección</span><h1>Elige una entrada de contenido.</h1></div>
          )}
        </main>
      </section>
    </>
  );
}
