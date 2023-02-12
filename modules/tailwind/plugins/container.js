const plugin = require('tailwindcss/plugin')

const SIZES = {
  fallback: '100%',
  md: '768px',
  lg: '1200px'
}

const container = plugin(({ addUtilities }) => {
  const utility = {
    '.container': {
      width: SIZES.fallback,
      margin: 'auto',
      paddingRight: '16px',
      paddingLeft: '16px',

      '@screen md': {
        maxWidth: SIZES.md
      },

      '@screen lg': {
        maxWidth: SIZES.lg
      }
    }
  }

  addUtilities(utility)
})

module.exports = container
