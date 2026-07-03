export type Location = {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type WeatherSnapshot = {
  location: Location;
  timezone: string;
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    weatherCode: number;
    time: string;
  };
  daily: {
    time: string[];
    weatherCode: number[];
    temperatureMax: number[];
    temperatureMin: number[];
  };
  hourly: {
    time: string[];
    temperature: number[];
    weatherCode: number[];
  };
};

export type SearchStatus = 'idle' | 'searching' | 'no-results';
export type WeatherStatus = 'idle' | 'loading' | 'ready' | 'error';
