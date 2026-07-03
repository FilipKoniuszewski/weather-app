export const weatherCodeToIcon = (code: number): string => {
  if (code === 0) return 'icon-sunny.webp';
  if (code === 3) return 'icon-overcast.webp';
  if (code <= 2) return 'icon-partly-cloudy.webp';
  if (code === 45) return 'icon-fog.webp';
  if (code === 48) return 'icon-fog.webp';
  if (code <= 57) return 'icon-drizzle.webp';
  if (code <= 67) return 'icon-rain.webp';
  if (code <= 77) return 'icon-snow.webp';
  if (code <= 82) return 'icon-rain.webp';
  if (code <= 86) return 'icon-snow.webp';
  return 'icon-storm.webp';
};

export const isDrizzleCode = (code: number): boolean => code >= 51 && code <= 57;

export const isRainyCode = (code: number): boolean =>
  (code >= 61 && code <= 67) || (code >= 80 && code <= 82);

export const isStormCode = (code: number): boolean => code >= 95 && code <= 99;

export const isSnowCode = (code: number): boolean =>
  (code >= 71 && code <= 77) || (code >= 85 && code <= 86);

export const isSnowShowerCode = (code: number): boolean => code >= 85 && code <= 86;

export const hasPrecipitationEffect = (code: number, precipitation: number): boolean =>
  isDrizzleCode(code) || isRainyCode(code) || isSnowCode(code) || (isStormCode(code) && precipitation > 0);

export const isFogCode = (code: number): boolean => code === 45 || code === 48;

export const isRimeFogCode = (code: number): boolean => code === 48;

export const isClearCode = (code: number): boolean => code === 0;

export const isPartlyCloudyCode = (code: number): boolean => code === 1 || code === 2;

export const isOvercastCode = (code: number): boolean => code === 3;

export const weatherCodeToLabel = (code: number): string => {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mainly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45) return 'Fog';
  if (code === 48) return 'Depositing rime fog';
  if (code <= 57) return 'Drizzle';
  if (code <= 67) return 'Rain';
  if (code === 71) return 'Slight snow fall';
  if (code === 73) return 'Moderate snow fall';
  if (code === 75) return 'Heavy snow fall';
  if (code === 77) return 'Snow grains';
  if (code <= 82) return 'Rain showers';
  if (code === 85) return 'Slight snow showers';
  if (code === 86) return 'Heavy snow showers';
  return 'Thunderstorm';
};
