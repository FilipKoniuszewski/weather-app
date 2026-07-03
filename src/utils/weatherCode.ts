export const weatherCodeToIcon = (code: number): string => {
  if (code === 0) return 'icon-sunny.webp';
  if (code === 3) return 'icon-overcast.webp';
  if (code <= 2) return 'icon-partly-cloudy.webp';
  if (code <= 48) return 'icon-fog.webp';
  if (code <= 57) return 'icon-drizzle.webp';
  if (code <= 67) return 'icon-rain.webp';
  if (code <= 77) return 'icon-snow.webp';
  if (code <= 82) return 'icon-rain.webp';
  if (code <= 86) return 'icon-snow.webp';
  return 'icon-storm.webp';
};

export const weatherCodeToLabel = (code: number): string => {
  if (code === 0) return 'Clear sky';
  if (code === 1) return 'Mainly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code <= 48) return 'Fog';
  if (code <= 57) return 'Drizzle';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Rain showers';
  if (code <= 86) return 'Snow showers';
  return 'Thunderstorm';
};
