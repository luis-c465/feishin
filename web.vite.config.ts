import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, normalizePath } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: './',
    build: {
        emptyOutDir: true,
        outDir: path.resolve(__dirname, './out/web'),
        rollupOptions: {
            input: {
                favicon: normalizePath(path.resolve(__dirname, './assets/icons/favicon.ico')),
                index: normalizePath(path.resolve(__dirname, './src/renderer/index.html')),
            },
            output: {
                assetFileNames: 'assets/[name].[ext]',
            },
        },
        sourcemap: true,
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
    optimizeDeps: {
        exclude: [
            // '@atlaskit/pragmatic-drag-and-drop',
            // '@atlaskit/pragmatic-drag-and-drop-auto-scroll',
            // '@atlaskit/pragmatic-drag-and-drop-hitbox',
            // '@tanstack_react-query-persist-client',
            // 'idb-keyval',
        ],
    },
    plugins: [
        react(),
        ViteEjsPlugin({
            root: normalizePath(path.resolve(__dirname, './src/renderer')),
            web: true,
        }),
        VitePWA({
            registerType: 'autoUpdate', // This is a common and sensible default
            // Optionally enable for dev mode testing
            devOptions: {
                enabled: true,
            resolveTempFolder: () => path.resolve(__dirname, "web-pwa-dist")
            },
            workbox: {
                // 5MB
                maximumFileSizeToCacheInBytes: 1000000 * 5
            },
            manifest: {
                name: 'Feishin',
                short_name: 'Feishin',
                start_url: '/',
                background_color: '#FFDCB5',
                theme_color: '#1E003D',
                icons: [
                    {
                        src: '32x32.png',
                        sizes: '32x32',
                        type: 'image/png',
                    },
                    {
                        src: '64x64.png',
                        sizes: '64x64',
                        type: 'image/png',
                    },
                    {
                        src: '128x128.png',
                        sizes: '128x128',
                        type: 'image/png',
                    },
                    {
                        src: '256x256.png',
                        sizes: '256x256',
                        type: 'image/png',
                    },
                    {
                        src: '512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: "any"
                    },
                    {
                        src: '1024x1024.png',
                        sizes: '1024x1024',
                        type: 'image/png',
                    },
                ],
                display: 'standalone',
                orientation: 'portrait',
                screenshots: [
                    {
                        src: 'preview_full_screen_player.png',
                        sizes: '1440x900',
                        type: 'image/png',
                        form_factor: 'wide',
                        label: 'Full screen player showing music player and lyrics',
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            '/@/i18n': path.resolve(__dirname, './src/i18n'),
            '/@/remote': path.resolve(__dirname, './src/remote'),
            '/@/renderer': path.resolve(__dirname, './src/renderer'),
            '/@/shared': path.resolve(__dirname, './src/shared'),
        },
        preserveSymlinks: true
    },
    root: path.resolve(__dirname, './src/renderer'),
    publicDir: path.resolve(__dirname, "./public")
});
