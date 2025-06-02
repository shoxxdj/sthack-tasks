let id = process.env.ID;

// @ts-check
const { test, expect } = require('@playwright/test');

test.use({
  ignoreHTTPSErrors: true,
});

test('perform xss', async ({ page }) => {
    await page.goto('https://admin_website.local/admin/feedbacks/'+id);
  await page.waitForTimeout(10000);
});
