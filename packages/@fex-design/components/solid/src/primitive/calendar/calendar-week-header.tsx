import { For, splitProps, type JSX } from 'solid-js'
import { useCalendarContext } from './calendar-context'

export interface CalendarWeekHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  labels?: readonly string[] | undefined
}

export function CalendarWeekHeader(props: CalendarWeekHeaderProps) {
  const [local, rest] = splitProps(props, ['labels'])
  const context = useCalendarContext('CalendarWeekHeader')
  const labels = () => local.labels ?? ['日', '一', '二', '三', '四', '五', '六']
  const orderedLabels = () =>
    labels().map((_, index) => labels()[(index + context.weekStartsOn()) % 7] ?? '')

  return (
    <div {...rest} data-slot="calendar-week-header">
      <For each={orderedLabels()}>
        {(label) => <div data-slot="calendar-week-head">{label}</div>}
      </For>
    </div>
  )
}
