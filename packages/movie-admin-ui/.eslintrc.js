module.exports = {
  extends: ['airbnb-typescript', 'prettier', 'prettier/react', 'prettier/@typescript-eslint', 'plugin:react-hooks/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-restricted-syntax': 'off',
    'no-console': 'off',
    'react/require-default-props': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  env: {
    browser: true,
    es2021: true,
  },
}
