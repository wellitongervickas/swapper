module.exports = {
  trailingComma: "none",
  endOfLine: "auto",
  arrowParens: "always",
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  jsxSingleQuote: true,
  semi: false,
  tailwindConfig: "./tailwind.config.js",
  plugins: [require("prettier-plugin-tailwindcss")],
};
