module.exports = {
  extends: ['@it-incubator/eslint-config', 'plugin:storybook/recommended'],
  rules: {
    'no-console': ['warn', {
      allow: ['warn', 'error']
    }],
    'no-nested-ternary': 'off',
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.svg'],
      },
    }
  }
}
