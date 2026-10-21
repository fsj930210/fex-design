import { TimePickerColumnItem } from './time-picker-column-item'
import { getNextTimeOption } from '@fex-design/core/time-picker/navigation'
import { getTimePickerScrollBehavior } from '@fex-design/core/time-picker/scroll'
import {
  timePickerColumnClassName,
  timePickerColumnSpacerClassName,
  timePickerColumnViewportClassName,
} from '@fex-design/components-styles/time-picker'
import type { TimePeriod, TimePickerOption } from '@fex-design/core/time-picker/types'
import { cn } from '@fex-design/utils'
import { useRef, useState, type ComponentProps, type KeyboardEvent, type ReactNode } from 'react'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { useTimePickerContext } from './time-picker-context'
import {
  ScrollbarBar,
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarTrack,
  ScrollbarThumb,
} from '../scrollbar'

type ColumnValue = number | TimePeriod

export interface TimePickerColumnItemRenderState<TValue extends ColumnValue> {
  item: TimePickerOption<TValue>
  selected: boolean
  active: boolean
}

export interface TimePickerColumnProps<TValue extends ColumnValue> extends Omit<
  ComponentProps<'div'>,
  'children' | 'onSelect'
> {
  itemClassName?: string | undefined
  itemStyle?: ComponentProps<'button'>['style'] | undefined
  selectedItemClassName?: string | undefined
  selectedItemStyle?: ComponentProps<'button'>['style'] | undefined
  scrollbarProps?:
    | Omit<ComponentProps<typeof ScrollbarRoot>, 'children' | 'disabled' | 'overflow'>
    | undefined
  options: readonly TimePickerOption<TValue>[]
  selectedValue?: TValue | undefined
  disabled?: boolean | undefined
  onSelect(value: TValue): void
  itemRender?: ((state: TimePickerColumnItemRenderState<TValue>) => ReactNode) | undefined
}

export function TimePickerColumn<TValue extends ColumnValue>({
  options,
  selectedValue,
  disabled = false,
  onSelect,
  scrollbarProps,
  itemRender,
  itemClassName,
  itemStyle,
  selectedItemClassName,
  selectedItemStyle,
  className,
  style,
  onKeyDown,
  ref,
  ...props
}: TimePickerColumnProps<TValue>) {
  const { snapshot, disabled: rootDisabled, readOnly } = useTimePickerContext('TimePickerColumn')
  const listRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef(new Map<ColumnValue, HTMLButtonElement>())
  const activeValueRef = useRef<TValue | undefined>(undefined)
  const [activeValue, setActiveValue] = useState<TValue | undefined>()
  const resolvedDisabled = rootDisabled || disabled

  function scrollSelected(behavior: ScrollBehavior) {
    if (selectedValue === undefined) return
    const list = listRef.current
    const item = itemRefs.current.get(selectedValue)
    if (!list || !item) return
    list.scrollTo({ top: item.offsetTop, behavior: getTimePickerScrollBehavior(behavior) })
  }

  // DOM scrolling is an external system. Layout timing ensures items exist before
  // the selected value is aligned without feeding scrollTop back into component state.
  useIsomorphicLayoutEffect(() => {
    scrollSelected(snapshot.scrollRequest?.behavior ?? 'auto')
  }, [selectedValue, snapshot.scrollRequest?.id])

  function moveActive(direction: 1 | -1) {
    const next = getNextTimeOption(options, activeValueRef.current, selectedValue, direction)
    if (next === undefined) return
    activeValueRef.current = next
    setActiveValue(next)
    itemRefs.current.get(next)?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    scrollbarProps?.onKeyDown?.(event)
    onKeyDown?.(event)
    if (event.defaultPrevented || resolvedDisabled || readOnly) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      moveActive(event.key === 'ArrowDown' ? 1 : -1)
    }
  }

  return (
    <ScrollbarRoot
      {...props}
      {...scrollbarProps}
      ref={ref}
      role="listbox"
      tabIndex={resolvedDisabled ? -1 : 0}
      aria-disabled={resolvedDisabled || undefined}
      onKeyDown={handleKeyDown}
      data-slot="time-picker-column"
      data-disabled={resolvedDisabled ? 'true' : undefined}
      className={cn(timePickerColumnClassName, className, scrollbarProps?.className)}
      style={{ ...style, ...scrollbarProps?.style }}
      disabled={resolvedDisabled}
    >
      <ScrollbarViewport
        ref={listRef}
        className={timePickerColumnViewportClassName}
        overflow={{ x: 'hidden', y: 'auto' }}
      >
        {options.map((item) => {
          const selected = Object.is(item.value, selectedValue)
          const itemProps: ComponentProps<'button'> & {
            'data-selected'?: string | undefined
            'data-disabled'?: string | undefined
            'data-active'?: string | undefined
          } = {
            ref: (element) => {
              if (element) itemRefs.current.set(item.value, element)
              else itemRefs.current.delete(item.value)
            },
            type: 'button',
            role: 'option',
            tabIndex: -1,
            disabled: resolvedDisabled || item.disabled,
            'aria-selected': selected,
            'data-selected': selected ? 'true' : undefined,
            'data-disabled': item.disabled ? 'true' : undefined,
            'data-active': Object.is(activeValue, item.value) ? 'true' : undefined,
            onFocus: () => {
              activeValueRef.current = item.value
              setActiveValue(item.value)
            },
            onClick: () => {
              if (resolvedDisabled || readOnly || item.disabled) return
              activeValueRef.current = item.value
              setActiveValue(item.value)
              onSelect(item.value)
            },
          }
          const state = { item, selected, active: Object.is(activeValue, item.value) }
          return (
            <TimePickerColumnItem
              key={String(item.value)}
              {...itemProps}
              className={cn(itemClassName, selected && selectedItemClassName)}
              style={{ ...itemStyle, ...(selected ? selectedItemStyle : undefined) }}
            >
              {itemRender ? itemRender(state) : item.label}
            </TimePickerColumnItem>
          )
        })}
        <div aria-hidden="true" className={timePickerColumnSpacerClassName} />
      </ScrollbarViewport>
      <ScrollbarBar axis="y">
        <ScrollbarTrack axis="y">
          <ScrollbarThumb axis="y" />
        </ScrollbarTrack>
      </ScrollbarBar>
    </ScrollbarRoot>
  )
}
