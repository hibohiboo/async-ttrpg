import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import sonarjs from "eslint-plugin-sonarjs";
import unuserdPlugin from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
    baseDirectory: dirname
});


export default tseslint.config({
  extends: [ js.configs.recommended
            , ...tseslint.configs.recommended
            , ...compat.extends('airbnb-base')
            , ...compat.extends('plugin:import/recommended')
            , ...compat.extends('plugin:sonarjs/recommended-legacy')
            , ...compat.extends('eslint-config-turbo')
            , prettierConfig
          ],
  plugins: { 'unused-imports': unuserdPlugin, sonarjs },
  rules: {
    semi: ['error', 'always'],
    complexity: ['error', 10], // 複雑度の設定
    // unuserd-importsのrecommended設定を適用
    "no-unused-vars": "off", 
    "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'warn',
    "unused-imports/no-unused-vars": [
      "warn",
      {
          "vars": "all",
          "varsIgnorePattern": "^_",
          "args": "after-used",
          "argsIgnorePattern": "^_",
      },
    ],
    // ここまで unuserd-importsのrecommended設定を適用
    'import/order': [
      'warn',
      {
        groups: [ 'builtin','external','internal','parent','sibling','index','object','type' ], // importの並び順の設定
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [ { pattern: '@src/**', group: 'parent', position: 'before' } ], // エイリアスの位置を指定
        alphabetize: { order: 'asc' }, // グループ内のソート順
      },
    ],
    'import/prefer-default-export': ['off'],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^hono/.+'],
      },
    ],
    'import/extensions': ['off'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
});
