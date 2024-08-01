import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {visualizer} from 'rollup-plugin-visualizer';

// Check if ANALYZE environment variable is set
const shouldAnalyze = process.env.ANALYZE === 'true';

export default defineConfig(({command}) => ({
    plugins: [
        vue(),
        shouldAnalyze && visualizer({
            open: true,
            filename: 'stats.html',
            gzipSize: true,
            brotliSize: true
        })
    ].filter(Boolean),
    build: {
        lib: {
            entry: 'src/main.js',
            name: 'ChatWidget',
            formats: ['iife'],
            fileName: () => 'chat-widget.js' // This ensures a constant file name
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                },
                inlineDynamicImports: true
            }
        },
        cssCodeSplit: false,
        cssMinify: true
    },
    define: {
        'process.env': {},
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    },
    server: {
        port: 3000,
        open: true
    },
    ...((command === 'serve') && {
        build: {
            rollupOptions: {
                input: 'index.html'
            }
        }
    })
}));