import { expect, test } from '@playwright/test'

test.describe('3D scenes', () => {
  test('Home renders the hero scene (or its fallback) without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto('/')
    // Either the WebGL canvas or the static fallback should appear — never neither.
    await expect(page.locator('canvas, [aria-hidden="true"] svg').first()).toBeVisible({ timeout: 5000 })
    expect(errors).toEqual([])
  })

  test('a Month page renders its icon scene (or fallback) without console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/#/month/electronics-and-tools')
    await expect(page.locator('canvas, [aria-hidden="true"] svg').first()).toBeVisible({ timeout: 5000 })
    expect(errors).toEqual([])
  })

  test('prefers-reduced-motion shows the static fallback instead of a WebGL canvas', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.locator('canvas')).toHaveCount(0)
    // The fallback's original glyph (not a canvas) should still be visible in its place.
    await expect(page.locator('svg[aria-hidden="true"]').first()).toBeVisible()
  })
})
