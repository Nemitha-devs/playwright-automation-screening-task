import { expect, test } from '@playwright/test';

test('home page title contains Playwright', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Playwright/);
});

test('Get started opens the introduction docs with Installation heading', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page).toHaveURL(/\/docs\/intro/);
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('searching the docs for locators shows a matching result', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /search/i }).click();
  const searchInput = page.getByRole('searchbox');
  await searchInput.fill('locators');

  await expect(page.getByRole('link', { name: /locator/i }).first()).toBeVisible();
});
