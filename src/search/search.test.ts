import { describe, expect, it } from 'vitest'
import type { SearchItem } from './types'
import { groupByKind, searchItems } from './search'

function makeIndex(): SearchItem[] {
  return [
    { id: 'a', kind: 'month', title: 'Electronics', subtitle: 'the bench', url: '/month/a' },
    { id: 'b', kind: 'focus', title: 'Voltage dividers', subtitle: "Electronics · Ohm's law section", url: '/month/a?scrollTo=b' },
    { id: 'c', kind: 'resource', title: 'Falstad Circuit Simulator', subtitle: 'free online simulator', url: '/month/a?scrollTo=c' },
    { id: 'd', kind: 'milestone', title: 'Solder a joint', subtitle: 'Electronics · Milestone', url: '/month/a?scrollTo=d' },
  ]
}

describe('searchItems', () => {
  it('returns nothing for an empty or whitespace-only query', () => {
    expect(searchItems(makeIndex(), '')).toEqual([])
    expect(searchItems(makeIndex(), '   ')).toEqual([])
  })

  it('matches case-insensitively on title', () => {
    const results = searchItems(makeIndex(), 'ELECTRONICS')
    expect(results.some((r) => r.id === 'a')).toBe(true)
  })

  it('matches on subtitle when the title does not contain the query', () => {
    const results = searchItems(makeIndex(), 'ohm')
    expect(results.map((r) => r.id)).toContain('b')
  })

  it('ranks an exact title match above a mere substring match', () => {
    const index: SearchItem[] = [
      { id: 'exact', kind: 'month', title: 'Electronics', subtitle: '', url: '/x' },
      { id: 'partial', kind: 'month', title: 'Basic Electronics 101', subtitle: '', url: '/y' },
    ]
    const results = searchItems(index, 'electronics')
    expect(results[0].id).toBe('exact')
  })

  it('ranks a title-prefix match above a title-substring match', () => {
    const index: SearchItem[] = [
      { id: 'prefix', kind: 'month', title: 'Voltage dividers', subtitle: '', url: '/x' },
      { id: 'substring', kind: 'month', title: 'The Voltage Divider Trick', subtitle: '', url: '/y' },
    ]
    const results = searchItems(index, 'voltage divid')
    expect(results[0].id).toBe('prefix')
  })

  it('respects the result limit', () => {
    const bigIndex: SearchItem[] = Array.from({ length: 50 }, (_, i) => ({
      id: `item-${i}`,
      kind: 'focus',
      title: `Servo ${i}`,
      subtitle: '',
      url: '/x',
    }))
    expect(searchItems(bigIndex, 'servo', 5)).toHaveLength(5)
  })

  it('finds nothing for a query with no match', () => {
    expect(searchItems(makeIndex(), 'quantum entanglement')).toEqual([])
  })
})

describe('groupByKind', () => {
  it('groups results by kind, dropping empty groups, in a fixed order', () => {
    const groups = groupByKind(makeIndex())
    expect(groups.map((g) => g.kind)).toEqual(['month', 'focus', 'milestone', 'resource'])
    expect(groups.find((g) => g.kind === 'month')?.items).toHaveLength(1)
  })

  it('returns an empty array for an empty input', () => {
    expect(groupByKind([])).toEqual([])
  })
})
