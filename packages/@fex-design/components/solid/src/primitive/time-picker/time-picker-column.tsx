import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { getNextTimeOption } from '@fex-design/core/time-picker/navigation'
import { getTimePickerScrollBehavior } from '@fex-design/core/time-picker/scroll'
import type { TimePickerOption, TimePeriod } from '@fex-design/core/time-picker/types'
import {
  timePickerColumnClassName,
  timePickerColumnItemClassName,
  timePickerColumnSpacerClassName,
  timePickerColumnViewportClassName,
} from '@fex-design/components-styles/time-picker'
import { cn } from '@fex-design/utils'
import {
  createEffect,
  createSignal,
  onCleanup,
  For,
  splitProps,
  type ComponentProps,
  type JSX,
} from 'solid-js'
import {
  ScrollbarBar,
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarTrack,
  ScrollbarThumb,
} from '../scrollbar'
import { useTimePickerContext } from './time-picker-context'

export type ColumnValue = number | TimePeriod

export interface TimePickerColumnProps<TValue extends ColumnValue> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'onSelect' | 'children'
> {
  itemClassName?: string | undefined
  itemStyle?: JSX.CSSProperties | undefined
  selectedItemClassName?: string | undefined
  selectedItemStyle?: JSX.CSSProperties | undefined
  scrollbarProps?:
    | Omit<ComponentProps<typeof ScrollbarRoot>, 'children' | 'disabled' | 'overflow'>
    | undefined
  options: readonly TimePickerOption<TValue>[]
  selectedValue?: TValue | undefined
  disabled?: boolean | undefined
  onSelect(value: TValue): void
  itemRender?:
    | ((state: {
        item: TimePickerOption<TValue>
        selected: boolean
        active: boolean
      }) => JSX.Element)
    | undefined
}

export function TimePickerColumn<TValue extends ColumnValue>(props: TimePickerColumnProps<TValue>) {
  const [local, rest] = splitProps(props, [
    'scrollbarProps',
    'options',
    'selectedValue',
    'disabled',
    'onSelect',
    'itemRender',
    'itemClassName',
    'itemStyle',
    'selectedItemClassName',
    'selectedItemStyle',
    'class',
    'onKeyDown',
  ])
  const context = useTimePickerContext('TimePickerColumn')
  let listElement: HTMLDivElement | undefined = undefined
  const itemElements = new Map<TValue, HTMLButtonElement>()
  const [activeValue, setActiveValue] = createSignal<TValue>()
  const isDisabled = () => context.disabled() || Boolean(local.disabled)

  // Selected values and explicit core requests synchronize the DOM scroll position.
  createEffect(() => {
    const selected = local.selectedValue
    const request = context.snapshot().scrollRequest
    queueMicrotask(() => {
      const item = selected === undefined ? undefined : itemElements.get(selected)
      if (item && listElement)
        listElement.scrollTo({
          top: item.offsetTop,
          behavior: getTimePickerScrollBehavior(request?.behavior ?? 'auto'),
        })
    })
  })

  function move(direction: 1 | -1) {
    const next = getNextTimeOption(local.options, activeValue(), local.selectedValue, direction)
    if (next === undefined) return
    setActiveValue(() => next)
    itemElements.get(next)?.focus()
  }

  function handleKeyDown(
    event: KeyboardEvent & { currentTarget: HTMLDivElement; target: Element },
  ) {
    callEventHandler(local.onKeyDown, event)
    if (event.defaultPrevented || isDisabled() || context.readOnly()) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      move(event.key === 'ArrowDown' ? 1 : -1)
    }
  }

  return (
    <ScrollbarRoot
      {...rest}
      {...local.scrollbarProps}
      role="listbox"
      tabIndex={isDisabled() ? -1 : 0}
      aria-disabled={isDisabled() || undefined}
      onKeyDown={handleKeyDown}
      data-slot="time-picker-column"
      data-disabled={isDisabled() ? 'true' : undefined}
      class={cn(timePickerColumnClassName, local.class, local.scrollbarProps?.class)}
      style={mergeStyle(rest.style, local.scrollbarProps?.style)}
      disabled={isDisabled()}
    >
      <ScrollbarViewport
        ref={(element) => {
          listElement = element
        }}
        overflow={{ x: 'hidden' }}
        class={timePickerColumnViewportClassName}
      >
        <For each={local.options}>
          {(item) => {
            let itemElement: HTMLButtonElement | undefined
            onCleanup(() => {
              if (itemElements.get(item.value) === itemElement) itemElements.delete(item.value)
            })
            const selected = () => Object.is(item.value, local.selectedValue)
            return (
              <button
                ref={(element) => {
                  itemElement = element
                  itemElements.set(item.value, element)
                }}
                type="button"
                role="option"
                tabIndex={-1}
                disabled={isDisabled() || item.disabled}
                aria-selected={selected()}
                data-selected={selected() ? 'true' : undefined}
                data-active={activeValue() === item.value ? 'true' : undefined}
                data-disabled={item.disabled ? 'true' : undefined}
                class={cn(
                  timePickerColumnItemClassName,
                  local.itemClassName,
                  Object.is(item.value, local.selectedValue) && local.selectedItemClassName,
                )}
                style={{
                  ...local.itemStyle,
                  ...(Object.is(item.value, local.selectedValue)
                    ? local.selectedItemStyle
                    : undefined),
                }}
                onFocus={() => {
                  setActiveValue(() => item.value)
                }}
                onClick={() => {
                  if (isDisabled() || context.readOnly() || item.disabled) return
                  setActiveValue(() => item.value)
                  local.onSelect(item.value)
                }}
              >
                {local.itemRender
                  ? local.itemRender({
                      item,
                      get selected() {
                        return selected()
                      },
                      get active() {
                        return activeValue() === item.value
                      },
                    })
                  : item.label}
              </button>
            )
          }}
        </For>
        <div aria-hidden="true" class={timePickerColumnSpacerClassName} />
      </ScrollbarViewport>
      <ScrollbarBar axis="y">
        <ScrollbarTrack axis="y">
          <ScrollbarThumb axis="y" />
        </ScrollbarTrack>
      </ScrollbarBar>
    </ScrollbarRoot>
  )
}
