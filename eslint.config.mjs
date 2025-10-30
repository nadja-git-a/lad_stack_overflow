import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierPlugin from 'eslint-plugin-prettier';
import playwright from 'eslint-plugin-playwright';
import storybook from 'eslint-plugin-storybook';

export default [
  {
    ignores: [
      'dist/**',
      'build/**',
      'coverage/**',
      'storybook-static/**',
      'test/__mocks__/**',
      'node_modules/**',
      'eslint.config.*',
      'vite.config.ts',
      'playwright-report/**/*',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node, ...globals.es2020 },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/react-in-jsx-scope': 'off',
      ...reactHooks.configs.recommended.rules,

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^node:'],
            ['^@?\\w'],
            ['^@/', '^app/', '^pages/', '^widgets/', '^features/', '^entities/', '^shared/'],
            ['^\\./', '^\\.\\./'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'prettier/prettier': ['warn', { endOfLine: 'auto' }],

      'no-unused-vars': 'warn',
    },
  },

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  {
    files: ['**/*.test.{ts,tsx,js,jsx}', '**/__tests__/**', 'test/**/*.*', 'test/setupTests.ts'],
    languageOptions: { globals: { ...globals.jest }, parserOptions: { project: null } },
  },

  {
    files: ['**/*.e2e.{ts,tsx}', 'tests/e2e/**/*.{ts,tsx}', 'playwright.config.ts'],
    plugins: { playwright },
    rules: {
      'playwright/missing-playwright-await': 'error',
      'playwright/no-page-pause': 'warn',
    },
    languageOptions: { parserOptions: { project: null } },
  },

  {
    files: ['**/*.stories.@(ts|tsx|js|jsx)'],
    plugins: { storybook },
    languageOptions: {
      parserOptions: { project: null },
    },
    rules: {
      'storybook/no-renderer-packages': 'off',
    },
  },
];
