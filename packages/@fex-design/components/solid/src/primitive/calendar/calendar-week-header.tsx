import { For, createMemo, splitProps, type JSX } from 'solid-js'
import {
  getCalendarWeekHeaderItems,
  calendarDefaultWeekLabels,
  type CalendarWeekHeaderItem,
} from '@fex-design/core/calendar'
import { calendarWeekHeaderClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { useCalendarContext } from './calendar-context'

export type CalendarWeekHeaderProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> & {
  labels?: readonly string[]
  children?: (item: CalendarWeekHeaderItem) => JSX.Element
}

export function CalendarWeekHeader(props: CalendarWeekHeaderProps) {
  const [local, rest] = splitProps(props, ['labels', 'class', 'children'])
  const context = useCalendarContext('CalendarWeekHeader')
  const items = createMemo(() =>
    getCalendarWeekHeaderItems(
      local.labels ?? calendarDefaultWeekLabels,
      context.state().weekStartsOn,
    ),
  )
  return (
    <div
      {...rest}
      data-slot="calendar-week-header"
      class={cn(calendarWeekHeaderClassName, local.class)}
    >
      <For each={items().map((item) => item.index)}>
        {(index) => {
          // Match the other renderers' stable weekday position while labels stay reactive.
          const item: CalendarWeekHeaderItem = {
            index,
            get label() {
              return items()[index]!.label
            },
          }
          return (
            <div data-slot="calendar-week-head">
              {local.children ? local.children(item) : item.label}
            </div>
          )
        }}
      </For>
    </div>
  )
}
