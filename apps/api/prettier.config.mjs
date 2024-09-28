const prettierConfig = {
  semi: true,
  arrowParens: "always",
  singleQuote: true,
  trailingComma: "all",
}
const prettierPluginSqlConfig = {
  language: 'tsql',
  keywordCase: 'upper'
}

const config = {
  plugins: [
      "prettier-plugin-embed"
    , "prettier-plugin-sql"
  ]
  , ...prettierConfig
  , ...prettierPluginSqlConfig
}

export default config;
