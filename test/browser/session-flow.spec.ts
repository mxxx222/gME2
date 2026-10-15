import { expect, test } from '@playwright/test'

async function enterSolo(page: import('@playwright/test').Page) {
  await page.goto('/')
  await page.getByRole('checkbox', { name: 'I confirm that I am 18 or older.' }).check()
  await page.getByRole('button', { name: 'Skip to solo' }).click()
}

test('selected activity configures an isolated, pausable session', async ({ page }) => {
  const apiRequests: string[] = []
  page.on('request', (request) => {
    if (new URL(request.url()).pathname.startsWith('/api/')) apiRequests.push(request.url())
  })
  await page.clock.install()
  await enterSolo(page)

  const slowerPace = page.getByRole('button', { name: /Find a slower pace/ })
  await slowerPace.focus()
  await page.keyboard.press('Enter')
  await expect(slowerPace).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Review session' }).click()
  await expect(page.getByRole('heading', { name: 'Find a slower pace' })).toBeFocused()
  await expect(page.getByText('Timer length').locator('..')).toContainText('5 minutes')
  await page.getByRole('button', { name: 'Start session' }).click()

  const timer = page.locator('.solo-countdown')
  await expect(timer).toHaveAttribute('aria-label', 'Time remaining 05:00')
  await expect(page.getByRole('progressbar', { name: 'Session progress' })).toHaveAttribute('aria-valuemax', '300')
  await expect(page.getByRole('heading', { name: 'Find a slower pace' })).toBeFocused()

  await page.getByRole('button', { name: 'Pause', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Resume', exact: true })).toBeVisible()
  const pausedTime = await timer.getAttribute('aria-label')
  await page.clock.fastForward(2_000)
  await expect(timer).toHaveAttribute('aria-label', pausedTime ?? '')

  await page.getByRole('button', { name: 'Pause and return to setup' }).click()
  await page.getByRole('button', { name: /A moment to check in/ }).click()
  await expect(page.getByRole('status').getByText('Find a slower pace')).toBeVisible()
  await page.getByRole('button', { name: 'Return to paused session' }).click()
  await expect(page.getByRole('heading', { name: 'Find a slower pace' })).toBeFocused()
  await expect(page.getByRole('button', { name: 'Resume', exact: true })).toBeVisible()
  await expect(page.getByRole('progressbar', { name: 'Session progress' })).toHaveAttribute('aria-valuemax', '300')

  await page.getByRole('button', { name: 'Resume', exact: true }).click()
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(page.getByRole('button', { name: 'Resume', exact: true })).toBeVisible()
  const hiddenPausedTime = await timer.getAttribute('aria-label')
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await page.clock.fastForward(2_000)
  await expect(timer).toHaveAttribute('aria-label', hiddenPausedTime ?? '')
  await expect(page.getByRole('button', { name: 'Resume', exact: true })).toBeVisible()

  await page.getByRole('button', { name: 'Resume', exact: true }).click()
  await page.getByRole('button', { name: 'Pause and return to setup' }).click()
  await page.getByRole('button', { name: 'Discard session' }).click()
  await expect(page.getByRole('heading', { name: 'Choose a moment.' })).toBeVisible()
  await page.getByRole('button', { name: 'Review session' }).click()
  await expect(page.getByRole('heading', { name: 'A moment to check in' })).toBeVisible()
  await expect(page.getByText('Timer length').locator('..')).toContainText('2 minutes')
  await page.getByRole('button', { name: 'Start session' }).click()
  await expect(page.getByRole('progressbar', { name: 'Session progress' })).toHaveAttribute('aria-valuemax', '120')
  await page.getByRole('button', { name: 'Stop session' }).click()
  await expect(page.getByRole('heading', { name: 'Choose a moment.' })).toBeVisible()
  await page.getByRole('button', { name: 'Review session' }).click()
  await expect(page.getByRole('heading', { name: 'A moment to check in' })).toBeVisible()
  await page.getByRole('button', { name: 'Start session' }).click()
  await expect(page.getByRole('progressbar', { name: 'Session progress' })).toHaveAttribute('aria-valuemax', '120')
  await page.clock.fastForward(120_000)
  await expect(page.getByRole('status').filter({ hasText: 'SESSION COMPLETE' })).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Thank yourself for showing up.' })).toBeFocused()

  await page.getByRole('button', { name: 'Start again' }).click()
  await expect(page.locator('.solo-countdown')).toHaveAttribute('aria-label', 'Time remaining 02:00')
  await expect(apiRequests).toEqual([])
  await expect(page.evaluate(() => Object.keys(localStorage))).resolves.toEqual([])
})

test('challenge progress remains anonymous, in-memory, and clears on reload', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('checkbox', { name: 'I confirm that I am 18 or older.' }).check()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('checkbox', { name: 'I understand how this prototype handles my choices.' }).check()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Challenges' }).click()
  await page.getByRole('button', { name: 'Explore challenge' }).first().click()
  await page.getByRole('button', { name: 'Start solo' }).click()
  await page.getByRole('button', { name: 'Complete activity' }).click()
  await expect(page.getByRole('progressbar', { name: '1 of 7 activities complete' })).toBeVisible()
  await expect(page.evaluate(() => Object.keys(localStorage))).resolves.toEqual([])

  await page.reload()
  await expect(page.getByRole('heading', { name: /Try a small moment/ })).toBeVisible()
  await page.getByRole('checkbox', { name: 'I confirm that I am 18 or older.' }).check()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('checkbox', { name: 'I understand how this prototype handles my choices.' }).check()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Challenges' }).click()
  await expect(page.getByRole('progressbar', { name: '1 of 7 activities complete' })).toHaveCount(0)
  await expect(page.evaluate(() => Object.keys(localStorage))).resolves.toEqual([])
})

test('session configuration and controls fit narrow phone and desktop widths', async ({ page }) => {
  await enterSolo(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const reviewButton = page.getByRole('button', { name: 'Review session' })
  const transitionDuration = await reviewButton.evaluate((element) => {
    const durations = getComputedStyle(element).transitionDuration.split(',').map((value) => Number.parseFloat(value))
    return Math.max(...durations)
  })
  expect(transitionDuration).toBeLessThanOrEqual(0.00001)

  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    await expect(reviewButton).toBeVisible()
  }
})
