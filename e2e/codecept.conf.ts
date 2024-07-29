import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './cases/form_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost:5173',
      show: true,
    },
  },
  // -----ここから追記-----
  translation: 'MyLang',
  vocabularies: ['./ja-SR.js'],
  // -----ここまで追記-----
  // -----ここから追記-----
  plugins: {
    stepByStepReport: {
      enabled: true,
      deleteSuccessful: false,
    },
  },
  // -----ここまで追記-----
  include: {
    I: './steps_file',
  },
  name: 'e2e',
};