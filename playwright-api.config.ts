import { defineConfig} from '@playwright/test';
import baseConfig from './playwright.config';


const API_BASE_URL = process.env.API_BASE_URL ?? 'https://goal-tracker-api.onrender.com';

export default defineConfig({
  ...baseConfig,
  timeout: 60000,
  testDir: './tests/playwright/specs/api',
  testIgnore: undefined,
  globalSetup: require.resolve('./tests/playwright/support/api/globalSetup.ts'),
  reporter: [['list'], ['html', {outputFolder: 'playwright-api-report', open: 'never'}]],
  use:{
    ...baseConfig.use,
    baseURL: API_BASE_URL,
  },
  projects: [{
    name: 'api'}],
    webServer: 
      undefined
    });

  

