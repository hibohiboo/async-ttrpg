import path from "path";
import { fileURLToPath } from "url";
import customConfig from '@async-ttrpg/eslint-config-custom/defaults.js';
import { FlatCompat } from "@eslint/eslintrc";
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
    baseDirectory: dirname
});

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ['dist', 'public'],
  extends: [...customConfig
           , ...compat.extends('plugin:react-hooks/recommended')
           , ...compat.extends('plugin:@conarti/eslint-plugin-feature-sliced/recommended')
          ],
  plugins: {
    'react-refresh': reactRefreshPlugin,
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/extensions': ['off'],
    // ↓ bulletproof-react の推奨 https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md
    // 'import/no-restricted-paths': [
    //   'error',
    //   {
    //     zones: [
    //       // disables cross-feature imports:
    //       // eg. src/features/discussions should not import from src/features/comments, etc.
    //       {
    //         target: './src/features/auth',
    //         from: './src/features',
    //         except: ['./auth'],
    //       },
    //       {
    //         target: './src/features/comments',
    //         from: './src/features',
    //         except: ['./comments'],
    //       },
    //       {
    //         target: './src/features/discussions',
    //         from: './src/features',
    //         except: ['./discussions'],
    //       },
    //       {
    //         target: './src/features/teams',
    //         from: './src/features',
    //         except: ['./teams'],
    //       },
    //       {
    //         target: './src/features/users',
    //         from: './src/features',
    //         except: ['./users'],
    //       },

    //       // More restrictions...

    //       // Previous restrictions...
    //       // enforce unidirectional codebase:
    //       // e.g. src/app can import from src/features but not the other way around
    //       {
    //         target: './src/features',
    //         from: './src/app',
    //       },

    //       // e.g src/features and src/app can import from these shared modules but not the other way around
    //       {
    //         target: [
    //           './src/components',
    //           './src/hooks',
    //           './src/lib',
    //           './src/types',
    //           './src/utils',
    //         ],
    //         from: ['./src/features', './src/app'],
    //       },
    //     ],
    //   },
    // ],
    // ↑ bulletproof-react の推奨
  },
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...globals.node,
      ...globals.browser,
      myCustomGlobal: 'readonly',
    },
  },
});
