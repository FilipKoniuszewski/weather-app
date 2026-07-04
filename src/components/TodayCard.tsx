import type { Units } from '../types/units';
import type { WeatherSnapshot } from '../types/weather';
import { formatClockTime, formatCurrentTime, formatLongDate } from '../utils/dates';
import { assetUrl } from '../utils/assetUrl';
import { formatLocationLabel, formatTemperature } from '../utils/formatters';
import { getTodayCardTheme } from '../utils/todayCardTheme';
import { getNextSunEvent } from '../utils/sunEvent';
import Rain from './Rain';
import Stars from './Stars';
import Lightning from './Lightning';
import Clouds from './Clouds';
import Fog from './Fog';
import Snow from './Snow';
import Sunset from './Sunset';
import Sunrise from './Sunrise';
import HotSunIcon from './HotSunIcon';

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

  const theme = getTodayCardTheme(weather);
  const sunEvent = getNextSunEvent(weather);

  return (
    <article className={theme.className} aria-label="Current weather">
      {theme.cloudVariant && <Clouds variant={theme.cloudVariant} />}
      {theme.fogVariant && <Fog variant={theme.fogVariant} />}
      {theme.snowVariant && <Snow variant={theme.snowVariant} />}
      {theme.rainVariant && <Rain variant={theme.rainVariant} />}
      {theme.showLightning && <Lightning />}
      {theme.showStars && <Stars />}

      <div className="today__content">
        <div className="today__lead">
          <div className="today__meta">
            <h2 className="today__location">
              {formatLocationLabel(weather.location.name, weather.location.country || weather.location.admin1)}
            </h2>
            <div className="today__datetime">
              <time className="today__date" dateTime={weather.current.time}>
                {formatLongDate(weather.current.time, weather.timezone)}
              </time>
              <time className="today__time" dateTime={weather.current.time}>
                {formatCurrentTime(weather.timezone)}
              </time>
            </div>
          </div>

          {sunEvent && (
            <p className="today__sun">
              <span className="today__sun-icon">
                {sunEvent.type === 'sunrise' ? <Sunrise /> : <Sunset />}
              </span>
              <span className="today__sun-label">
                {sunEvent.type === 'sunrise' ? 'Sunrise' : 'Sunset'}
              </span>
              <span className="today__sun-time">{formatClockTime(sunEvent.time)}</span>
            </p>
          )}
        </div>

        <div className="today__summary">
          {theme.showHotIcon ? (
            <HotSunIcon label={theme.label} />
          ) : (
            <img
              className="today__icon"
              src={assetUrl(`assets/images/${theme.icon}`)}
              alt={theme.label}
            />
          )}
          <p className="today__temperature" aria-label={`Temperature ${formatTemperature(weather.current.temperature, units.temperature)}`}>
            {formatTemperature(weather.current.temperature, units.temperature)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default TodayCard;
