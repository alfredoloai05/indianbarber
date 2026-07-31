import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { cmsDefaultMap } from './cmsDefaults';
import { loadPublishedCmsMap } from './cmsClient';
import type { CmsJson, CmsPublishedMap } from './cmsTypes';

type CmsContextValue = {
  values: CmsPublishedMap;
  ready: boolean;
  refresh: () => Promise<void>;
};

const CmsContext = createContext<CmsContextValue | null>(null);

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge<T>(fallback: T, override: unknown): T {
  if (override === undefined || override === null) return clone(fallback);
  if (Array.isArray(fallback)) return clone(override as T);
  if (!isObject(fallback) || !isObject(override)) return clone(override as T);

  const result: Record<string, unknown> = { ...fallback };
  for (const [key, value] of Object.entries(override)) {
    const fallbackValue = (fallback as Record<string, unknown>)[key];
    result[key] = fallbackValue === undefined ? clone(value) : deepMerge(fallbackValue, value);
  }
  return result as T;
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<CmsPublishedMap>(() => clone(cmsDefaultMap) as CmsPublishedMap);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const next = await loadPublishedCmsMap();
      setValues({ ...(clone(cmsDefaultMap) as CmsPublishedMap), ...next });
    } catch {
      setValues(clone(cmsDefaultMap) as CmsPublishedMap);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const context = useMemo(() => ({ values, ready, refresh }), [ready, refresh, values]);
  return <CmsContext.Provider value={context}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) throw new Error('useCms debe utilizarse dentro de CmsProvider.');
  return context;
}

export function useCmsValue<T>(key: string, fallback: T): T {
  const { values } = useCms();
  const value = values[key] as CmsJson | undefined;
  return useMemo(() => deepMerge(fallback, value), [fallback, value]);
}
