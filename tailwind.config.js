/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Stint: ['Stint Ultra Expanded', 'serif'],
       },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#fb7185",
          "secondary": "#00c200",              
          "accent": "#0063ff",
          "neutral": "#1d140d",
          "base-100": "#fecdd3",
          "info": "#008ed8",
          "success": "#159e00",
          "warning": "#ea8d00",
          "error": "#ff3152",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
