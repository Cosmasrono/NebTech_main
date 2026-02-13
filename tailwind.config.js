import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                maroon: {
                    50: '#fdf2f2',
                    100: '#fbe2e2',
                    200: '#f7caca',
                    300: '#f1a5a5',
                    400: '#e67373',
                    500: '#d64646',
                    600: '#800000', // Traditional Maroon
                    700: '#6b0000',
                    800: '#5c0000',
                    900: '#4d0000',
                    950: '#2d0000',
                },
            },
        },
    },

    plugins: [forms, typography],
};
