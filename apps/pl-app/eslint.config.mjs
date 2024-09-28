import customConfig from '@async-ttrpg/eslint-config-custom/frontend.js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [...customConfig],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: "./tsconfig.app.json",
      },
    },
  },
});
