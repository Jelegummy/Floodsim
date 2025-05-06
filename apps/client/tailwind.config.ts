import daisyui from 'daisyui'
import defaultTheme from 'daisyui/src/theming/themes'
import { Config } from 'tailwindcss'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/scenes/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        floodsim: {
          ...defaultTheme.light,
          primary: '#03a9f4',
          '.btn': {
            animation: 0,
          },
        },
      },
    ],
  },
} satisfies Config

export default config
