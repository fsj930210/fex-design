import type { CalendarCell, CalendarDate, CalendarGrid } from './types'

export function getCalendarFocusDate(grid: CalendarGrid, cell: CalendarCell, key: string): CalendarDate | null {
  const columns = grid.rows[0]?.length ?? 7
  const offsets: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -columns, ArrowDown: columns, Home: -cell.columnIndex, End: columns - cell.columnIndex - 1 }
  const offset = offsets[key]
  if (offset === undefined) return null
  if (cell.panel === 'date') return cell.date.add({ days: offset })
  if (cell.panel === 'month') return cell.date.add({ months: offset })
  if (cell.panel === 'quarter') return cell.date.add({ months: offset * 3 })
  return cell.date.add({ years: offset })
}

/** DOM scheduling only; the controller has already chosen the target cell. */
export function focusCalendarCell(element: HTMLElement, key: string) {
  const root = element.closest('[data-slot="calendar-root"]')
  if (!root) return
  requestAnimationFrame(() => {
    if (!root.isConnected) return
    root.querySelector<HTMLButtonElement>(`[data-slot="calendar-cell-trigger"][data-key="${CSS.escape(key)}"]`)?.focus()
  })
}
