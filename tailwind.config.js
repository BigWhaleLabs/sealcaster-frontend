/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/!(tailwind).{ts,tsx}'],
  theme: {
    fontFamily: {
      primary: ['"Space Grotesk"', 'sans-serif'],
    },
    extend: {
      colors: {
        orb: 'var(--orb)',
        accent: 'var(--accent)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        'formal-accent': 'var(--formal-accent)',
        'light-grey': 'var(--light-grey)',
        'half-grey': 'var(--half-grey)',

        'formal-accent-dimmed': 'var(--formal-accent-dimmed)',

        error: 'var(--error)',
        'error-dark': 'var(--error-dark)',

        'primary-dark': 'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        'primary-dimmed': 'var(--primary-dimmed)',
        'primary-semi-dimmed': 'var(--primary-semi-dimmed)',
        'primary-background': 'var(--primary-background)',
        'primary-dark-red': 'var(--primary-dark-red)',
        'secondary-dimmed': 'var(--secondary-dimmed)',
        'secondary-dark': 'var(--secondary-dark)',
        'secondary-semi-dark': 'var(--secondary-semi-dark)',

        'accent-light-transparent': 'var(--accent-light-transparent)',
        'accent-light-active-transparent':
          'var(--accent-light-active-transparent)',
        'secondary-light-transparent': 'var(--secondary-light-transparent)',
        'secondary-light-active-transparent':
          'var(--secondary-light-active-transparent)',
        'formal-accent-light-transparent':
          'var(--formal-accent-light-transparent)',
        'formal-accent-dimmed': 'var(--formal-accent-dimmed)',
        'primary-semi-dimmed-transparent':
          'var(--primary-semi-dimmed-transparent)',

        'accent-light-transparent': 'var(--accent-light-transparent)',
        'accent-semi-transparent': 'var(--accent-semi-transparent)',
        'primary-semi-transparent': 'var(--primary-semi-transparent)',
        'secondary-semi-transparent': 'var(--secondary-semi-transparent)',
        'tertiary-semi-transparent': 'var(--tertiary-semi-transparent)',
        'formal-accent-semi-transparent':
          'var(--formal-accent-semi-transparent)',
        'light-formal-accent': 'var(--light-formal-accent)',
        'error-semi-transparent': 'var(--error-semi-transparent)',
        'primary-bright': 'var(--primary-bright)',
        divider: 'var(--divider)',
        'primary-semi-dimmed': 'var(--primary-semi-dimmed)',
      },
      borderRadius: {
        avatar: '6rem',
      },
      width: {
        'full-105': '105%',
        'seal-grid': '25.313rem',
      },
      maxWidth: {
        14: '3.5rem',
        84: '21rem',
        'processing-content': '27.875rem',
        body: '40.375rem',
      },
      lineHeight: {
        3: '0.875rem',
        5: '1.125rem',
        6: '1.313rem',
        7: '1.438rem',
        8: '1.938rem',
        10.5: '2.6rem',
        11: '3.188rem',
      },
      screens: {
        xxs: '17.5rem',
        xs: '22.5rem',
        sm: '28.125rem',
        md: '37.5rem',
        body: '42.375rem',
      },
      padding: {
        25: '6.25rem',
      },
      gap: {
        7.5: '1.875rem',
      },
      boxShadow: {
        '2xl': '0rem 0.25rem 2.75rem 0rem rgb(0 0 0 / 0.25)',
        lg: '0rem 0rem 1rem 0rem rgb(0 0 0 / 0.25)',
        md: '0rem 0rem 0.375rem 0rem rgb(0 0 0 / 0.25)',
        button: '0rem 0rem 1.625rem rgb(0 0 0 / 1)',
        'button-active': '0rem 0rem 0.375rem rgb(0 0 0 / 1)',
      },
      dropShadow: {
        'primary-dimmed': '0rem 0rem 4rem var(--primary-dimmed)',
        secondary: '0rem 0rem 0.625rem var(--secondary)',
        'accent-gradient': '1.25rem 1.25rem 4.62rem var(--accent-transparent)',
        'secondary-gradient':
          '-1.25rem -1.25rem 4.62rem var(--secondary-transparent)',
        'accent-light-transparent':
          '0rem 0rem 2.125rem var(--accent-light-transparent);',
      },
      strokeWidth: {
        1.5: '1.5',
        4: '4',
      },
      keyframes: {
        'pulse-horizontal': {
          '0%, 100%': { transform: 'translateX(0.5rem)' },
          '50%': { transform: 'translateX(0rem)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'pulse-horizontal': 'pulse-horizontal 2s ease-in-out infinite',
        rotate: 'rotate linear 3.5s infinite',
      },
      rotate: {
        '-15': '-15deg',
      },
      inset: {
        '-2.5': '-0.65rem',
        '-12.5': '-3.125rem',
        '-25': '-6.25rem',
        '-27.5': '-6.875rem',
      },
      boxShadow: {
        'button-active': '0rem 0rem 0.375rem #000000',
        '2xl': '0rem 0.25rem 2.75rem 0rem #00000025',
        lg: '0rem 0rem 1rem 0rem #00000025',
        md: '0rem 0rem 0.375rem 0rem #00000025',
        button: '0rem 0rem 1.625rem #000000',
      },
      fontSize: {
        '3.5xl': '2rem',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
}
