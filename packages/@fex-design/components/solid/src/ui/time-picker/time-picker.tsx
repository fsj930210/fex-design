import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import { createMemo, For, splitProps, Switch, Match, type JSX } from 'solid-js'
import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn, type TimePickerRootProps, type TimePickerTriggerProps } from '@fex-design/solid/primitive/time-picker'

export interface TimePickerProps extends Omit<TimePickerRootProps, 'children'> {
  class?: string | undefined
  style?: TimePickerTriggerProps['style'] | undefined
  size?: TimePickerTriggerProps['size'] | undefined
  variant?: TimePickerTriggerProps['variant'] | undefined
  placeholder?: string | undefined
  allowClear?: boolean | undefined
  invalid?: boolean | undefined
  prefix?: JSX.Element | undefined
  suffix?: JSX.Element | undefined
  inputProps?: TimePickerTriggerProps['inputProps'] | undefined
  step?: { hour?: number | undefined; minute?: number | undefined; second?: number | undefined } | undefined
  triggerRender?: TimePickerTriggerProps['children'] | undefined
  panelRender?: ((panel: JSX.Element) => JSX.Element) | undefined
  footer?: JSX.Element | undefined
}
export function TimePicker(props: TimePickerProps) {
  const [local, options] = splitProps(props, ['class', 'style', 'size', 'variant', 'placeholder', 'allowClear', 'invalid', 'prefix', 'suffix', 'inputProps', 'step', 'triggerRender', 'panelRender', 'footer'])
  const columns = createMemo(() => analyzeTimeFormat(options.format ?? (options.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'), options.use12Hours).columns)
  function panel() { return <TimePickerPanel><For each={columns()}>{column => <Switch>
    <Match when={column.unit === 'hour'}><TimePickerHourColumn step={local.step?.hour} /></Match>
    <Match when={column.unit === 'minute'}><TimePickerMinuteColumn step={local.step?.minute} /></Match>
    <Match when={column.unit === 'second'}><TimePickerSecondColumn step={local.step?.second} /></Match>
    <Match when={column.unit === 'period'}><TimePickerPeriodColumn /></Match>
  </Switch>}</For></TimePickerPanel> }
  return <TimePickerRoot {...options}>
    <TimePickerTrigger class={local.class} style={local.style} size={local.size} variant={local.variant} placeholder={local.placeholder} allowClear={local.allowClear} invalid={local.invalid} prefix={local.prefix} suffix={local.suffix} inputProps={local.inputProps}>{local.triggerRender}</TimePickerTrigger>
    <TimePickerPortal><TimePickerContent>{local.panelRender ? local.panelRender(panel()) : panel()}{local.footer}</TimePickerContent></TimePickerPortal>
  </TimePickerRoot>
}
