# Weather App

SPA built for the [Frontend Mentor Weather app challenge](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Search for a city, view current conditions, and browse daily and hourly forecasts with metric/imperial unit controls.

## Enhancements beyond the challenge

Additional features added on top of the base Frontend Mentor scope:

### Geolocation on first visit

On each visit, the app requests the browser’s location and loads weather for the user’s current position automatically. Coordinates are reverse-geocoded (BigDataCloud) into a city label. If permission is denied or geolocation fails, the last searched location is restored from `localStorage`.

### Sunrise and sunset times

The Today card shows the **next** sun event for the selected location — sunrise before dawn, sunset during the day, then tomorrow’s sunrise after dusk. Each entry includes the local time and a small animated SVG icon (rising or setting sun over the horizon).

### Animated weather backgrounds

The Today card background and overlays react to current WMO weather codes and time of day:

- Clear / partly cloudy day — sun and light clouds
- Clear night — starfield
- Overcast — cloud layers
- Fog / rime fog — drifting fog
- Drizzle and rain — animated precipitation
- Snow — falling snowflakes
- Thunderstorm — lightning (with rain when precipitation is present)
- Hot conditions (≥ 30°C) — animated sun icon via Lottie

Background gradients and effects are driven by `todayCardTheme` so the card always matches the live conditions.

## Stack

- React 19 + TypeScript
- Vite 8
- SCSS (design tokens, BEM-style components)
- [Open-Meteo API](https://open-meteo.com/) (geocoding + forecast)
- [BigDataCloud](https://www.bigdatacloud.com/) (reverse geocoding for geolocation)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server with HMR |
| `npm run build` | Type-check and production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint`  | Run Oxlint               |

## Deployment

### GitHub Pages

Live site: **https://filipkoniuszewski.github.io/weather-app/**

Pushes to `main` deploy automatically via GitHub Actions (`.github/workflows/deploy.yml`).

The build copies `index.html` to `404.html` so direct links work on GitHub Pages.

```bash
npm run build
```

## Project structure

```
src/
├── api/          # Open-Meteo geocoding/forecast, reverse geocoding
├── components/   # Search, dashboard, forecasts, weather effects (rain, snow, fog…)
├── context/      # Units preferences (temperature, wind, precipitation)
├── hooks/        # Weather search (incl. geolocation), click-outside, listbox keyboard
├── types/        # Weather and units type definitions
├── utils/        # Formatters, dates, weather codes, sun events, geolocation helpers
└── styles/       # SCSS modules per page/component
```

## Design references

The original Frontend Mentor design exports are not bundled with this repo. The app uses custom animated backgrounds and icons for weather states instead of the static challenge artwork.

## License

Private — Frontend Mentor starter assets and challenge content.
