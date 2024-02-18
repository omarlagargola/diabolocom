import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/web-comp.js',
      formats: ['es', 'cjs'],
      name: 'vue-web-comp',
      fileName: (format) =>(format == 'es' ? 'index.js' : 'index.cjs')
    },
    sourcemap: true,
    target: 'esnext',
    minify: false
  }
})
