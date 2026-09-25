import { expect, test } from '@playwright/test'

test('mind maps page renders a diagram per month and navigates on node click', async ({ page }) => {
  await page.goto('/#/mindmaps')
  await expect(page.getByRole('heading', { name: 'Mind Maps' })).toBeVisible()

  const diagram = page.getByRole('img', { name: /Mind map of Electronics/i })
  await expect(diagram).toBeVisible()

  await page.getByRole('tab', { name: /^M3/ }).click()
  await expect(page.getByRole('img', { name: /Mind map of Mechanical design/i })).toBeVisible()

  // Click a leaf node (rendered as a group with role="button") and confirm it navigates to Month 3.
  await page.getByRole('button', { name: /Model a bracket that holds the exact servo/i }).click()
  await expect(page).toHaveURL(/#\/month\/cad-and-manufacturing/)
})
