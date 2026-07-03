import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = '/weather-app/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
