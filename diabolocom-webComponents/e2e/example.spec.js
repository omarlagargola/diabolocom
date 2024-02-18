// @ts-check
import { chromium, test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/';

test.describe('Webcomponents Diabolocom', () => {
  let browser;
  let context;
  let page;

  test.use({ viewport: { width: 1600, height: 1200 } });

  test.beforeEach(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(BASE_URL);
    await page.waitForSelector('.app');
  });

  test('components are rendered', async () => {
    const counters = await page.locator('my-counter').count();
    const metrics = await page.locator('my-metrics').count();
    const resets = await page.locator('my-reset').count();
    const locales = await page.locator('my-locale').count();
    expect(counters).toEqual(2);
    expect(metrics).toEqual(2);
    expect(resets).toEqual(2);
    expect(locales).toEqual(2);
  });

  test('counter function', async () => {
    // both counters are 0
    let counter1Htlm = await page.locator('my-metrics[group="1"] div').innerHTML();
    let counter1 = counter1Htlm.split(' ')[1];
    let counter2Htlm = await page.locator('my-metrics[group="2"] div').innerHTML();
    let counter2 = counter2Htlm.split(' ')[1];
    expect(counter1).toEqual('0');
    expect(counter2).toEqual('0');
    // increase only the first counter
    await page.locator('my-counter[group="1"] button').first().click();
    counter1Htlm = await page.locator('my-metrics[group="1"] div').innerHTML();
    counter1 = counter1Htlm.split(' ')[1];
    counter2Htlm = await page.locator('my-metrics[group="2"] div').innerHTML();
    counter2 = counter2Htlm.split(' ')[1];
    // only the first counter is incremented, the second remains intact
    expect(counter1).toEqual('1');
    expect(counter2).toEqual('0');
  });
  test('reset function', async () => {
    // the counter starts at 0
    let counter1Htlm = await page.locator('my-metrics[group="1"] div').innerHTML();
    let counter1 = counter1Htlm.split(' ')[1];
    expect(counter1).toEqual('0');
    // the counter is increased 2 times
    await page.locator('my-counter[group="1"] button').first().click();
    await page.locator('my-counter[group="1"] button').first().click();
    counter1Htlm = await page.locator('my-metrics[group="1"] div').innerHTML();
    counter1 = counter1Htlm.split(' ')[1];
    expect(counter1).toEqual('2');
    // the counter is reseted to 0
    await page.locator('my-reset[group="1"] button').first().click();
    counter1Htlm = await page.locator('my-metrics[group="1"] div').innerHTML();
    counter1 = counter1Htlm.split(' ')[1];
    expect(counter1).toEqual('0');
  });
  test('change language', async () => {
    // initially, the language is english
    let counter1Htlm = await page.locator('my-metrics[group="1"] div').innerHTML();
    expect(counter1Htlm).toEqual('Counter 0');
    // switch to french
    await page.locator('my-locale[group="1"] button').first().click();
    counter1Htlm = await page.locator('my-metrics[group="1"] div').innerHTML();
    expect(counter1Htlm).toEqual('Comptoir 0');
  });
});
