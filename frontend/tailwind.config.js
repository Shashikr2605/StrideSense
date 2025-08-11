```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './*.{js,ts,jsx,tsx,mdx,css}',
        './uploads.tsx',
        './resultdisplay.tsx',
        './index.tsx',
],
     theme: {
       extend: {
         // Optional: Include your custom colors from globals.css
         colors: {
           'primary-blue': '#1e40af',
           'primary-blue-light': '#3b82f6',
           'primary-blue-dark': '#1e3a8a',
           'secondary-teal': '#0d9488',
           'secondary-teal-light': '#14b8a6',
           'accent-green': '#059669',
           'accent-amber': '#d97706',
           'neutral-50': '#f8fafc',
           'neutral-100': '#f1f5f9',
           'neutral-200': '#e2e8f0',
           'neutral-700': '#334155',
           'neutral-800': '#1e293b',
           'neutral-900': '#0f172a',
           'success-green': '#10b981',
           'warning-amber': '#f59e0b',
           'error-red': '#ef4444',
         },
       },
     },
     plugins: [],
     darkMode: 'class', // Matches your usage of dark mode
   };
   ```