export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindUnit = 'kmh' | 'mph';
export type PrecipitationUnit = 'mm' | 'in';

export type Units = {
  temperature: TemperatureUnit;
  wind: WindUnit;
  precipitation: PrecipitationUnit;
};

export const METRIC_UNITS: Units = {
  temperature: 'celsius',
  wind: 'kmh',
  precipitation: 'mm',
};

export const IMPERIAL_UNITS: Units = {
  temperature: 'fahrenheit',
  wind: 'mph',
  precipitation: 'in',
};

export const isMetric = (units: Units) =>
  units.temperature === 'celsius' &&
  units.wind === 'kmh' &&
  units.precipitation === 'mm';
