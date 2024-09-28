import customConfig from '@async-ttrpg/eslint-config-custom/defaults.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.ts'],
  ignores: ['dist'],
  extends: [...customConfig],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.node,
      myCustomGlobal: 'readonly',
    },
  },
});
