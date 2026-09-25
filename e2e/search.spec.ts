import { expect, test } from '@playwright/test'

test('opening the command palette, searching, and jumping to a result', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /search the roadmap/i }).click()
  await expect(page.getByRole('dialog', { name: /search the roadmap/i })).toBeVisible()

  await page.getByRole('textbox', { name: /^search$/i }).fill('falstad')
  const result = page.getByRole('button', { name: /Falstad Circuit Simulator/i })
  await expect(result).toBeVisible()
  await result.click()

  await expect(page).toHaveURL(/#\/month\/electronics-and-tools/)
  await expect(page.locator('#m1\\.electronics\\.falstad')).toBeVisible()
})

test('Escape closes the command palette', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /search the roadmap/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
})
