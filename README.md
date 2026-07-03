# Weather App

SPA built for the [Frontend Mentor Weather app challenge](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Search for a city, view current conditions, and browse daily and hourly forecasts with metric/imperial unit controls.

## Stack

- React 19 + TypeScript
- Vite 8
- SCSS (design tokens, BEM-style components)
- [Open-Meteo API](https://open-meteo.com/) (geocoding + forecast)

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
├── api/          # Open-Meteo geocoding and forecast clients
├── components/   # Search, dashboard, units dropdown, day select
├── context/      # Units preferences (temperature, wind, precipitation)
├── hooks/        # Weather search, click-outside, listbox keyboard
├── types/        # Weather and units type definitions
├── utils/        # Formatters, dates, weather code icons
└── styles/       # SCSS modules per page/component
```

## Design references

Local design exports live in `design/` (gitignored). They are not required to run or build the app.

## License

Private — Frontend Mentor starter assets and challenge content.
