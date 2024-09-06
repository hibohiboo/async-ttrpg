import tseslint from 'typescript-eslint';
import path from "path";
import { fileURLToPath } from "url";
import js from '@eslint/js';
import { FlatCompat } from "@eslint/eslintrc";
import unuserdPlugin from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';
import sonarjs from "eslint-plugin-sonarjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});


export default tseslint.config({
  extends: [ js.configs.recommended
            , ...tseslint.configs.recommended
            , sonarjs.configs.recommended
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
  },
});
