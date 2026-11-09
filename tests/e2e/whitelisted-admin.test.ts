import { expect, test } from '@playwright/test';

test.describe('BAC-7 Admin Access', () => {
  test('whitelisted admin with a session can open /usuarios', async ({ page }) => {
    await page.goto('/usuarios');

    await expect(page).toHaveURL(/\/usuarios$/);
    await expect(page.getByRole('heading', { name: 'Usuarios' })).toBeVisible();
  });
});



