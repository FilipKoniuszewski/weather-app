import { useCallback, useEffect, useRef, useState } from 'react';
import { searchLocations } from '../api/geocoding';
import { fetchWeather } from '../api/forecast';
import type { Location, SearchStatus, WeatherSnapshot, WeatherStatus } from '../types/weather';

const SEARCH_DEBOUNCE_MS = 350;

export const useWeatherSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('idle');
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus>('idle');
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // Skips the next debounced search when the query is set programmatically
  // (e.g. after selecting a location), so we don't re-query the API.
  const skipNextSearchRef = useRef(false);

  const loadWeather = useCallback(async (location: Location) => {
    setWeather(null);
    setWeatherStatus('loading');
    setSearchStatus('idle');
    setIsSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);

    try {
      const snapshot = await fetchWeather(location);
      setWeather(snapshot);
      setSelectedDayIndex(0);
      setWeatherStatus('ready');
    } catch {
      setWeather(null);
      setWeatherStatus('error');
    }
  }, []);

  // Search as the user types (debounced).
  useEffect(() => {
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setSuggestions([]);
      setSearchStatus('idle');
      setIsSuggestionsOpen(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    setSearchStatus('searching');
    setIsSuggestionsOpen(true);

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const results = await searchLocations(trimmed);
        if (cancelled) return;
        setSuggestions(results);
        setSearchStatus(results.length === 0 ? 'no-results' : 'idle');
        setActiveSuggestionIndex(results.length > 0 ? 0 : -1);
      } catch {
        if (cancelled) return;
        setSuggestions([]);
        setSearchStatus('idle');
        setIsSuggestionsOpen(false);
      }
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  const runSearch = useCallback(
    async (searchQuery: string) => {
      const trimmed = searchQuery.trim();

      if (trimmed.length < 2) return;

      // If suggestions are already loaded, submitting loads the first match.
      if (suggestions.length > 0) {
        await loadWeather(suggestions[0]);
        skipNextSearchRef.current = true;
        setQuery(`${suggestions[0].name}, ${suggestions[0].country}`);
        return;
      }

      setSearchStatus('searching');
      setIsSuggestionsOpen(true);

      try {
        const results = await searchLocations(trimmed);
        setSuggestions(results);
        setSearchStatus(results.length === 0 ? 'no-results' : 'idle');
        setActiveSuggestionIndex(results.length > 0 ? 0 : -1);

        if (results.length === 1) {
          await loadWeather(results[0]);
          skipNextSearchRef.current = true;
          setQuery(`${results[0].name}, ${results[0].country}`);
        }
      } catch {
        setSuggestions([]);
        setSearchStatus('idle');
        setWeatherStatus('error');
        setIsSuggestionsOpen(false);
      }
    },
    [loadWeather, suggestions],
  );

  const selectLocation = useCallback(
    async (location: Location) => {
      skipNextSearchRef.current = true;
      setQuery(`${location.name}, ${location.country}`);
      await loadWeather(location);
    },
    [loadWeather],
  );

  const retryWeather = useCallback(async () => {
    if (weather) {
      await loadWeather(weather.location);
      return;
    }

    if (query.trim().length >= 2) {
      await runSearch(query);
    }
  }, [loadWeather, query, runSearch, weather]);

  const closeSuggestions = useCallback(() => {
    setIsSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    searchStatus,
    weatherStatus,
    weather,
    selectedDayIndex,
    setSelectedDayIndex,
    isSuggestionsOpen,
    activeSuggestionIndex,
    setActiveSuggestionIndex,
    runSearch,
    selectLocation,
    retryWeather,
    closeSuggestions,
    setIsSuggestionsOpen,
  };
};

export const useListboxKeyboard = ({
  isOpen,
  itemCount,
  activeIndex,
  onActiveIndexChange,
  onSelect,
  onClose,
}: {
  isOpen: boolean;
  itemCount: number;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSelect: (index: number) => void;
  onClose: () => void;
}) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen || itemCount === 0) {
        if (event.key === 'ArrowDown' && itemCount > 0) {
          event.preventDefault();
          onActiveIndexChange(0);
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          onActiveIndexChange(activeIndex >= itemCount - 1 ? 0 : activeIndex + 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          onActiveIndexChange(activeIndex <= 0 ? itemCount - 1 : activeIndex - 1);
          break;
        case 'Home':
          event.preventDefault();
          onActiveIndexChange(0);
          break;
        case 'End':
          event.preventDefault();
          onActiveIndexChange(itemCount - 1);
          break;
        case 'Enter':
          event.preventDefault();
          if (activeIndex >= 0) onSelect(activeIndex);
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
        default:
          break;
      }
    },
    [activeIndex, isOpen, itemCount, onActiveIndexChange, onClose, onSelect],
  );

  return handleKeyDown;
};
