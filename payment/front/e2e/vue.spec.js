const { test, expect } = require('@playwright/test');

test('visits the app root url', async ({ page }) => {
  // Go to the root URL
  await page.goto('/');

  // Wait for the DOM to be loaded
  await page.waitForLoadState('domcontentloaded');

  // Assert that the page title is correct
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Vite App'); // Replace with your actual page title

  // Check if the dashboard page is loaded
  const dashboard = await page.waitForSelector('main > h3');
  expect(dashboard).toBeTruthy();

  // Transaction
  const transactionButton = await page.waitForSelector('#router-list > #router-list-main > a:nth-child(2)');
  await transactionButton.click();
  await page.waitForLoadState('domcontentloaded');
  const transactionHeader = await page.waitForSelector('aside > h3');
  expect(transactionHeader).toBeTruthy();

  // Users
  const usersButton = await page.waitForSelector('#router-list > #router-list-main > a:nth-child(3)');
  await usersButton.click();
  await page.waitForLoadState('domcontentloaded');
  const usersHeader = await page.waitForSelector('section > h1');
  expect(usersHeader).toBeTruthy();

  // Parameters
  const parametersButton = await page.waitForSelector('#router-list > #router-list-main > a:nth-child(4)');
  await parametersButton.click();
  await page.waitForLoadState('domcontentloaded');
  const parametersHeader = await page.waitForSelector('aside > h3');
  expect(parametersHeader).toBeTruthy();

  // Logs
  const logButton = await page.waitForSelector('#router-list > #router-list-others > a:nth-child(1)');
  await logButton.click();
  await page.waitForLoadState('domcontentloaded');
  const logHeader = await page.waitForSelector('.about > h1');
  expect(logHeader).toBeTruthy();

});
