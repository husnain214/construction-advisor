const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--poppins-font)', 'sans-serif'],
      },
      colors: {
        primary: '#EE6338',
      },
    },
  },
  plugins: [],
};
export default config;
