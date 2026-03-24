import { createRequire } from 'module';

import eslintConfigPrettier from 'eslint-config-prettier';
import sonarjsPlugin from 'eslint-plugin-sonarjs';

const require = createRequire(import.meta.url);
const eslintConfigExpo = require('eslint-config-expo/flat');

export default [
  // Expo: TypeScript, React, React Hooks, Import, Expo rules
  ...eslintConfigExpo,

  // Prettier: disable formatting rules that conflict
  eslintConfigPrettier,

  // SonarJS: code quality / smell detection (lightweight SonarQube replacement)
  sonarjsPlugin.configs.recommended,

  // Project-specific overrides
  {
    rules: {
      // Tune sonarjs — warn instead of error for gradual adoption
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-identical-functions': 'warn',
      'sonarjs/cognitive-complexity': ['warn', 15],
      'sonarjs/no-collapsible-if': 'warn',
      'sonarjs/prefer-single-boolean-return': 'warn',

      // Import ordering
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // React Native — not needed with React 17+ JSX transform
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },

  // Global ignores
  {
    ignores: ['node_modules/', 'dist/', 'web-build/', '.expo/', 'ios/', 'android/', 'docs/'],
  },
];
