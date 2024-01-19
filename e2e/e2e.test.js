import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(40000); // default puppeteer timeout

describe('Pop-up text', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('btn should render on page start', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.btn');
  });

  test('popover should render on page, class popover should appear on page', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.btn');

    const btn = await page.$('.btn');

    await btn.click();

    await page.waitForSelector('.popover');
  });
});