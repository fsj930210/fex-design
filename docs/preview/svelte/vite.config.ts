import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  // Preview sources do not rely on TypeScript path aliases or JSX settings.
  // Disable Vite's upward tsconfig discovery so it cannot follow the root
  // project's SvelteKit reference during an isolated production build.
  oxc: { tsconfig: false } as never,
  // This runtime is standalone: never discover the SvelteKit configuration in apps/svelte-app.
  plugins: [svelte({ configFile: false }), tailwindcss()],
})
