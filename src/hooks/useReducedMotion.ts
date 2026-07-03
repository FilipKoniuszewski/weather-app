import { useSyncExternalStore } from 'react';

const subscribeReducedMotion = (onStoreChange: () => void) => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', onStoreChange);
  return () => media.removeEventListener('change', onStoreChange);
};

const getReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useReducedMotion = () =>
  useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
