const rules = {
  'import/prefer-default-export': 0,
  'import/no-dynamic-require': 0,
  'global-require': 0,
};

module.exports = {
  extends: ['eslint-config-airbnb-base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules,
  overrides: [
    {
      files: ['.eslintrc.js'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['eslint-config-airbnb-typescript'],
      rules,
    },
  ],
};