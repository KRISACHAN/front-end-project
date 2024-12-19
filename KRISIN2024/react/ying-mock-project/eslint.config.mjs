import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default tseslint.config({
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: [
        'dist',
        '.vscode',
        'images',
        'node_modules',
        'pnpm-lock.yaml',
        'public',
        '.gitignore',
    ],
    languageOptions: {
        ecmaVersion: 2021,
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
            ...globals.es2021,
        },
    },
    plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        'simple-import-sort': simpleImportSort,
        import: importPlugin,
        prettier,
        '@typescript-eslint': tsPlugin,
    },
    rules: {
        ...reactHooks.configs.recommended.rules,
        ...prettierConfig.rules,
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^react', '^react-dom'],
                    ['^@?\\w'],
                    ['^@/'],
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    ['^.+\\.?(css)$'],
                    ['^\\u0000'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'prettier/prettier': 'error',
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
});
