// tailwind.config.js

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f8f9fa', // White from Toingg theme
        gradientStart: '#ffd6ba', // Gradient start
        gradientEnd: '#ffe8d9', // Gradient end
        DarkBg: '#1e293b', // Dark theme 
        menuText: '#e2e8f0', // Text color 
      },
      screens: {
        'max-xs': {'max':'375px'},
        'max-sm': {'max':'650px'}
      },
    },
  },
  plugins: [
 
  ],
}