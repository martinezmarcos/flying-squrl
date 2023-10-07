/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: { boxShadow: { lg: '0.33em 0.33em rgba(0, 0, 0, 1.0)' } },
    },
    plugins: [require('@tailwindcss/forms')],
}
