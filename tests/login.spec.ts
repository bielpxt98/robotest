import { expect, test } from '@playwright/test';

test('realiza login administrativo no Streamlit', async ({ page }) => {
  const siteUrl = process.env.SITE_URL;
  const sitePass = process.env.SITE_PASS;

  if (!siteUrl) {
    throw new Error('Defina a variável de ambiente SITE_URL antes de executar o teste.');
  }

  if (!sitePass) {
    throw new Error('Defina a variável de ambiente SITE_PASS antes de executar o teste.');
  }

  await page.goto(siteUrl);

  await expect(page.getByText('Controle Operacional')).toBeVisible();

  await page.getByRole('button', { name: 'Entrar como administrador' }).click();

  const modal = page.getByRole('dialog').filter({ hasText: 'Acesso administrativo' });
  await expect(modal).toBeVisible();

  await modal.locator('input[type="password"]').fill(sitePass);
  await modal.getByRole('button', { name: 'Entrar', exact: true }).click();

  await expect(modal).toBeHidden();

  await page.screenshot({ path: 'screenshots/login-ok.png', fullPage: true });
});
