import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.localStorage.clear())
})

test('checking items persists across reload and updates the dashboard', async ({ page }) => {
  await page.goto('/#/month/microcontrollers-motors-sensors')
  await expect(page.getByRole('heading', { name: /Microcontrollers, motors and sensors/i })).toBeVisible()

  const arduinoFocus = page.getByText('Interrupts, and why polling a button in a loop eventually fails you')
  await arduinoFocus.click()

  const practiceTask = page.getByText(/Build a reaction-timer game/i)
  await practiceTask.click()

  const buildLog = page.getByPlaceholder(/gripper kept slipping/i)
  await buildLog.fill('LED timing drifted at first — switched from delay() to millis(), fixed it.')
  await page.waitForTimeout(700)

  await page.reload()
  await expect(arduinoFocus).toBeVisible()

  await page.goto('/#/dashboard')
  await expect(page.getByText(/Month 2/).first()).toBeVisible()
})

test('export, reset, and import round-trip progress', async ({ page }) => {
  await page.goto('/#/month/microcontrollers-motors-sensors')
  await page.getByText('Interrupts, and why polling a button in a loop eventually fails you').click()

  await page.goto('/#/dashboard')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: /export progress/i }).click(),
  ])
  const exportPath = await download.path()
  expect(exportPath).toBeTruthy()

  await page.getByRole('button', { name: /reset all progress/i }).click()
  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: /reset all progress/i }).click()

  await expect(page.getByText('0 / ').first()).toBeVisible()

  const fs = await import('node:fs/promises')
  const contents = await fs.readFile(exportPath as string, 'utf-8')
  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.getByRole('button', { name: /^import progress$/i }).click()
  const chooser = await fileChooserPromise
  const tmpPath = `${exportPath}-reimport.json`
  await fs.writeFile(tmpPath, contents)
  await chooser.setFiles(tmpPath)

  await expect(page.getByText(/progress imported/i)).toBeVisible()
})

test('importing a malformed file shows an error and does not change state', async ({ page }) => {
  await page.goto('/#/dashboard')

  const fs = await import('node:fs/promises')
  const os = await import('node:os')
  const path = await import('node:path')
  const badPath = path.join(os.tmpdir(), 'bad-progress.json')
  await fs.writeFile(badPath, 'not valid json at all')

  const fileChooserPromise = page.waitForEvent('filechooser')
  await page.getByRole('button', { name: /^import progress$/i }).click()
  const chooser = await fileChooserPromise
  await chooser.setFiles(badPath)

  await expect(page.getByText(/not valid json/i)).toBeVisible()
})
