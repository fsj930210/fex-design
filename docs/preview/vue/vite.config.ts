import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import * as compiler from 'vue/compiler-sfc'
import ts from 'typescript'

compiler.registerTS(() => ts)

export default defineConfig({
  base: './',
  plugins: [
    vue({
      compiler,
      // compiler-sfc needs an explicit file-system adapter when resolving
      // imported prop types in this source-delivered workspace.
      script: { fs: ts.sys },
    }),
    tailwindcss(),
  ],
})
