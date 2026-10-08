import type { TimePickerOption, TimePeriod } from '@fex-design/core/time-picker/types'
import {
  timePickerColumnClassName,
  timePickerColumnItemClassName,
  timePickerColumnSpacerClassName,
  timePickerColumnViewportClassName,
} from '@fex-design/components-styles/time-picker'
import { cn } from '@fex-design/utils'
import { createEffect, For, splitProps, type JSX } from 'solid-js'
import { ScrollbarBar, ScrollbarRoot, ScrollbarViewport } from '../scrollbar'
import { useTimePickerContext } from './time-picker-context'

export type ColumnValue = number | TimePeriod

export interface TimePickerColumnProps<TValue extends ColumnValue> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'onSelect' | 'children'
> {
  options: readonly TimePickerOption<TValue>[]
  selectedValue?: TValue | undefined
  disabled?: boolean | undefined
  onSelect(value: TValue): void
}

export function TimePickerColumn<TValue extends ColumnValue>(props: TimePickerColumnProps<TValue>) {
  const [local, rest] = splitProps(props, [
    'options',
    'selectedValue',
    'disabled',
    'onSelect',
    'class',
    'onKeyDown',
  ])
  const context = useTimePickerContext('TimePickerColumn')
  let listElement: HTMLDivElement | undefined = undefined
  const itemElements = new Map<TValue, HTMLButtonElement>()
  let activeValue: TValue | undefined
  const isDisabled = () => context.disabled() || Boolean(local.disabled)

  createEffect(() => {
    const selected = local.selectedValue
    const request = context.snapshot().scrollRequest
    queueMicrotask(() => {
      const item = selected === undefined ? undefined : itemElements.get(selected)
      if (item && listElement)
        listElement.scrollTo({ top: item.offsetTop, behavior: request?.behavior ?? 'auto' })
    })
  })

  function move(direction: 1 | -1) {
    const enabled = local.options.filter((option) => !option.disabled)
    const current = enabled.findIndex((option) => option.value === activeValue)
    const next = enabled[Math.min(enabled.length - 1, Math.max(0, current + direction))]
    if (!next) return
    activeValue = next.value
    itemElements.get(next.value)?.focus()
  }

  return (
    <ScrollbarRoot
      data-slot="time-picker-column"
      data-disabled={isDisabled() ? 'true' : undefined}
      class={cn(timePickerColumnClassName, local.class)}
      disabled={isDisabled()}
    >
      <ScrollbarViewport
        {...rest}
        ref={(element) => {
          listElement = element
        }}
        role="listbox"
        tabIndex={isDisabled() ? -1 : 0}
        aria-disabled={isDisabled() || undefined}
        overflowX="hidden"
        class={timePickerColumnViewportClassName}
        onKeyDown={(event) => {
          if (typeof local.onKeyDown === 'function') local.onKeyDown(event)
          if (event.defaultPrevented || isDisabled() || context.readOnly()) return
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            move(event.key === 'ArrowDown' ? 1 : -1)
          }
        }}
      >
        <For each={local.options}>
          {(item) => {
            const selected = () => Object.is(item.value, local.selectedValue)
            return (
              <button
                ref={(element) => itemElements.set(item.value, element)}
                type="button"
                role="option"
                tabIndex={-1}
                disabled={isDisabled() || item.disabled}
                aria-selected={selected()}
                data-selected={selected() ? 'true' : undefined}
                data-disabled={item.disabled ? 'true' : undefined}
                class={timePickerColumnItemClassName}
                onFocus={() => {
                  activeValue = item.value
                }}
                onClick={() => {
                  if (isDisabled() || context.readOnly() || item.disabled) return
                  activeValue = item.value
                  local.onSelect(item.value)
                  const itemElement = itemElements.get(item.value)
                  if (listElement && itemElement)
                    listElement.scrollTo({ top: itemElement.offsetTop, behavior: 'smooth' })
                }}
              >
                {item.label}
              </button>
            )
          }}
        </For>
        <div aria-hidden="true" class={timePickerColumnSpacerClassName} />
      </ScrollbarViewport>
      <ScrollbarBar axis="y" />
    </ScrollbarRoot>
  )
}
