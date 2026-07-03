import type { WeatherSnapshot } from '../types/weather';
import { useUnits } from '../context/UnitsContext';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import StatsGrid from './StatsGrid';
import TodayCard from './TodayCard';

type WeatherDashboardProps = {
  weather: WeatherSnapshot | null;
  selectedDayIndex: number;
  onSelectedDayIndexChange: (index: number) => void;
  isLoading?: boolean;
};

const WeatherDashboard = ({
  weather,
  selectedDayIndex,
  onSelectedDayIndexChange,
  isLoading = false,
}: WeatherDashboardProps) => {
  const { units } = useUnits();

  return (
    <div className="dashboard" aria-busy={isLoading}>
      <div className="dashboard__primary">
        <TodayCard weather={weather} units={units} isLoading={isLoading} />
        <StatsGrid weather={weather} isLoading={isLoading} />
        <DailyForecast weather={weather} isLoading={isLoading} />
      </div>

      <div className="dashboard__aside">
        <HourlyForecast
          weather={weather}
          selectedDayIndex={selectedDayIndex}
          onSelectedDayIndexChange={onSelectedDayIndexChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default WeatherDashboard;
