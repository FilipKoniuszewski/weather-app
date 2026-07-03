import type { Location } from '../types/weather';

const LAST_LOCATION_STORAGE_KEY = 'weather-app:last-location';

export const getSavedLocation = (): Location | null => {
  try {
    const raw = localStorage.getItem(LAST_LOCATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Location;
    if (typeof parsed?.latitude !== 'number' || typeof parsed?.longitude !== 'number') {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const saveLocation = (location: Location): void => {
  try {
    localStorage.setItem(LAST_LOCATION_STORAGE_KEY, JSON.stringify(location));
  } catch {
  }
};
