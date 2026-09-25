import type { ReactNode } from 'react'

export interface DataTableColumn<T> {
  header: string
  cell: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  keyFor: (row: T, index: number) => string
}

export function DataTable<T>({ columns, rows, keyFor }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <table className="w-full border-collapse font-mono text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-line bg-bg-raised text-left text-ink-muted">
            {columns.map((col) => (
              <th key={col.header} className="px-3 py-2 font-medium uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={keyFor(row, i)} className="border-b border-line/60 last:border-0">
              {columns.map((col) => (
                <td key={col.header} className={col.className ?? 'px-3 py-2 text-ink'}>
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
