const theme = require('./modules/tailwind/themes/default')
const container = require('./modules/tailwind/plugins/container')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.tsx'],
  corePlugins: {
    container: false
  },
  plugins: [container],
  theme
}
