import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],
      },
      colors: {
        accent: {
          DEFAULT: '#34d399',
          foreground: '#064e3b',
        },
      },
      typography: () => ({
        invert: {
          css: {
            '--tw-prose-body': 'rgb(212 212 216)',
            '--tw-prose-headings': 'rgb(244 244 245)',
            '--tw-prose-links': 'rgb(52 211 153)',
            '--tw-prose-bold': 'rgb(244 244 245)',
            '--tw-prose-counters': 'rgb(113 113 122)',
            '--tw-prose-bullets': 'rgb(63 63 70)',
            '--tw-prose-hr': 'rgb(39 39 42)',
            '--tw-prose-quotes': 'rgb(212 212 216)',
            '--tw-prose-quote-borders': 'rgb(39 39 42)',
            '--tw-prose-captions': 'rgb(113 113 122)',
            '--tw-prose-code': 'rgb(244 244 245)',
            '--tw-prose-pre-code': 'rgb(212 212 216)',
            '--tw-prose-pre-bg': 'rgb(24 24 27)',
            '--tw-prose-th-borders': 'rgb(63 63 70)',
            '--tw-prose-td-borders': 'rgb(39 39 42)',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
