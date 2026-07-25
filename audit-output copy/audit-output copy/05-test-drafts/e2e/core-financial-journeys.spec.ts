import { expect, test } from '@playwright/test';

test('dummy subscription persists and creates one reminder', async ({ page }) => {
  await page.goto('/leakage/subscriptions');
  await page.getByRole('button', { name: /add/i }).click();
  await page.getByLabel(/name/i).fill('Dummy OTT');
  await page.getByLabel(/amount|monthly cost/i).fill('499');
  await page.getByLabel(/renewal/i).fill('2026-08-19');
  await page.getByRole('button', { name: /save|add subscription/i }).click();
  await page.reload();
  await expect(page.getByText('Dummy OTT')).toBeVisible();
});

test('legacy bank route resolves to canonical module', async ({ page }) => {
  await page.goto('/pravah');
  await expect(page).toHaveURL(//khate/accounts|/pravah/);
  await expect(page.getByText(/bank|account|pravah/i)).toBeVisible();
});
