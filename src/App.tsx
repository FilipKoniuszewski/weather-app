import ApiError from './components/ApiError';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import UnitsDropdown from './components/UnitsDropdown';
import WeatherDashboard from './components/WeatherDashboard';
import { UnitsProvider } from './context/UnitsContext';
import { useWeatherSearch } from './hooks/useWeatherSearch';

const AppContent = () => {
  const {
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
  } = useWeatherSearch();

  const showDashboard =
    weatherStatus === 'loading' || weatherStatus === 'ready' || (weatherStatus === 'error' && weather);
  const isLoading = weatherStatus === 'loading';
  const showApiError = weatherStatus === 'error' && !weather;

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="app__top">
        <Header />
        <UnitsDropdown />
      </div>

      <main id="main" className="app__main">
        {showApiError ? (
          <ApiError onRetry={retryWeather} />
        ) : (
          <>
            <SearchSection
              query={query}
              onQueryChange={setQuery}
              onSubmit={runSearch}
              suggestions={suggestions}
              searchStatus={searchStatus}
              isSuggestionsOpen={isSuggestionsOpen}
              activeSuggestionIndex={activeSuggestionIndex}
              onActiveSuggestionIndexChange={setActiveSuggestionIndex}
              onSelectLocation={selectLocation}
              onCloseSuggestions={closeSuggestions}
              onOpenSuggestions={() => setIsSuggestionsOpen(true)}
            />

            {showDashboard && (
              <WeatherDashboard
                weather={weather}
                selectedDayIndex={selectedDayIndex}
                onSelectedDayIndexChange={setSelectedDayIndex}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

const App = () => (
  <UnitsProvider>
    <AppContent />
  </UnitsProvider>
);

export default App;
