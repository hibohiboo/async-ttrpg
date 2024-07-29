
```
 npx codeceptjs init

  Welcome to CodeceptJS initialization tool
  It will prepare and configure a test environment for you

 Useful links:

  👉 How to start testing ASAP: https://codecept.io/quickstart/#init
  👉 How to select helper: https://codecept.io/basics/#architecture
  👉 TypeScript setup: https://codecept.io/typescript/#getting-started

Installing to D:\projects\async-ttrpg\apps\pl-app
? Do you plan to write tests in TypeScript? Yes
? Where are your tests located? ./*_test.ts
? What helpers do you want to use? Playwright
? Where should logs, screenshots, and reports to be stored? ./output
? Do you want to enable localization for tests? http://bit.ly/3GNUBbh English (no localization)
Configure helpers...
? [Playwright] Browser in which testing will be performed. Possible options: chromium, firefox, webkit or electron chromium
? [Playwright] Base url of site to be tested http://localhost:5173
? [Playwright] Show browser window No

Steps file created at ./steps_file.ts
Config created at D:\projects\async-ttrpg\apps\pl-app\codecept.conf.ts
Directory for temporary output files created at './output'
tsconfig.json already exists at D:\projects\async-ttrpg\apps\pl-app\tsconfig.json
CodeceptJS should be installed locally
Installing packages:  typescript, ts-node, @types/node, codeceptjs

changed 2 packages, and audited 1288 packages in 6s

206 packages are looking for funding
  run `npm fund` for details

12 vulnerabilities (4 low, 2 moderate, 6 high)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: D:\projects\async-ttrpg\apps\pl-app\codecept.conf.ts
require() of ES modules is not supported.
require() of D:\projects\async-ttrpg\apps\pl-app\codecept.conf.ts from D:\projects\async-ttrpg\node_modules\codeceptjs\lib\config.js is an ES module file as it is a .ts file whose nearest parent package.json contains "type": "module" which defines all .ts files in that package scope as ES modules.
Instead change the requiring code to use import(), or remove "type": "module" from D:\projects\async-ttrpg\apps\pl-app\package.json.

    at createErrRequireEsm (D:\projects\async-ttrpg\node_modules\ts-node\dist-raw\node-internal-errors.js:46:15)
    at assertScriptCanLoadAsCJSImpl (D:\projects\async-ttrpg\node_modules\ts-node\dist-raw\node-internal-modules-cjs-loader.js:584:11)
    at Object.require.extensions.<computed> [as .ts] (D:\projects\async-ttrpg\node_modules\ts-node\src\index.ts:1610:5)
    at Module.load (node:internal/modules/cjs/loader:1208:32)
    at Function.Module._load (node:internal/modules/cjs/loader:1024:12)
    at Module.require (node:internal/modules/cjs/loader:1233:19)
    at require (node:internal/modules/helpers:179:18)
    at loadConfigFile (D:\projects\async-ttrpg\node_modules\codeceptjs\lib\config.js:160:26)
    at Function.load (D:\projects\async-ttrpg\node_modules\codeceptjs\lib\config.js:99:16)
    at module.exports.getConfig (D:\projects\async-ttrpg\node_modules\codeceptjs\lib\command\utils.js:14:33)

```
