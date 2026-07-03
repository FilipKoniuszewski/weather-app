import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  IMPERIAL_UNITS,
  isMetric,
  METRIC_UNITS,
  type Units,
} from '../types/units';

type UnitsContextValue = {
  units: Units;
  setUnits: (units: Units) => void;
  toggleSystem: () => void;
  setTemperature: (unit: Units['temperature']) => void;
  setWind: (unit: Units['wind']) => void;
  setPrecipitation: (unit: Units['precipitation']) => void;
  isMetricSystem: boolean;
};

const UnitsContext = createContext<UnitsContextValue | null>(null);

export const UnitsProvider = ({ children }: { children: ReactNode }) => {
  const [units, setUnits] = useState<Units>(METRIC_UNITS);

  const toggleSystem = useCallback(() => {
    setUnits((current) => (isMetric(current) ? IMPERIAL_UNITS : METRIC_UNITS));
  }, []);

  const setTemperature = useCallback((temperature: Units['temperature']) => {
    setUnits((current) => ({ ...current, temperature }));
  }, []);

  const setWind = useCallback((wind: Units['wind']) => {
    setUnits((current) => ({ ...current, wind }));
  }, []);

  const setPrecipitation = useCallback((precipitation: Units['precipitation']) => {
    setUnits((current) => ({ ...current, precipitation }));
  }, []);

  const value = useMemo(
    () => ({
      units,
      setUnits,
      toggleSystem,
      setTemperature,
      setWind,
      setPrecipitation,
      isMetricSystem: isMetric(units),
    }),
    [units, toggleSystem, setTemperature, setWind, setPrecipitation],
  );

  return <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>;
};

export const useUnits = () => {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error('useUnits must be used within UnitsProvider');
  }
  return context;
};
