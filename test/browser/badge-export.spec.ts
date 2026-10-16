import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { expect, test, type Page } from '@playwright/test'

async function openCompletedBadge(page: Page) {
  await page.goto('/')
  await page.getByRole('checkbox', { name: 'I confirm that I am 18 or older.' }).check()
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.getByRole('checkbox', { name: 'I understand how this prototype handles my choices.' }).check()
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.getByRole('button', { name: 'Challenges' }).click()
  await page.getByRole('button', { name: 'Explore challenge' }).first().click()
  await page.getByRole('button', { name: 'Start solo' }).click()
  for (let activity = 0; activity < 7; activity += 1) {
    await page.getByRole('button', { name: 'Complete activity' }).click()
  }
  await page.getByRole('button', { name: 'Preview share badge' }).click()
}

async function mockNativeShare(page: Page, behavior: 'resolve' | 'cancel' | 'fail') {
  await page.addInitScript((shareBehavior) => {
    Object.defineProperty(navigator, 'canShare', {
      configurable: true,
      value: () => true,
    })
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: async () => {
        if (shareBehavior === 'resolve') return
        const error = new Error(shareBehavior === 'cancel' ? 'cancelled' : 'share failed')
        error.name = shareBehavior === 'cancel' ? 'AbortError' : 'NotAllowedError'
        throw error
      },
    })
  }, behavior)
}

test('share cancellation announces politely and keeps the selected badge available', async ({ page }) => {
  await mockNativeShare(page, 'cancel')
  await openCompletedBadge(page)
  const cinematicOption = page.getByRole('button', { name: /Premium and cinematic/ })
  await cinematicOption.click()

  const exportButton = page.getByRole('button', { name: 'Share or download image' })
  await exportButton.click()

  await expect(page.getByRole('status')).toContainText('Sharing cancelled. Your badge is still available.')
  await expect(page.getByRole('alert')).toHaveCount(0)
  await expect(exportButton).toBeEnabled()
  await expect(cinematicOption).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('img', { name: /Intentional Moments/ })).toBeVisible()
  await expect(page.getByRole('button', { name: '← Back to achievement' })).toBeVisible()
})

test('native share success reports only that the sheet closed', async ({ page }) => {
  await mockNativeShare(page, 'resolve')
  await openCompletedBadge(page)
  await page.getByRole('button', { name: 'Share or download image' }).click()

  await expect(page.getByRole('status')).toContainText(
    'The share sheet closed. This app cannot confirm whether another app shared the image.',
  )
  await expect(page.getByRole('status')).not.toContainText(/posted|delivered|shared successfully/i)
  await expect(page.getByRole('alert')).toHaveCount(0)
})

test('native share failure announces an error without stale success feedback', async ({ page }) => {
  await mockNativeShare(page, 'resolve')
  await openCompletedBadge(page)
  await page.getByRole('button', { name: 'Share or download image' }).click()
  await expect(page.getByRole('status')).toContainText('The share sheet closed.')

  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: async () => {
        const error = new Error('Sharing is unavailable.')
        error.name = 'NotAllowedError'
        throw error
      },
    })
  })
  await page.getByRole('button', { name: 'Share or download image' }).click()

  await expect(page.getByRole('alert')).toHaveText('Sharing is unavailable.')
  await expect(page.getByRole('status')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Share or download image' })).toBeEnabled()
})

test('download fallback creates a nonempty decodable PNG with expected dimensions', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'canShare', {
      configurable: true,
      value: () => false,
    })
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: undefined,
    })
  })
  await openCompletedBadge(page)

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Share or download image' }).click()
  const download = await downloadPromise
  const path = await download.path()
  assert.ok(path, 'the browser should provide a downloaded file')
  const imageBytes = await readFile(path)
  assert.ok(imageBytes.byteLength > 0, 'the downloaded image should not be empty')
  expect(download.suggestedFilename()).toBe('gme2-challenge-badge.png')

  const dimensions = await page.evaluate(async (base64) => {
    const image = new Image()
    image.src = `data:image/png;base64,${base64}`
    await image.decode()
    return { width: image.naturalWidth, height: image.naturalHeight }
  }, imageBytes.toString('base64'))
  expect(dimensions).toEqual({ width: 1080, height: 1350 })
  await expect(page.getByRole('status')).toContainText('Badge image downloaded.')
  await expect(page.getByRole('alert')).toHaveCount(0)
})

test('image-generation failure announces an error without download success feedback', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'canShare', {
      configurable: true,
      value: () => false,
    })
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: undefined,
    })
    HTMLCanvasElement.prototype.toBlob = function (callback) {
      callback(null)
    }
  })
  await openCompletedBadge(page)
  await page.getByRole('button', { name: 'Share or download image' }).click()

  await expect(page.getByRole('alert')).toHaveText('The badge image could not be created.')
  await expect(page.getByRole('status')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Share or download image' })).toBeEnabled()
})
