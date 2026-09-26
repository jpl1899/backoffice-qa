import { expect, test } from '@playwright/test';
import { login } from '../utils/login';

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

test.describe('BAC-7 Admin Access', () => {
  test('whitelisted admin lands on /usuarios after login', async ({ page }) => {
    if (!adminEmail || !adminPassword) {
      throw new Error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env — copy .env.example and fill them in.');
    }

    await login(page, adminEmail, adminPassword);

    await expect(page).toHaveURL(/\/usuarios$/);
    await expect(page.getByRole('heading', { name: 'Usuarios' })).toBeVisible();
  });
});


