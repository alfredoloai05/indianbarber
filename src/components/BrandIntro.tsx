import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { brand } from '../data/site';

export function BrandIntro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem('indian-brand-intro') !== 'played';
  });

  useEffect(() => {
    if (!visible || reduceMotion) return undefined;

    window.sessionStorage.setItem('indian-brand-intro', 'played');
    const timer = window.setTimeout(() => setVisible(false), 1900);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, visible]);

  return (
    <AnimatePresence>
      {visible && !reduceMotion ? (
        <motion.div
          className="brand-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden="true"
        >
          <motion.div
            className="brand-intro__line brand-intro__line--blue"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="brand-intro__mark"
            initial={{ opacity: 0, scale: 0.78, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={brand.logoMark} alt="" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.45em' }}
            animate={{ opacity: 1, letterSpacing: '0.22em' }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            INDIAN CLUB · LOJA
          </motion.span>
          <motion.div
            className="brand-intro__line brand-intro__line--red"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
