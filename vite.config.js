import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: 'src/main.js',
            name: 'ChatWidget',
            fileName: 'chat-widget'
        },
        rollupOptions: {
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})