import customConfig from "@async-ttrpg/eslint-config-custom/backend.js";
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: customConfig,
  ignores: ['vitest.workspace.ts']
});