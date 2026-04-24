import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// On GitHub Pages the site is served from /<repo>/ — set base accordingly.
// Overridable via `VITE_BASE` so `npm run dev` still runs from /.
const base = process.env.VITE_BASE ?? (process.env.GITHUB_ACTIONS ? '/untitled-marketing/' : '/')

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
