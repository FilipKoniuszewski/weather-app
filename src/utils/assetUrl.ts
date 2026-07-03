/** Prefix public asset paths with the Vite base URL (e.g. /weather-app/). */
export const assetUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
