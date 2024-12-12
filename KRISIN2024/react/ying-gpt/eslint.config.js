import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config({
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    ignores: [
        'dist',
        'node_modules',
        'pnpm-lock.yaml',
        '.turbo',
        'public',
        '.env*.development',
        '.env*.production',
        '.env',
        '.gitignore',
        '.prettierignore',
        '.prettierrc',
        '.eslintignore',
        '.eslintrc',
    ],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        'simple-import-sort': simpleImportSort,
        import: importPlugin,
    },
    rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^node:'],
                    ['^react', '^react-dom'],
                    ['^@?\\w'],
                    ['^@/'],
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    ['^.+\\.?(css|less|scss)$'],
                    ['^\\u0000'],
                ],
            },
        ],
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/no-duplicates': 'error',
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
    languageOptions: {
        globals: {
            browser: true,
            node: true,
        },
    },
});
