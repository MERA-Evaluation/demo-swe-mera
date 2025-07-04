import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import {viteSingleFile} from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    svelte(),
    viteSingleFile() // должен быть после svelte()
  ],
  base: '/',
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000, // максимально возможный лимит
    cssCodeSplit: false,          // отключает разделение CSS
  }
})