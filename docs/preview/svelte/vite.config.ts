import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  // This runtime is standalone: never discover the SvelteKit configuration in apps/svelte-app.
  plugins: [svelte({ configFile: false }), tailwindcss()],
})
