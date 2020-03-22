module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'import',
    'vue',
  ],
  // add your custom rules here
  rules: {
    strict: 'error',
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    'no-param-reassign': 0,
    'no-return-assign': ['error', 'always'],
    'func-names': ['error', 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

  }
};
