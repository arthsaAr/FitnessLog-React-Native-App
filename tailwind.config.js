/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  //content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
    content: ["./app/**/*.{js,jsx,ts,tsx}", './components/**/*.{js,jsx,ts,tsx}'],  //had to add components as well for the components/images to be seen
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '##121212',
        secondary: 'gray',
        accent: 'AB8BFF',
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9CA4AB',
        },
        dark: {
          100: '#221f3d',
          200: '#0F0D23',
        }
      }
    },
  },
  plugins: [],
}