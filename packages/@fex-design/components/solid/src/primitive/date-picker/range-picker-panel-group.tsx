import { usePickerAppearance } from './appearance-context'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { getVisibleRangePanelViewDates } from '@fex-design/core/date-picker/panel'
import { datePickerPanelsClassName } from '@fex-design/components-styles/date-picker'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { cn } from '@fex-design/utils'
import { createMemo, For, splitProps, type JSX, type ParentProps } from 'solid-js'
import { useRangePickerContext } from './context'
import { RangePickerPanel } from './range-picker-panel'

export interface RangePickerPanelGroupProps extends ParentProps<
  JSX.HTMLAttributes<HTMLDivElement>
> {
  panelCount?: 1 | 2
}

export function RangePickerPanelGroup(props: RangePickerPanelGroupProps) {
  const [local, rest] = splitProps(props, ['class', 'style', 'children', 'panelCount', 'onMouseLeave'])
  const context = useRangePickerContext('RangePickerPanelGroup')
  const appearance = usePickerAppearance()
  const visibleDates = createMemo(() => getVisibleRangePanelViewDates(context.viewDate(), context.panel(), local.panelCount))
  return (
    <div
      {...rest}
      style={mergeStyle(appearance().styles?.panelGroup, local.style)}
      role={rest.role ?? "group"}
      data-slot="range-picker-panel-group"
      class={cn(datePickerPanelsClassName, appearance().classNames?.panelGroup, local.class)}
      onMouseLeave={(event) => {
        callEventHandler(local.onMouseLeave, event)
        if (!event.defaultPrevented) context.setHoverValue(null)
      }}
    >
      {local.children === undefined ? (
        <For each={visibleDates()}>{(date) => <RangePickerPanel panelViewDate={date} />}</For>
      ) : local.children}
    </div>
  )
}
