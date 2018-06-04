module.exports = {
  parserOptions: { ecmaVersion: 6 },
  env: {
    node: true,
    es6: true,
    mocha: true,
  },
  plugins: ['sonarjs'],
  extends: ['eslint:recommended', 'plugin:sonarjs/recommended'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-var': ['error'],
    'no-extra-parens': ['warn'],
    // 'valid-jsdoc': ['warn'],
    'dot-location': ['error', 'property'],
  },
};
