import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {visualizer} from 'rollup-plugin-visualizer';

// Check if ANALYZE environment variable is set
const shouldAnalyze = process.env.ANALYZE === 'true';

export default defineConfig(({command}) => ({
    plugins: [
        vue(),
        shouldAnalyze && visualizer({
            open: true, // Automatically opens the visualization in the browser
            filename: 'stats.html', // Name of the stats file generated
            gzipSize: true, // Include gzip size
            brotliSize: true // Include brotli size
        })
    ].filter(Boolean),
    build: {
        lib: {
            entry: 'src/main.js',
            name: 'ChatWidget',
            fileName: 'chat-widget'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        },
        cssCodeSplit: false,
        cssMinify: true
    },
    define: {
        'process.env': {},
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    },
    // Add server configuration for development
    server: {
        port: 3000,
        open: true
    },
    // Conditional configuration based on command
    ...((command === 'serve') && {
        // Development-specific configurations
        build: {
            rollupOptions: {
                input: 'index.html'
            }
        }
    })
}));