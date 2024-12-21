import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin'; // Updated import path
import eslintParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: eslintParser, // Add the TypeScript parser for TypeScript files
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    ignores: ['node_modules', 'dist'],
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
  },
  pluginJs.configs.recommended, // JavaScript-specific rules
  tseslint.configs.recommended, // TypeScript-specific rules
  eslintConfigPrettier, // Disables formatting rules for compatibility with Prettier
];
