import { useId, useRef } from 'react';
import { useListboxKeyboard } from '../hooks/useWeatherSearch';
import type { Location, SearchStatus } from '../types/weather';
import { assetUrl } from '../utils/assetUrl';
import { formatLocationLabel } from '../utils/formatters';

type SearchSectionProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (query: string) => void;
  suggestions: Location[];
  searchStatus: SearchStatus;
  isSuggestionsOpen: boolean;
  activeSuggestionIndex: number;
  onActiveSuggestionIndexChange: (index: number) => void;
  onSelectLocation: (location: Location) => void;
  onCloseSuggestions: () => void;
  onOpenSuggestions: () => void;
};

const SearchSection = ({
  query,
  onQueryChange,
  onSubmit,
  suggestions,
  searchStatus,
  isSuggestionsOpen,
  activeSuggestionIndex,
  onActiveSuggestionIndexChange,
  onSelectLocation,
  onCloseSuggestions,
  onOpenSuggestions,
}: SearchSectionProps) => {
  const inputId = useId();
  const listboxId = useId();
  const statusId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const showListbox = isSuggestionsOpen && suggestions.length > 0;

  const handleKeyDown = useListboxKeyboard({
    isOpen: showListbox,
    itemCount: suggestions.length,
    activeIndex: activeSuggestionIndex,
    onActiveIndexChange: onActiveSuggestionIndexChange,
    onSelect: (index) => onSelectLocation(suggestions[index]),
    onClose: onCloseSuggestions,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (showListbox && activeSuggestionIndex >= 0) {
      onSelectLocation(suggestions[activeSuggestionIndex]);
      return;
    }

    onSubmit(query);
  };

  return (
    <section className="search" aria-labelledby="search-heading">
      <h1 id="search-heading" className="search__title">
        How&apos;s the sky looking today?
      </h1>

      <form
        ref={formRef}
        className="search__form"
        role="search"
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <div
          className="search__combobox"
          role="combobox"
          aria-expanded={showListbox}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-owns={listboxId}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              onCloseSuggestions();
            }
          }}
        >
          <label className="sr-only" htmlFor={inputId}>
            Search for a city
          </label>
          <div className="search__field">
            <img
              className="search__icon"
              src={assetUrl('assets/images/icon-search.svg')}
              alt=""
              aria-hidden="true"
            />
            <input
              id={inputId}
              className="search__input"
              type="search"
              name="location"
              placeholder="Search for a place..."
              autoComplete="off"
              value={query}
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-activedescendant={
                showListbox && activeSuggestionIndex >= 0
                  ? `${listboxId}-option-${activeSuggestionIndex}`
                  : undefined
              }
              aria-describedby={searchStatus !== 'idle' ? statusId : undefined}
              onChange={(event) => {
                onQueryChange(event.target.value);
                onOpenSuggestions();
              }}
              onFocus={onOpenSuggestions}
            />
          </div>

          {showListbox && (
            <ul className="search__suggestions" id={listboxId} role="listbox" aria-label="Location results">
              {suggestions.map((location, index) => (
                <li key={location.id} role="presentation">
                  <button
                    type="button"
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={index === activeSuggestionIndex}
                    className={`search__suggestion${
                      index === activeSuggestionIndex ? ' search__suggestion--active' : ''
                    }`}
                    onMouseEnter={() => onActiveSuggestionIndexChange(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onSelectLocation(location)}
                  >
                    {formatLocationLabel(location.name, location.country || location.admin1)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="search__submit">
          Search
        </button>
      </form>

      <div id={statusId} className="search__status" aria-live="polite" aria-atomic="true">
        {searchStatus === 'searching' && (
          <p className="search__status-message search__status-message--loading">
            <img
              className="search__status-spinner"
              src={assetUrl('assets/images/icon-loading.svg')}
              alt=""
              aria-hidden="true"
            />
            Search in progress
          </p>
        )}
        {searchStatus === 'no-results' && (
          <p className="search__status-message">No search result found!</p>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
