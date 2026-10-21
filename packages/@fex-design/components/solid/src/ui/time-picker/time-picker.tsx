import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import type { TimePickerClassNames, TimePickerStyles } from '@fex-design/core/time-picker/types'
import { cn } from '@fex-design/utils'
import { analyzeTimeFormat } from '@fex-design/core/date/utils'
import { createMemo, For, splitProps, Switch, Match, type ComponentProps, type JSX } from 'solid-js'
import {
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerPortal,
  TimePickerContent,
  TimePickerPanel,
  TimePickerHourColumn,
  TimePickerMinuteColumn,
  TimePickerSecondColumn,
  TimePickerPeriodColumn,
  type TimePickerRootProps,
  type TimePickerTriggerProps,
} from '@fex-design/solid/primitive/time-picker'

export interface TimePickerProps extends Omit<TimePickerRootProps, 'children'> {
  hourColumnProps?: Omit<ComponentProps<typeof TimePickerHourColumn>, 'children'> | undefined
  minuteColumnProps?: Omit<ComponentProps<typeof TimePickerMinuteColumn>, 'children'> | undefined
  secondColumnProps?: Omit<ComponentProps<typeof TimePickerSecondColumn>, 'children'> | undefined
  periodColumnProps?: Omit<ComponentProps<typeof TimePickerPeriodColumn>, 'children'> | undefined
  panelProps?: Omit<ComponentProps<typeof TimePickerPanel>, 'children'> | undefined
  contentProps?: Omit<ComponentProps<typeof TimePickerContent>, 'children'> | undefined
  classNames?: TimePickerClassNames | undefined
  styles?: TimePickerStyles<JSX.CSSProperties> | undefined
  class?: string | undefined
  style?: TimePickerTriggerProps['style'] | undefined
  size?: TimePickerTriggerProps['size'] | undefined
  variant?: TimePickerTriggerProps['variant'] | undefined
  placeholder?: string | undefined
  allowClear?: boolean | undefined
  invalid?: boolean | undefined
  'aria-invalid'?: string | boolean | undefined
  'data-warning'?: string | undefined
  prefix?: JSX.Element | undefined
  suffix?: JSX.Element | undefined
  inputProps?: TimePickerTriggerProps['inputProps'] | undefined
  step?:
    | { hour?: number | undefined; minute?: number | undefined; second?: number | undefined }
    | undefined
  triggerRender?: TimePickerTriggerProps['children'] | undefined
  panelRender?: ((panel: JSX.Element) => JSX.Element) | undefined
  footer?: JSX.Element | undefined
}
export function TimePicker(props: TimePickerProps) {
  const [local, options] = splitProps(props, [
    'panelProps',
    'hourColumnProps',
    'minuteColumnProps',
    'secondColumnProps',
    'periodColumnProps',
    'contentProps',
    'classNames',
    'styles',
    'class',
    'style',
    'size',
    'variant',
    'placeholder',
    'allowClear',
    'invalid',
    'aria-invalid',
    'data-warning',
    'prefix',
    'suffix',
    'inputProps',
    'step',
    'triggerRender',
    'panelRender',
    'footer',
  ])
  const columns = createMemo(
    () =>
      analyzeTimeFormat(
        options.format ?? (options.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'),
        options.use12Hours,
      ).columns,
  )
  function panel() {
    return (
      <TimePickerPanel
        {...local.panelProps}
        class={cn(local.classNames?.panel, local.panelProps?.class)}
        style={mergeStyle(local.styles?.panel, local.panelProps?.style)}
      >
        <For each={columns()}>
          {(column) => (
            <Switch>
              <Match when={column.unit === 'hour'}>
                <TimePickerHourColumn
                  class={local.classNames?.column}
                  style={local.styles?.column}
                  itemClassName={local.classNames?.item}
                  itemStyle={local.styles?.item}
                  selectedItemClassName={local.classNames?.selectedItem}
                  selectedItemStyle={local.styles?.selectedItem}
                  step={local.step?.hour}
                  {...local.hourColumnProps}
                />
              </Match>
              <Match when={column.unit === 'minute'}>
                <TimePickerMinuteColumn
                  class={local.classNames?.column}
                  style={local.styles?.column}
                  itemClassName={local.classNames?.item}
                  itemStyle={local.styles?.item}
                  selectedItemClassName={local.classNames?.selectedItem}
                  selectedItemStyle={local.styles?.selectedItem}
                  step={local.step?.minute}
                  {...local.minuteColumnProps}
                />
              </Match>
              <Match when={column.unit === 'second'}>
                <TimePickerSecondColumn
                  class={local.classNames?.column}
                  style={local.styles?.column}
                  itemClassName={local.classNames?.item}
                  itemStyle={local.styles?.item}
                  selectedItemClassName={local.classNames?.selectedItem}
                  selectedItemStyle={local.styles?.selectedItem}
                  step={local.step?.second}
                  {...local.secondColumnProps}
                />
              </Match>
              <Match when={column.unit === 'period'}>
                <TimePickerPeriodColumn
                  class={local.classNames?.column}
                  style={local.styles?.column}
                  itemClassName={local.classNames?.item}
                  itemStyle={local.styles?.item}
                  selectedItemClassName={local.classNames?.selectedItem}
                  selectedItemStyle={local.styles?.selectedItem}
                  {...local.periodColumnProps}
                />
              </Match>
            </Switch>
          )}
        </For>
      </TimePickerPanel>
    )
  }
  return (
    <TimePickerRoot {...options}>
      <TimePickerTrigger
        class={cn(local.classNames?.root, local.class)}
        style={mergeStyle(local.styles?.root, local.style)}
        size={local.size}
        variant={local.variant}
        placeholder={local.placeholder}
        allowClear={local.allowClear}
        invalid={local.invalid}
        aria-invalid={local['aria-invalid']}
        data-warning={local.dataWarning}
        prefix={local.prefix}
        suffix={local.suffix}
        inputProps={{
          ...local.inputProps,
          class: cn(local.classNames?.input, local.inputProps?.class),
          style: mergeStyle(local.styles?.input, local.inputProps?.style),
        }}
      >
        {local.triggerRender}
      </TimePickerTrigger>
      <TimePickerPortal>
        <TimePickerContent
          {...local.contentProps}
          class={cn(local.classNames?.popup, local.contentProps?.class)}
          style={mergeStyle(local.styles?.popup, local.contentProps?.style)}
        >
          {local.panelRender ? local.panelRender(panel()) : panel()}
          {local.footer}
        </TimePickerContent>
      </TimePickerPortal>
    </TimePickerRoot>
  )
}
