import type { CalendarValue } from '@fex-design/core/calendar'
import { Index, splitProps, type Accessor, type JSX } from 'solid-js'
import { useCalendarContext } from './calendar-context'
import { CalendarCell, type CalendarCellModel } from './calendar-cell'

export interface CalendarGridProps<TValue extends CalendarValue = CalendarValue> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  cellClass?: string | undefined
  children?: ((cell: CalendarCellModel<TValue>) => JSX.Element) | undefined
}

export function CalendarGrid<TValue extends CalendarValue = CalendarValue>(
  props: CalendarGridProps<TValue>,
) {
  const [local, rest] = splitProps(props, ['children', 'cellClass'])
  const context = useCalendarContext('CalendarGrid')

  return (
    <div
      {...rest}
      data-slot="calendar-grid"
      data-panel={context.panel()}
      onMouseLeave={(event) => {
        if (typeof rest.onMouseLeave === 'function') rest.onMouseLeave(event)
        if (!event.defaultPrevented) context.clearHoveredRow()
      }}
    >
      <Index each={context.grid().rows}>
        {(row) => (
          <div data-slot="calendar-row">
            <Index each={row()}>
              {(cell) =>
                local.children ? (
                  local.children(cell() as CalendarCellModel<TValue>)
                ) : (
                  <CalendarCell
                    cell={cell as Accessor<CalendarCellModel<TValue>>}
                    class={local.cellClass}
                  />
                )
              }
            </Index>
          </div>
        )}
      </Index>
    </div>
  )
}
