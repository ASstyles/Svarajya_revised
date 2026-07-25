import { expect, test } from '@playwright/test';

test('dummy password recovery lands on reset form', async ({ page }) => {
  // Provider/email delivery must be mocked or use an isolated test sink.
  await page.goto('/reset-password#access_token=dummy-access&type=recovery&refresh_token=dummy-refresh');
  await expect(page).toHaveURL(//reset-password/);
  await expect(page.getByRole('button', { name: /update|set.*password/i })).toBeVisible();
});

test('profile edit does not replay unrelated onboarding', async ({ page }) => {
  // TODO(WD): authenticate with storageState generated from dummy account fixture.
  await page.goto('/foundation');
  await page.getByRole('button', { name: /edit/i }).click();
  await expect(page).not.toHaveURL(//onboarding/contact-info/);
});
