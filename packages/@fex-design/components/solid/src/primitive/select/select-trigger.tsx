import { SelectValue, type SelectValueProps } from './select-value'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import type { SelectOption } from '@fex-design/core/select/types'
import {
  selectClearClassName,
  selectClearableIndicatorClassName,
  selectIndicatorClassName,
  selectInputClassName,
  selectSuffixClassName,
  selectTriggerClassName,
  selectValueContainerClassName,
} from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { For, Show, splitProps, type JSX, type ParentProps } from 'solid-js'
import { ChevronDownIcon } from '@fex-design/solid/icons/chevron'
import { CircleXIcon } from '@fex-design/solid/icons/circle-x'
import { LoadingIcon } from '@fex-design/solid/icons/loading'
import { PopoverTrigger } from '../popover'
import { useSelect } from './select-context'

export interface SelectTriggerProps extends ParentProps<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, 'prefix'>
> {
  valueProps?: Omit<SelectValueProps, 'children'> | undefined
  inputProps?: SelectInputProps
  prefix?: JSX.Element
  suffix?: JSX.Element
  placeholder?: string
  maxTagCount?: number
  tagRender?: (
    option: SelectOption,
    context: { remove: () => void; disabled: boolean },
  ) => JSX.Element
}
export interface SelectInputProps extends Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'prefix'
> {
  prefix?: JSX.Element
  suffix?: JSX.Element
  clear?: JSX.Element
  classNames?: import('@fex-design/core/input/types').InputClassNames
  styles?: import('@fex-design/core/input/types').InputStyles<JSX.CSSProperties>
}
export function SelectTrigger(props: SelectTriggerProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'valueProps',
    'inputProps',
    'children',
    'prefix',
    'suffix',
    'placeholder',
    'maxTagCount',
    'tagRender',
    'onKeyDown',
    'aria-invalid',
    'data-warning',
  ])
  const select = useSelect('SelectTrigger')
  const placeholder = () => local.placeholder ?? '请选择'
  const inputAttributes = () => {
    const { prefix, suffix, clear, classNames, styles, style, ...attrs } = local.inputProps ?? {}
    return attrs
  }
  function keydown(event: KeyboardEvent) {
    callEventHandler(local.onKeyDown, event)
    if (event.defaultPrevented) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      select.controller.open()
      select.controller.moveActive(event.key === 'ArrowDown' ? 1 : -1)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      select.controller.moveActiveTo(event.key === 'Home' ? 'first' : 'last')
    } else if (event.key === 'Enter') {
      event.preventDefault()
      select.controller.selectActive()
    } else if (event.key === 'Backspace' && !select.snapshot().searchValue)
      select.controller.removeLastSelected()
    else if (event.key === 'Escape') select.controller.close()
  }
  return (
    <PopoverTrigger>
      {(trigger) => (
        <div
          {...rest}
          {...(trigger.props as unknown as JSX.HTMLAttributes<HTMLDivElement>)}
          ref={trigger.ref as never}
          role={undefined}
          data-slot="select-trigger"
          data-disabled={select.disabled() || undefined}
          data-clearable={
            select.clearable() && select.selectedOptions().length ? 'true' : undefined
          }
          data-warning={local.dataWarning ?? select.dataWarning()}
          class={cn(selectTriggerClassName(), local.inputProps?.classNames?.root, local.class)}
          style={{ ...local.inputProps?.styles?.root, ...local.inputProps?.style }}
          onKeyDown={keydown}
        >
          {local.inputProps?.prefix ?? local.prefix}
          <div class={cn(selectValueContainerClassName, local.inputProps?.classNames?.control)}>
            <SelectValue
              {...local.valueProps}
              maxTagCount={local.maxTagCount ?? local.valueProps?.maxTagCount}
              placeholder={select.showSearch() ? undefined : placeholder()}
              tagRender={local.tagRender ?? local.valueProps?.tagRender}
            >
              {local.children}
            </SelectValue>
            <input
              {...inputAttributes()}
              role="combobox"
              aria-invalid={local['aria-invalid'] ?? select.ariaInvalid()}
              aria-expanded={select.snapshot().open}
              aria-controls={select.listId}
              disabled={select.disabled()}
              readOnly={!select.showSearch()}
              placeholder={
                select.showSearch() && !select.selectedOptions().length ? placeholder() : undefined
              }
              value={select.snapshot().searchValue}
              class={cn(
                selectInputClassName,
                local.inputProps?.class,
                local.inputProps?.classNames?.control,
                !select.showSearch() && 'absolute size-px min-w-0 overflow-hidden opacity-0',
              )}
              onFocus={() => select.controller.open()}
              onPointerDown={(event) => {
                select.controller.open()
              }}
              onClick={(event) => {
                event.stopPropagation()
              }}
              onInput={(event) => {
                select.controller.setSearchValue(event.currentTarget.value)
                select.controller.open()
              }}
            />
          </div>
          <span
            data-slot="select-suffix"
            class={cn(selectSuffixClassName, local.inputProps?.classNames?.suffix)}
          >
            <Show when={!select.loading()} fallback={<LoadingIcon class="animate-spin" />}>
              <span
                class={
                  select.clearable() && select.selectedOptions().length
                    ? selectClearableIndicatorClassName
                    : undefined
                }
              >
                {local.inputProps?.suffix ?? local.suffix ?? (
                  <span
                    data-state={select.snapshot().open ? 'open' : 'closed'}
                    class={selectIndicatorClassName}
                  >
                    <ChevronDownIcon />
                  </span>
                )}
              </span>
              <Show when={select.clearable() && select.selectedOptions().length}>
                <button
                  type="button"
                  aria-label="Clear selection"
                  class={cn(selectClearClassName, local.inputProps?.classNames?.clear)}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={(event) => {
                    event.stopPropagation()
                    select.controller.clear()
                  }}
                >
                  {local.inputProps?.clear ?? <CircleXIcon />}
                </button>
              </Show>
            </Show>
          </span>
        </div>
      )}
    </PopoverTrigger>
  )
}
