module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',

    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  plugins: ['prettier'],
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/html-self-closing': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false
      }
    ]
  }
}
