import type { WeatherSnapshot } from '../types/weather';

export type SunEventType = 'sunrise' | 'sunset';

export type SunEvent = {
  type: SunEventType;
  time: string;
};

export const getNextSunEvent = (weather: WeatherSnapshot): SunEvent | null => {
  const now = weather.current.time;
  const { sunrise, sunset } = weather.daily;

  const events: SunEvent[] = [
    ...sunrise.map((time): SunEvent => ({ type: 'sunrise', time })),
    ...sunset.map((time): SunEvent => ({ type: 'sunset', time })),
  ].sort((a, b) => a.time.localeCompare(b.time));

  return events.find((event) => event.time > now) ?? null;
};
