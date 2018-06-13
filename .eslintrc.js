// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    browser: true,
  },
  globals: {
    'AFRAME': true,
    'THREE': true
  },
  extends: 'standard',
  rules: {
    'indent': ['error', 2],
    'one-var': [
      'error',
      {
        'var': 'never',
        'let': 'never',
        'const': 'never'
      }
    ],
    'semi': [2, 'never'],
    'arrow-parens': 0,
    'generator-star-spacing': 'off',
    'no-debugger': (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'homolog')  ? 'error' : 'off',
    'no-new': 0,
    'no-fallthrough': 'off'
  }
}
