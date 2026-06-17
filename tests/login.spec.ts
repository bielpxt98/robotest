import { expect, test } from '@playwright/test';

test('realiza login administrativo no Streamlit', async ({ page }) => {
  const siteUrl = process.env.SITE_URL ?? 'https://coletapurm23.streamlit.app';
  const sitePass = process.env.SITE_PASS;

  if (!sitePass) {
    throw new Error('Defina a variável de ambiente SITE_PASS antes de executar o teste.');
  }

  await page.goto(siteUrl);

  await expect(page.getByText('Controle Operacional')).toBeVisible();

  await page.getByRole('button', { name: 'Entrar como administrador' }).click();

  await expect(page.getByText('Acesso administrativo')).toBeVisible();

  await page.getByLabel('Senha administrativa').fill(sitePass);
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();

  await expect(page.getByText('Acesso administrativo')).toBeHidden();

  await page.screenshot({ path: 'screenshots/login-ok.png', fullPage: true });
});
