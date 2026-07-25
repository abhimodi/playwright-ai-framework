import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
    quiet: true
});

const isCI = !!process.env.CI;

export default defineConfig({
    testDir: './tests',

    timeout: 60 * 1000,

    expect: {
        timeout: 10 * 1000
    },

    fullyParallel: true,

    forbidOnly: isCI,

    retries: isCI ? 2 : 0,

    workers: isCI ? 2 : undefined,

    reporter: [['html', { open: 'never' }], ['list']],

    use: {
        baseURL: process.env.BASE_URL,

        headless: true,

        viewport: {
            width: 1920,
            height: 1080
        },

        actionTimeout: 15000,

        navigationTimeout: 30000,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure',

        ignoreHTTPSErrors: true,

        acceptDownloads: true
    },

    projects: [
        {
            name: 'Chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },

        {
            name: 'Firefox',
            use: {
                ...devices['Desktop Firefox']
            }
        },

        {
            name: 'WebKit',
            use: {
                ...devices['Desktop Safari']
            }
        }
    ],

    outputDir: 'reports/test-results'
});
