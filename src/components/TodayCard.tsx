import type { Units } from '../types/units';
import type { WeatherSnapshot } from '../types/weather';
import { formatLongDate } from '../utils/dates';
import { assetUrl } from '../utils/assetUrl';
import { formatLocationLabel, formatTemperature } from '../utils/formatters';
import { weatherCodeToIcon, weatherCodeToLabel } from '../utils/weatherCode';

type TodayCardProps = {
  weather: WeatherSnapshot | null;
  units: Units;
  isLoading?: boolean;
};

const TodayCard = ({ weather, units, isLoading = false }: TodayCardProps) => {
  if (isLoading || !weather) {
    return (
      <article className="today today--loading" aria-busy="true" aria-label="Loading current weather">
        <div className="today__loading">
          <span className="today__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <p>Loading...</p>
        </div>
      </article>
    );
  }

  const icon = weatherCodeToIcon(weather.current.weatherCode);
  const label = weatherCodeToLabel(weather.current.weatherCode);

  return (
    <article className="today" aria-label="Current weather">
      <div className="today__content">
        <div className="today__meta">
          <h2 className="today__location">
            {formatLocationLabel(weather.location.name, weather.location.country)}
          </h2>
          <time className="today__date" dateTime={weather.current.time}>
            {formatLongDate(weather.current.time, weather.timezone)}
          </time>
        </div>

        <div className="today__summary">
          <img
            className="today__icon"
            src={assetUrl(`assets/images/${icon}`)}
            alt={label}
          />
          <p className="today__temperature" aria-label={`Temperature ${formatTemperature(weather.current.temperature, units.temperature)}`}>
            {formatTemperature(weather.current.temperature, units.temperature)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default TodayCard;
