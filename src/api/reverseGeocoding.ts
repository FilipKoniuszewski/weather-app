import type { Location } from '../types/weather';

type ReverseGeocodeResponse = {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
};

const locationIdFromCoords = (latitude: number, longitude: number) =>
  Math.abs(Math.round(latitude * 10_000) * 10_000 + Math.round(longitude * 10_000));

export const reverseGeocode = async (latitude: number, longitude: number): Promise<Location> => {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    localityLanguage: 'en',
  });

  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`,
  );

  if (!response.ok) {
    throw new Error('Reverse geocoding request failed');
  }

  const data = (await response.json()) as ReverseGeocodeResponse;
  const name = data.city || data.locality || data.principalSubdivision || 'Your location';

  return {
    id: locationIdFromCoords(latitude, longitude),
    name,
    country: data.countryName ?? '',
    admin1: data.principalSubdivision,
    latitude,
    longitude,
    timezone: 'UTC',
  };
};
