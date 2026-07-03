import { useCallback, useId, useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import { useListboxKeyboard } from '../hooks/useWeatherSearch';
import { assetUrl } from '../utils/assetUrl';

type DaySelectProps = {
  days: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  disabled?: boolean;
};

const DaySelect = ({ days, selectedIndex, onSelect, disabled = false }: DaySelectProps) => {
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(containerRef, close, isOpen);

  const open = () => {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  };

  const handleSelect = (index: number) => {
    onSelect(index);
    setIsOpen(false);
  };

  const handleKeyDown = useListboxKeyboard({
    isOpen,
    itemCount: days.length,
    activeIndex,
    onActiveIndexChange: setActiveIndex,
    onSelect: handleSelect,
    onClose: close,
  });

  return (
    <div className="day-select" ref={containerRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className="day-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-activedescendant={isOpen ? `${menuId}-option-${activeIndex}` : undefined}
        disabled={disabled}
        onClick={() => (isOpen ? close() : open())}
      >
        <span>{days[selectedIndex] ?? '—'}</span>
        <img
          className="day-select__chevron"
          src={assetUrl('assets/images/icon-dropdown.svg')}
          alt=""
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          className="day-select__menu"
          id={menuId}
          role="listbox"
          aria-label="Select day for hourly forecast"
        >
          {days.map((day, index) => (
            <li key={day} role="presentation">
              <button
                type="button"
                id={`${menuId}-option-${index}`}
                role="option"
                aria-selected={index === selectedIndex}
                className={`day-select__option${
                  index === activeIndex ? ' day-select__option--active' : ''
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelect(index)}
              >
                <span>{day}</span>
                {index === selectedIndex && (
                  <img src={assetUrl('assets/images/icon-checkmark.svg')} alt="" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DaySelect;
