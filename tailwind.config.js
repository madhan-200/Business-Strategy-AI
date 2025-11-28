/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./views/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    900: '#0c4a6e',
                },
                dark: {
                    bg: '#0F172A',
                    card: '#1E293B',
                    border: '#334155'
                },
                neon: {
                    blue: '#3B82F6',
                    purple: '#8B5CF6',
                    cyan: '#06B6D4'
                }
            }
        }
    },
    plugins: [],
}
