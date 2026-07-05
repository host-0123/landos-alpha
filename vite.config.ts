import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom domain (sontsestoyannya.dvocorp.com) serves from the root,
// so the default base '/' is correct for GitHub Pages too.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
