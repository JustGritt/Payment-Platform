const { test, expect } = require('@playwright/test');

test('End-to-end test for the registration form', async ({ page }) => {
  // Go to the root URL
  await page.goto('/register');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);

  const inputs = await page.$$('input');

  // Handle company name
  await inputs[0].fill('JohnDoeCompany');
  expect(await inputs[0].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle email
  await inputs[1].fill('JohnDoe@mail.com');
  expect(await inputs[1].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle password
  await inputs[2].fill('Test'); // Should validate first rule
  expect(await inputs[2].getAttribute('aria-describedby') === "help-input_0 input_0-rule_length");
  await page.waitForTimeout(1000);

  await inputs[2].fill('@Test'); // Should validate second rule
  expect(await inputs[2].getAttribute('aria-describedby') === "help-input_0 input_0-rule_length");
  await page.waitForTimeout(1000);

  await inputs[2].fill('@Test1'); // Should validate third rule
  expect(await inputs[2].getAttribute('aria-describedby') === "help-input_0 input_0-rule_length");
  await page.waitForTimeout(1000);

  await inputs[2].fill('@Test1234'); // Should validate fourth rule
  expect(await inputs[2].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle password confirmation
  await inputs[3].fill('@Test1234');
  expect(await inputs[3].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle country
  await inputs[4].fill('France');
  expect(await inputs[4].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle city
  await inputs[5].fill('Paris');
  expect(await inputs[5].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle address
  await inputs[6].fill('242 reu Faubourg Saint-Antoine');
  expect(await inputs[6].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle phone number
  await inputs[7].fill('1122334455');
  expect(await inputs[7].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle postal code
  await inputs[8].fill('75012');
  expect(await inputs[8].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle SIRET
  await inputs[9].fill('753 892 926 00035');
  expect(await inputs[9].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle Confirm URL
  await inputs[10].fill('https://www.google.com');
  expect(await inputs[10].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle Cancel URL
  await inputs[11].fill('https://www.google.com');
  expect(await inputs[11].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle contact name
  await inputs[12].fill('John');
  expect(await inputs[12].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle contact last name
  await inputs[13].fill('Doe');
  expect(await inputs[13].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle role in company
  await inputs[14].fill('Responsable des ventes');
  expect(await inputs[14].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle contact department
  await inputs[15].fill('Ventes');
  expect(await inputs[15].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle contact email
  await inputs[16].fill('johndoe@contact.com');
  expect(await inputs[16].getAttribute('aria-describedby'));
  await page.waitForTimeout(1000);

  // Handle submit
  const submitButton = await page.waitForSelector('button');
  await submitButton.click();
  await page.waitForTimeout(2500);
});

test('visits the app root url', async ({ page }) => {

    // Go to the root URL
    await page.goto('https://strapouz.com/login');
    await page.waitForLoadState('domcontentloaded');

    // Fill the login form
    const inputs = await page.$$('input');
    await inputs[0].fill('JohnDoe@company.com');
    await page.waitForTimeout(1000);
    await inputs[1].fill('@Test1234');
    await page.waitForTimeout(1000);

    // Submit the form
    const submitButton = await page.waitForSelector('button');
    await submitButton.click();
    await page.waitForTimeout(1000);

  // Assert that the page title is correct
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Vite App'); // Replace with your actual page title

  // Check if the dashboard page is loaded
  const dashboard = await page.waitForSelector('main > h3');
  expect(dashboard).toBeTruthy();
  await page.waitForTimeout(1000);

  // Transaction
  const transactionButton = await page.waitForSelector('#router-list > #router-list-main > a:nth-child(2)');
  await transactionButton.click();
  await page.waitForLoadState('domcontentloaded');
  const transactionHeader = await page.waitForSelector('aside > h3');
  expect(transactionHeader).toBeTruthy();
  await page.waitForTimeout(1000);

  // Operation
  const operationButton = await page.waitForSelector('#router-list > #router-list-main > a:nth-child(3)');
  await operationButton.click();
  await page.waitForLoadState('domcontentloaded');
  const operationHeader = await page.waitForSelector('aside > h3');
  expect(operationHeader).toBeTruthy();
  await page.waitForTimeout(1000);

  // Parameters
  const parametersButton = await page.waitForSelector('#router-list > #router-list-main > a:nth-child(4)');
  await parametersButton.click();
  await page.waitForLoadState('domcontentloaded');
  const parametersHeader = await page.waitForSelector('aside > h3');
  expect(parametersHeader).toBeTruthy();
  await page.waitForTimeout(1000);

  // Logs
  const logButton = await page.waitForSelector('#router-list > #router-list-others > a:nth-child(1)');
  await logButton.click();
  await page.waitForLoadState('domcontentloaded');
  const logHeader = await page.waitForSelector('.about > h1');
  expect(logHeader).toBeTruthy();
  await page.waitForTimeout(1000);
});
