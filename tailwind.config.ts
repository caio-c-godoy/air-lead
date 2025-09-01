import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0b0f1a',
          gold: '#f4c430',
          goldSoft: '#ffe08a',
          ink: '#0f172a'
        }
      },
      boxShadow: { brand: '0 10px 30px rgba(0,0,0,.35)' }
    }
  },
  plugins: []
}
export default config
