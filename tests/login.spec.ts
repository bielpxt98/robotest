import { expect, test } from '@playwright/test';

const sitePassword = process.env.SITE_PASS;

test('login de administrador no Streamlit', async ({ page }) => {
  if (!sitePassword) {
    throw new Error('Defina a variável de ambiente SITE_PASS antes de executar o teste.');
  }

  await page.goto('/');

  await page.getByRole('button', { name: 'Entrar como administrador' }).click();

  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();

  await modal.locator('input[type="password"]').fill(sitePassword);
  await modal.getByRole('button', { name: 'Entrar', exact: true }).click();

  await expect(page.getByText(/Dashboard/i)).toBeVisible();

  await page.screenshot({ path: 'screenshots/login-ok.png', fullPage: true });
});
