import { useUnits } from '../context/UnitsContext';
import type { WeatherSnapshot } from '../types/weather';
import { formatDayShort } from '../utils/dates';
import { formatTemperature } from '../utils/formatters';
import { assetUrl } from '../utils/assetUrl';
import { weatherCodeToIcon, weatherCodeToLabel } from '../utils/weatherCode';

type DailyForecastProps = {
  weather: WeatherSnapshot | null;
  isLoading?: boolean;
};

const DailyForecast = ({ weather, isLoading = false }: DailyForecastProps) => {
  const { units } = useUnits();

  return (
    <section className="daily" aria-labelledby="daily-heading">
      <h2 id="daily-heading" className="daily__title">
        Daily forecast
      </h2>

      <ol className="daily__list" aria-busy={isLoading}>
        {isLoading
          ? Array.from({ length: 7 }, (_, index) => (
              <li key={index} className="daily__card daily__card--loading" aria-hidden="true" />
            ))
          : weather?.daily.time.map((day, index) => {
              const icon = weatherCodeToIcon(weather.daily.weatherCode[index]);
              const label = weatherCodeToLabel(weather.daily.weatherCode[index]);

              return (
                <li key={day} className="daily__card">
                  <p className="daily__day">{formatDayShort(day, weather.timezone)}</p>
                  <img
                    className="daily__icon"
                    src={assetUrl(`assets/images/${icon}`)}
                    alt={label}
                  />
                  <p className="daily__temps">
                    <span className="daily__high">
                      {formatTemperature(weather.daily.temperatureMax[index], units.temperature)}
                    </span>
                    <span className="daily__low">
                      {formatTemperature(weather.daily.temperatureMin[index], units.temperature)}
                    </span>
                  </p>
                </li>
              );
            })}
      </ol>
    </section>
  );
};

export default DailyForecast;
