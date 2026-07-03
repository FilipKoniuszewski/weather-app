import { useUnits } from '../context/UnitsContext';
import type { WeatherSnapshot } from '../types/weather';
import {
  formatHumidity,
  formatPrecipitation,
  formatTemperature,
  formatWind,
} from '../utils/formatters';

type StatsGridProps = {
  weather: WeatherSnapshot | null;
  isLoading?: boolean;
};

const stats = [
  { key: 'feelsLike', label: 'Feels like' },
  { key: 'humidity', label: 'Humidity' },
  { key: 'wind', label: 'Wind' },
  { key: 'precipitation', label: 'Precipitation' },
] as const;

const StatsGrid = ({ weather, isLoading = false }: StatsGridProps) => {
  const { units } = useUnits();

  const getValue = (key: (typeof stats)[number]['key']) => {
    if (!weather) return '—';

    switch (key) {
      case 'feelsLike':
        return formatTemperature(weather.current.feelsLike, units.temperature);
      case 'humidity':
        return formatHumidity(weather.current.humidity);
      case 'wind':
        return formatWind(weather.current.windSpeed, units.wind);
      case 'precipitation':
        return formatPrecipitation(weather.current.precipitation, units.precipitation);
      default:
        return '—';
    }
  };

  return (
    <div className="stats" role="list" aria-label="Weather details">
      {stats.map(({ key, label }) => (
        <div key={key} className={`stats__card${isLoading ? ' stats__card--loading' : ''}`} role="listitem">
          <p className="stats__label">{label}</p>
          <p className="stats__value" aria-busy={isLoading}>
            {isLoading ? '—' : getValue(key)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
