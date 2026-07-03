import type { Units } from '../types/units';

const celsiusToFahrenheit = (value: number) => (value * 9) / 5 + 32;
const kmhToMph = (value: number) => value * 0.621371;
const mmToInches = (value: number) => value * 0.0393701;

export const formatTemperature = (celsius: number, unit: Units['temperature']) => {
  const value = unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : celsius;
  return `${Math.round(value)}°`;
};

export const isHotTemperature = (celsius: number) => celsius >= 30;

export const formatWind = (kmh: number, unit: Units['wind']) => {
  const value = unit === 'mph' ? kmhToMph(kmh) : kmh;
  const rounded = Math.round(value);
  return unit === 'mph' ? `${rounded} mph` : `${rounded} km/h`;
};

export const formatPrecipitation = (mm: number, unit: Units['precipitation']) => {
  if (unit === 'in') {
    const inches = mmToInches(mm);
    const formatted = inches < 0.1 ? inches.toFixed(2) : inches.toFixed(1);
    return `${formatted} in`;
  }

  const rounded = Math.round(mm * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)} mm`;
};

export const formatHumidity = (value: number) => `${Math.round(value)}%`;

export const formatLocationLabel = (name: string, country?: string) => {
  const parts = [name, country].filter(
    (part): part is string => Boolean(part) && part !== 'undefined',
  );
  return parts.join(', ');
};
