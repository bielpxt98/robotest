import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://coletapurm23.streamlit.app';

function getSitePassword(): string | undefined {
  if (process.env.SITE_PASS) {
    return process.env.SITE_PASS;
  }

  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    return undefined;
  }

  const envFile = fs.readFileSync(envPath, 'utf8');
  const sitePassLine = envFile
    .split(/\r?\n/)
    .find((line) => /^\s*SITE_PASS\s*=/.test(line));

  if (!sitePassLine) {
    return undefined;
  }

  return sitePassLine
    .replace(/^\s*SITE_PASS\s*=\s*/, '')
    .replace(/^['"]|['"]$/g, '')
    .trim();
}

test('realiza login administrativo no Streamlit', async ({ page }) => {
  const sitePassword = getSitePassword();

  if (!sitePassword) {
    throw new Error('Defina a variável SITE_PASS no arquivo .env antes de executar o teste.');
  }

  await page.goto(SITE_URL);
  await page.waitForTimeout(20_000);
  await page.screenshot({ path: 'antes-login.png', fullPage: true });

  await page.locator('[data-testid="stSidebar"] button').first().click();

  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();

  await modal.locator('input[type="password"]').fill(sitePassword);
  await modal.getByRole('button', { name: 'Entrar', exact: true }).click();

  await expect(modal).toBeHidden();
});
