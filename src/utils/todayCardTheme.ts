import type { WeatherSnapshot } from '../types/weather';
import { isHotTemperature } from './formatters';
import {
  hasPrecipitationEffect,
  isClearCode,
  isDrizzleCode,
  isFogCode,
  isOvercastCode,
  isPartlyCloudyCode,
  isRainyCode,
  isRimeFogCode,
  isSnowCode,
  isSnowShowerCode,
  isStormCode,
  weatherCodeToIcon,
  weatherCodeToLabel,
} from './weatherCode';

export type CloudVariant = 'overcast' | 'light';
export type RainVariant = 'drizzle' | 'rain';
export type FogVariant = 'fog' | 'rime';
export type SnowVariant = 'snow' | 'shower';

export type TodayCardTheme = {
  icon: string;
  label: string;
  className: string;
  cloudVariant: CloudVariant | null;
  rainVariant: RainVariant | null;
  fogVariant: FogVariant | null;
  snowVariant: SnowVariant | null;
  showLightning: boolean;
  showStars: boolean;
  showHotIcon: boolean;
};

const buildTodayClassName = (modifiers: Record<string, boolean>) =>
  ['today', ...Object.entries(modifiers).filter(([, active]) => active).map(([name]) => `today--${name}`)]
    .join(' ');

export const getTodayCardTheme = (weather: WeatherSnapshot): TodayCardTheme => {
  const { weatherCode, temperature, precipitation, isDay } = weather.current;
  const isStorm = isStormCode(weatherCode);
  const isDrizzle = isDrizzleCode(weatherCode);
  const isRain = isRainyCode(weatherCode) || (isStorm && precipitation > 0);
  const isClearDay = isClearCode(weatherCode) && isDay;
  const isPartlyCloudyDay = isPartlyCloudyCode(weatherCode) && isDay;
  const isOvercast = isOvercastCode(weatherCode);
  const isFog = isFogCode(weatherCode);
  const isRimeFog = isRimeFogCode(weatherCode);
  const isSnow = isSnowCode(weatherCode);
  const isSnowShower = isSnowShowerCode(weatherCode);

  const rainVariant: RainVariant | null = isDrizzle ? 'drizzle' : isRain ? 'rain' : null;
  const snowVariant: SnowVariant | null = isSnow ? (isSnowShower ? 'shower' : 'snow') : null;

  const isStarryNight = !isDay && !isDrizzle && !isRain && !isStorm && !isOvercast && !isFog && !isSnow;

  return {
    icon: weatherCodeToIcon(weatherCode),
    label: weatherCodeToLabel(weatherCode),
    className: buildTodayClassName({
      drizzle: isDrizzle,
      rainy: isRain,
      'storm-rain': isStorm && isRain,
      storm: isStorm && !hasPrecipitationEffect(weatherCode, precipitation),
      sunny: isClearDay || isPartlyCloudyDay,
      'partly-cloudy': isPartlyCloudyDay,
      'clear-night': isStarryNight,
      overcast: isOvercast,
      fog: isFog && !isRimeFog,
      'rime-fog': isRimeFog,
      snowy: isSnow,
    }),
    cloudVariant: isOvercast ? 'overcast' : isPartlyCloudyDay ? 'light' : null,
    rainVariant,
    fogVariant: isFog ? (isRimeFog ? 'rime' : 'fog') : null,
    snowVariant,
    showLightning: isStorm,
    showStars: isStarryNight,
    showHotIcon: isHotTemperature(temperature),
  };
};
