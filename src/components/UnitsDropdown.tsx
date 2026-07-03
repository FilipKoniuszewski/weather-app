import { useCallback, useId, useRef, useState } from 'react';
import { useUnits } from '../context/UnitsContext';
import { useClickOutside } from '../hooks/useClickOutside';
import { assetUrl } from '../utils/assetUrl';

const UnitsDropdown = () => {
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    units,
    toggleSystem,
    setTemperature,
    setWind,
    setPrecipitation,
    isMetricSystem,
  } = useUnits();

  const close = useCallback(() => setIsOpen(false), []);

  useClickOutside(containerRef, close, isOpen);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') close();
    },
    [close],
  );

  return (
    <div className="units" ref={containerRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className="units__trigger"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <img src={assetUrl('assets/images/icon-units.svg')} alt="" aria-hidden="true" />
        <span>Units</span>
        <img
          className="units__chevron"
          src={assetUrl('assets/images/icon-dropdown.svg')}
          alt=""
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="units__menu" id={menuId} role="dialog" aria-label="Measurement units">
          <button type="button" className="units__switch" onClick={toggleSystem}>
            Switch to {isMetricSystem ? 'Imperial' : 'Metric'}
          </button>

          <div className="units__group">
            <p className="units__label" id={`${menuId}-temperature`}>
              Temperature
            </p>
            <ul className="units__options" role="listbox" aria-labelledby={`${menuId}-temperature`}>
              <li>
                <button
                  type="button"
                  role="option"
                  aria-selected={units.temperature === 'celsius'}
                  className="units__option"
                  onClick={() => setTemperature('celsius')}
                >
                  <span>Celsius (°C)</span>
                  {units.temperature === 'celsius' && (
                    <img src={assetUrl('assets/images/icon-checkmark.svg')} alt="" aria-hidden="true" />
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  role="option"
                  aria-selected={units.temperature === 'fahrenheit'}
                  className="units__option"
                  onClick={() => setTemperature('fahrenheit')}
                >
                  <span>Fahrenheit (°F)</span>
                  {units.temperature === 'fahrenheit' && (
                    <img src={assetUrl('assets/images/icon-checkmark.svg')} alt="" aria-hidden="true" />
                  )}
                </button>
              </li>
            </ul>
          </div>

          <div className="units__group">
            <p className="units__label" id={`${menuId}-wind`}>
              Wind Speed
            </p>
            <ul className="units__options" role="listbox" aria-labelledby={`${menuId}-wind`}>
              <li>
                <button
                  type="button"
                  role="option"
                  aria-selected={units.wind === 'kmh'}
                  className="units__option"
                  onClick={() => setWind('kmh')}
                >
                  <span>km/h</span>
                  {units.wind === 'kmh' && (
                    <img src={assetUrl('assets/images/icon-checkmark.svg')} alt="" aria-hidden="true" />
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  role="option"
                  aria-selected={units.wind === 'mph'}
                  className="units__option"
                  onClick={() => setWind('mph')}
                >
                  <span>mph</span>
                  {units.wind === 'mph' && (
                    <img src={assetUrl('assets/images/icon-checkmark.svg')} alt="" aria-hidden="true" />
                  )}
                </button>
              </li>
            </ul>
          </div>

          <div className="units__group">
            <p className="units__label" id={`${menuId}-precipitation`}>
              Precipitation
            </p>
            <ul className="units__options" role="listbox" aria-labelledby={`${menuId}-precipitation`}>
              <li>
                <button
                  type="button"
                  role="option"
                  aria-selected={units.precipitation === 'mm'}
                  className="units__option"
                  onClick={() => setPrecipitation('mm')}
                >
                  <span>Millimeters (mm)</span>
                  {units.precipitation === 'mm' && (
                    <img src={assetUrl('assets/images/icon-checkmark.svg')} alt="" aria-hidden="true" />
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  role="option"
                  aria-selected={units.precipitation === 'in'}
                  className="units__option"
                  onClick={() => setPrecipitation('in')}
                >
                  <span>Inches (in)</span>
                  {units.precipitation === 'in' && (
                    <img src={assetUrl('assets/images/icon-checkmark.svg')} alt="" aria-hidden="true" />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitsDropdown;
