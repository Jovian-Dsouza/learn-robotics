import { describe, expect, it } from 'vitest'
import { buildScrollUrl } from './scrollTarget'

describe('buildScrollUrl', () => {
  it('links to the plain month page when there is no target', () => {
    expect(buildScrollUrl('electronics-and-tools')).toBe('/month/electronics-and-tools')
  })

  it('appends a scrollTo query param when a target id is given', () => {
    expect(buildScrollUrl('electronics-and-tools', 'm1.electronics.practice')).toBe(
      '/month/electronics-and-tools?scrollTo=m1.electronics.practice',
    )
  })

  it('URL-encodes the target id', () => {
    expect(buildScrollUrl('month-1', 'id with spaces')).toBe('/month/month-1?scrollTo=id%20with%20spaces')
  })
})
