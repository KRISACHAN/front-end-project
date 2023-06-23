import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve';

const config = [
    {
        plugins: [
            resolve(),
            esbuild({
                include: /\.[jt]sx?$/,
                exclude: /node_modules/,
                sourceMap: true,
                minify: false,
                target: 'esnext',
                tsconfig: 'tsconfig.json',
                loaders: {
                    '.js': 'jsx',
                    '.ts': 'ts',
                    '.tsx': 'tsx',
                },
            }),
        ],
        input: 'src/index.ts',
        output: [
            {
                dir: './dist',
                format: 'esm',
                entryFileNames: () => '[name].es.js',
                sourcemap: true
            },
            {
                dir: './dist',
                format: 'cjs',
                entryFileNames: () => '[name].cjs.js',
                sourcemap: true
            },
            {
                dir: './dist',
                format: 'umd',
                name: 'MyLibrary',
                entryFileNames: () => '[name].umd.js',
                sourcemap: true
            },
            {
                dir: './dist',
                format: 'iife',
                name: 'MyLibrary',
                entryFileNames: () => '[name].iife.js',
                sourcemap: true
            },
            {
                dir: './dist',
                format: 'amd',
                entryFileNames: () => '[name].amd.js',
                sourcemap: true
            },
            {
                dir: './dist',
                format: 'system',
                entryFileNames: () => '[name].system.js',
                sourcemap: true
            },
        ],
    },
]
export default config
