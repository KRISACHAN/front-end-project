import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        legacy({
            targets: ['defaults', 'not IE 11'],
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        chunkSizeWarningLimit: 1000, // 提高警告阈值到 1000kb
        rollupOptions: {
            output: {
                manualChunks: {
                    // 将 React 相关库打包在一起
                    'react-vendor': ['react', 'react-dom'],
                    // 将 Material UI 相关库打包在一起
                    'mui-vendor': [
                        '@mui/material',
                        '@mui/icons-material',
                        '@emotion/react',
                        '@emotion/styled',
                    ],
                    // 将 Markdown 相关库打包在一起
                    'markdown-vendor': [
                        'react-markdown',
                        'react-syntax-highlighter',
                        'remark-gfm',
                    ],
                },
                // 优化 CSS 代码分割
                assetFileNames: assetInfo => {
                    let extType = assetInfo.name.split('.').at(1);
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'img';
                    }
                    return `assets/${extType}/[name]-[hash][extname]`;
                },
                // 优化 JS 代码分割
                chunkFileNames: 'assets/js/[name]-[hash].js',
                // 优化入口文件
                entryFileNames: 'assets/js/[name]-[hash].js',
            },
        },
        // 启用 CSS 代码分割
        cssCodeSplit: true,
        // 启用源码映射
        sourcemap: true,
        // 启用压缩
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true, // 生产环境去除 console
                drop_debugger: true, // 生产环境去除 debugger
            },
        },
    },
});
