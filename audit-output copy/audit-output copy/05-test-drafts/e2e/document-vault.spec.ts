import { expect, test } from '@playwright/test';

test('dummy file stays local until explicit cloud consent', async ({ page }) => {
  await page.goto('/vault');
  await page.getByRole('button', { name: /upload|add document/i }).click();
  await page.setInputFiles('input[type=file]', { name: 'dummy-document.pdf', mimeType: 'application/pdf', buffer: Buffer.from('Synthetic dummy document') });
  await expect(page.getByText(/local|device/i)).toBeVisible();
  await expect(page.getByText(/uploaded to google drive/i)).toHaveCount(0);
});
