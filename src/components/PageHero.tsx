import { motion, useReducedMotion } from 'framer-motion';

type PageHeroProps = {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
};

export function PageHero({ index, eyebrow, title, description, accent }: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="page-hero">
      <div className="page-hero__index">{index}</div>
      <motion.div
        className="page-hero__copy"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}{accent ? <em>{accent}</em> : null}</h1>
        <p>{description}</p>
      </motion.div>
      <div className="page-hero__mark" aria-hidden="true">IC</div>
    </section>
  );
}
