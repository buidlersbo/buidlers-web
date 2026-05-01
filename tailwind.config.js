/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Semantic tokens — usar estos en código nuevo
                primary: '#F1E65D',               // Corn / brand main
                background: '#10100F',            // Chinese Black
                surface: '#161616',               // Card background
                foreground: '#FFFEF0',            // Ivory / primary text
                muted: '#9D9A72',                 // Artichoke / secondary text
                border: '#484736',                // Rifle Green / dim borders

                // Aliases existentes (mantener compatibilidad)
                'buidlers-black': '#10100F',
                'buidlers-yellow': '#F1E65D',
                'buidlers-text': '#FFFEF0',
                'buidlers-dim': '#484736',
                'buidlers-gray': '#9D9A72',
                'syntax-orange': '#F57A0C',
                'syntax-green': '#10B068',
                'syntax-blue': '#3A7CC1',
            },
            fontFamily: {
                mono: ['"Pixel Operator Mono"', '"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
}
