import { useUnits } from '../context/UnitsContext';
import type { WeatherSnapshot } from '../types/weather';
import { formatDayLong, formatHour, getDateKey } from '../utils/dates';
import { formatTemperature } from '../utils/formatters';
import { assetUrl } from '../utils/assetUrl';
import { weatherCodeToIcon, weatherCodeToLabel } from '../utils/weatherCode';
import DaySelect from './DaySelect';

type HourlyForecastProps = {
  weather: WeatherSnapshot | null;
  selectedDayIndex: number;
  onSelectedDayIndexChange: (index: number) => void;
  isLoading?: boolean;
};

const HourlyForecast = ({
  weather,
  selectedDayIndex,
  onSelectedDayIndexChange,
  isLoading = false,
}: HourlyForecastProps) => {
  const { units } = useUnits();

  const selectedDay = weather?.daily.time[selectedDayIndex];
  const dayLabels = weather
    ? weather.daily.time.map((day) => formatDayLong(day, weather.timezone))
    : [];
  const hourlyRows =
    weather && selectedDay
      ? weather.hourly.time
          .map((time, index) => ({ time, index }))
          .filter(
            ({ time }) => getDateKey(time, weather.timezone) === getDateKey(selectedDay, weather.timezone),
          )
      : [];

  return (
    <section className="hourly" aria-labelledby="hourly-heading">
      <div className="hourly__header">
        <h2 id="hourly-heading" className="hourly__title">
          Hourly forecast
        </h2>

        <DaySelect
          days={dayLabels}
          selectedIndex={selectedDayIndex}
          onSelect={onSelectedDayIndexChange}
          disabled={isLoading || !weather}
        />
      </div>

      <ol className="hourly__list" aria-busy={isLoading}>
        {isLoading
          ? Array.from({ length: 8 }, (_, index) => (
              <li key={index} className="hourly__row hourly__row--loading" aria-hidden="true" />
            ))
          : hourlyRows.map(({ time, index }) => {
              if (!weather) return null;

              const icon = weatherCodeToIcon(weather.hourly.weatherCode[index]);
              const label = weatherCodeToLabel(weather.hourly.weatherCode[index]);

              return (
                <li key={time} className="hourly__row">
                  <img
                    className="hourly__icon"
                    src={assetUrl(`assets/images/${icon}`)}
                    alt={label}
                  />
                  <time className="hourly__time" dateTime={time}>
                    {formatHour(time, weather.timezone)}
                  </time>
                  <span className="hourly__temp">
                    {formatTemperature(weather.hourly.temperature[index], units.temperature)}
                  </span>
                </li>
              );
            })}
      </ol>
    </section>
  );
};

export default HourlyForecast;
