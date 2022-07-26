/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: [
          'JetBrainsMono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      colors: {
        highlight: '#9BFD9E',
        tomato: '#ff6d1a',
        'gb-bg': '#16425b',
        'gb-highlight': '#9BFD9E',
        'gb-tomato': '#ff6d1a',
        'gb-pastel-green-1': '#B6FADF',
        'gb-pastel-green-2': '#4E8C71',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      scale: {
        101: '1.01',
        102: '1.02',
        103: '1.03',
        104: '1.04',
      },
    },
  },
  plugins: [],
}
