import globals from 'globals';
import tseslint from 'typescript-eslint';
import customConfig from '@async-ttrpg/eslint-config-custom/defaults.js';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ['dist', 'public'],
  extends: [...customConfig,  ],
  plugins: {
    'react-refresh': reactRefreshPlugin,
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/extensions': ['off'],
  },
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.node,
      myCustomGlobal: 'readonly',
    },
  },
});
