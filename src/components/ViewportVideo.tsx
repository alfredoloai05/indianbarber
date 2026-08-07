import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type ViewportVideoProps = {
  src: string;
  poster: string;
  className?: string;
  label: string;
  priority?: boolean;
};

export function ViewportVideo({ src, poster, className, label, priority = false }: ViewportVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion || failed) return undefined;

    // Service selectors should remain visually stable while users compare options.
    // Their poster stays visible instead of replaying a moving clip on every selection.
    if (video.closest('.space-service-preview')) {
      video.pause();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => setFailed(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [failed, reduceMotion, src]);

  if (reduceMotion || failed) {
    return <img className={className} src={poster} alt={label} loading={priority ? 'eager' : 'lazy'} />;
  }

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      autoPlay={priority}
      preload={priority ? 'metadata' : 'none'}
      poster={poster}
      aria-label={label}
      onError={() => setFailed(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
