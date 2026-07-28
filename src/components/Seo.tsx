import { useEffect } from 'react';

type SeoProps = {
  title: string;
  description: string;
  noIndex?: boolean;
};

export function Seo({ title, description, noIndex = false }: SeoProps) {
  useEffect(() => {
    document.title = `${title} — Indian Club`;

    let descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.content = description;

    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = noIndex ? 'noindex,nofollow' : 'index,follow';
  }, [description, noIndex, title]);

  return null;
}
