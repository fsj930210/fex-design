import { For, createRenderEffect, splitProps, type JSX } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import type { CalendarCell as Cell, CalendarValue } from '@fex-design/core/calendar'
import { calendarGridClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { callCalendarHandler } from './events'
import { useCalendarContext } from './calendar-context'
import { CalendarRow } from './calendar-row'
import { CalendarCell } from './calendar-cell'

export type CalendarGridProps<TValue extends CalendarValue = CalendarValue> =
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
    rowProps?: Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> | undefined
    children?: (cell: Cell<TValue>) => JSX.Element
  }

export function CalendarGrid<TValue extends CalendarValue = CalendarValue>(props: CalendarGridProps<TValue>) {
  const [local, rest] = splitProps(props, ['children', 'class', 'onMouseLeave', 'rowProps'])
  const context = useCalendarContext('CalendarGrid')
  const [view, setView] = createStore<{ rows: { key: string; cells: Cell[] }[] }>({ rows: [] })
  // Synchronize the render model with the external core grid. Reconcile preserves
  // keyed cell proxies so selection updates retain DOM, focus and custom content.
  createRenderEffect(() => {
    const rows = context.grid().rows.map(cells => ({
      key: cells.map(cell => cell.key).join('|'),
      // The render store owns these records; reconcile must not mutate core snapshots.
      cells: cells.map(cell => ({ ...cell, state: { ...cell.state } })),
    }))
    setView('rows', reconcile(rows, { key: 'key' }))
  })

  return (
    <div
      {...rest}
      role="grid"
      data-slot="calendar-grid"
      data-panel={context.state().panel}
      class={cn(calendarGridClassName, local.class)}
      onMouseLeave={event => {
        callCalendarHandler(local.onMouseLeave, event)
        if (!event.defaultPrevented) context.controller.clearHoveredRow()
      }}
    >
      <For each={view.rows}>{row => (
        <CalendarRow {...local.rowProps}>
          <For each={row.cells}>{cell => local.children
            ? local.children(cell as Cell<TValue>)
            : <CalendarCell cell={cell} />
          }</For>
        </CalendarRow>
      )}</For>
    </div>
  )
}
