import { groupSelectOptions } from '@fex-design/core/select/filter-options'
import { getSelectVirtualRange } from '@fex-design/core/select/virtual'
import type {
  SelectFilterOption,
  SelectOption,
  SelectVirtualOptions,
} from '@fex-design/core/select/types'
import {
  selectContentClassName,
  selectEmptyClassName,
  selectGroupLabelClassName,
  selectListClassName,
  selectLoadingClassName,
  selectOptionClassName,
  selectOptionIndicatorClassName,
  selectOptionLabelClassName,
} from '@fex-design/components-styles/select'
import { cn } from '@fex-design/utils'
import { createMemo, createSignal, For, Show, type JSX, type ParentProps } from 'solid-js'
import { CheckIcon } from '@fex-design/solid/icons/check'
import { PopoverContent, PopoverPortal } from '../popover/popover'
import { useSelect } from './select-context'

export function SelectContent(
  props: ParentProps<{
    class?: string
    popupRender?: (menu: JSX.Element, context: { close: () => void }) => JSX.Element
    optionRender?: (option: SelectOption, state: { selected: boolean; active: boolean; disabled: boolean }) => JSX.Element
    emptyContent?: JSX.Element
    loadingContent?: JSX.Element
  }>,
) {
  const select = useSelect('SelectContent')
  const menu = () => props.children ?? <SelectList optionRender={props.optionRender} emptyContent={props.emptyContent} loadingContent={props.loadingContent} />
  return (
    <PopoverPortal>
      <PopoverContent
        class={cn(selectContentClassName, props.class)}
        style="width: var(--floating-reference-width); max-width: var(--floating-available-width);"
      >
        {props.popupRender ? props.popupRender(menu(), { close: select.controller.close }) : menu()}
      </PopoverContent>
    </PopoverPortal>
  )
}
function SelectList(
  props: ParentProps<{
    class?: string
    optionRender?: (
      option: SelectOption,
      state: { selected: boolean; active: boolean; disabled: boolean },
    ) => JSX.Element
    emptyContent?: JSX.Element
    loadingContent?: JSX.Element
  }>,
) {
  const select = useSelect('SelectList')
  const [viewport, setViewport] = createSignal({ scrollTop: 0, height: 320 })
  const range = createMemo(() =>
    select.virtual()
      ? getSelectVirtualRange(
          select.visibleOptions().length,
          viewport().scrollTop,
          viewport().height,
          select.virtual()!,
        )
      : undefined,
  )
  const render = (option: SelectOption) => (
    <SelectOptionView option={option} render={props.optionRender} />
  )
  return (
    <div
      id={select.listId}
      role="listbox"
      aria-multiselectable={select.multiple() || undefined}
      class={cn(selectListClassName, props.class)}
      onScroll={(event) =>
        setViewport({
          scrollTop: event.currentTarget.scrollTop,
          height: event.currentTarget.clientHeight,
        })
      }
    >
      <Show when={!select.loading()} fallback={<SelectLoading>{props.loadingContent}</SelectLoading>}>
      <Show when={select.visibleOptions().length} fallback={<SelectEmpty>{props.emptyContent}</SelectEmpty>}>
      <Show
        when={range()}
        fallback={
          <For each={groupSelectOptions(select.visibleOptions())}>
            {(group) => (
              <div role="group" aria-label={group.label}>
                {group.label && <div class={selectGroupLabelClassName}>{group.label}</div>}
                <For each={group.options}>{render}</For>
              </div>
            )}
          </For>
        }
      >
        {(current) => (
          <div style={{ height: `${current().totalSize}px`, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '0', top: `${current().offset}px` }}>
              <For each={select.visibleOptions().slice(current().start, current().end)}>
                {render}
              </For>
            </div>
          </div>
        )}
      </Show>
      </Show>
      </Show>
    </div>
  )
}
function SelectOptionView(props: {
  option: SelectOption
  render?:
    | ((
        option: SelectOption,
        state: { selected: boolean; active: boolean; disabled: boolean },
      ) => JSX.Element)
    | undefined
}) {
  const select = useSelect('SelectOption')
  const state = () => ({
    selected: select.controller.selection.isSelected(props.option.value),
    active: select.snapshot().activeValue === props.option.value,
    disabled:
      props.option.disabled === true || select.controller.selection.isDisabled(props.option.value),
  })
  return (
    <div
      id={`${select.listId}-${props.option.value}`}
      role="option"
      aria-selected={state().selected}
      aria-disabled={state().disabled || undefined}
      data-active={state().active || undefined}
      data-selected={state().selected || undefined}
      data-disabled={state().disabled || undefined}
      class={selectOptionClassName}
      onPointerMove={() => select.controller.setActiveValue(props.option.value, 'pointer')}
      onPointerDown={(event) => event.preventDefault()}
      onClick={() => !state().disabled && select.controller.selectValue(props.option.value)}
    >
      <span class={selectOptionLabelClassName}>
        {props.render?.(props.option, state()) ?? props.option.label}
      </span>
      <span class={selectOptionIndicatorClassName}>
        <CheckIcon />
      </span>
    </div>
  )
}
export function SelectItem(props: ParentProps<{ item: SelectOption; class?: string }>) {
  const select = useSelect('SelectItem')
  const state = () => ({
    selected: select.controller.selection.isSelected(props.item.value),
    active: select.snapshot().activeValue === props.item.value,
    disabled:
      props.item.disabled === true || select.controller.selection.isDisabled(props.item.value),
  })
  return (
    <div
      role="option"
      aria-selected={state().selected}
      aria-disabled={state().disabled || undefined}
      data-active={state().active || undefined}
      data-selected={state().selected || undefined}
      data-disabled={state().disabled || undefined}
      class={cn(selectOptionClassName, props.class)}
      onPointerMove={() => select.controller.setActiveValue(props.item.value, 'pointer')}
      onPointerDown={(event) => event.preventDefault()}
      onClick={() => !state().disabled && select.controller.selectValue(props.item.value)}
    >
      <span class={selectOptionLabelClassName}>{props.children ?? props.item.label}</span>
      <span class={selectOptionIndicatorClassName}><CheckIcon /></span>
    </div>
  )
}
export function SelectGroup(props: ParentProps<{ label?: string }>) {
  return <div role="group" aria-label={props.label}>{props.children}</div>
}
export function SelectLabel(props: ParentProps<{ class?: string }>) {
  return <div class={cn(selectGroupLabelClassName, props.class)}>{props.children}</div>
}
export function SelectSeparator(props: { class?: string }) {
  return <div role="separator" class={cn('my-1 h-px bg-border', props.class)} />
}
function SelectEmpty(props: ParentProps<{ class?: string }>) {
  return <div class={cn(selectEmptyClassName, props.class)}>{props.children ?? 'No options'}</div>
}
function SelectLoading(props: ParentProps<{ class?: string }>) {
  return <div class={cn(selectLoadingClassName, props.class)}>{props.children ?? 'Loading...'}</div>
}
export { useSelect } from './select-context'
export type { SelectFilterOption, SelectOption, SelectVirtualOptions }
