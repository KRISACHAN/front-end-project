/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    important: '#root',
    theme: {
        extend: {
            colors: {
                'sidebar-bg': '#202123',
                'main-bg': '#343541',
                'input-bg': '#40414F',
                'hover-color': '#2A2B32',
            },
            spacing: {
                'sidebar-width': '260px',
            },
            maxWidth: {
                content: '764px',
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
