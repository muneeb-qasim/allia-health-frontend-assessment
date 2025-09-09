/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Noto Sans', 'sans-serif'],
        sans: ['var(--font-noto-sans)', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
