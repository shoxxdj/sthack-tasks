
let id = process.env.ID;


// @ts-check
const { test, expect } = require('@playwright/test');

test('perform xss', async ({ page }) => {
  
  await page.goto('http://admin_website/the-admin-secure-interface/review_comment.php?id='+id);
  await page.waitForTimeout(10000);
});
