import globals from 'globals';
import configLove from 'eslint-config-love';
import configReactRecommended from 'eslint-plugin-react/configs/recommended.js';
import configReactJsx from 'eslint-plugin-react/configs/jsx-runtime.js';

// TODO: Get this working.
// https://github.com/facebook/react/issues/28313
// import configReactHooksRecommended from 'eslint-plugin-react-hooks';

// Includes both `config` and `plugin`.
import comboPrettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['coverage/**', 'dist/**'],
  },
  configLove,
  configReactRecommended,
  configReactJsx,
  // configReactHooksRecommended,
  comboPrettier,
  {
    name: 'custom-rules',
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      ...configLove.languageOptions,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ...configLove.languageOptions.parserOptions,
        project: './tsconfig.eslint.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
    },
  },
];
