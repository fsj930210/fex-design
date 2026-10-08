import type { CascaderNode } from '@fex-design/core/cascader/types'
import {
  cascaderClearClassName,
  cascaderIndicatorClassName,
  cascaderInputClassName,
  cascaderPlaceholderClassName,
  cascaderSuffixClassName,
  cascaderTriggerClassName,
  cascaderValueClassName,
  cascaderValueContainerClassName,
} from '@fex-design/components-styles/cascader'
import { cn } from '@fex-design/utils'
import { For, Show, splitProps, type JSX, type ParentProps } from 'solid-js'
import { ChevronDownIcon } from '@fex-design/solid/icons/chevron'
import { XIcon } from '@fex-design/solid/icons/x'
import { LoadingIcon } from '@fex-design/solid/icons/loading'
import { Button } from '../button'
import { PopoverTrigger } from '../popover'
import { Tag } from '../tag'
import { useCascader } from './cascader-context'

export interface CascaderTriggerProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {}

export function CascaderTrigger(props: CascaderTriggerProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'onKeyDown'])
  const cascader = useCascader('CascaderTrigger')
  const keydown = (event: KeyboardEvent) => {
    if (typeof local.onKeyDown === 'function') local.onKeyDown(event as never)
    if (event.defaultPrevented) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp')
      cascader.controller.moveActive(event.key === 'ArrowDown' ? 1 : -1)
    else if (event.key === 'ArrowRight') cascader.controller.moveToChild()
    else if (event.key === 'ArrowLeft') cascader.controller.moveToParent()
    else if (event.key === 'Home' || event.key === 'End')
      cascader.controller.moveToBoundary(event.key === 'Home' ? 'first' : 'last')
    else if (event.key === 'Enter' || event.key === ' ') cascader.controller.selectActive()
    else if (event.key === 'Escape') cascader.controller.close()
    else return
    event.preventDefault()
    cascader.controller.open()
  }
  return (
    <PopoverTrigger>
      {(trigger) => (
        <div
          {...rest}
          {...(trigger.props as JSX.HTMLAttributes<HTMLDivElement>)}
          ref={trigger.ref as never}
          role={undefined}
          data-disabled={cascader.disabled() || undefined}
          data-status={cascader.status()}
          class={cn(cascaderTriggerClassName(), local.class)}
          onKeyDown={keydown}
        >
          <div class={cascaderValueContainerClassName}>
            {local.children ?? <CascaderValue />}
            <input
              role="combobox"
              aria-expanded={cascader.snapshot().open}
              disabled={cascader.disabled()}
              readOnly={!cascader.showSearch()}
              value={cascader.snapshot().searchValue}
              placeholder={
                cascader.showSearch() && !cascader.selectedPaths().length
                  ? cascader.placeholder()
                  : undefined
              }
              class={cascaderInputClassName}
              onFocus={() => {
                if (!cascader.showSearch()) cascader.controller.open()
              }}
              onClick={(event) => event.stopPropagation()}
              onInput={(event) => {
                const keyword = event.currentTarget.value
                cascader.controller.setSearchValue(keyword)
                keyword.trim() ? cascader.controller.open() : cascader.controller.close()
              }}
            />
          </div>
          <span class={cascaderSuffixClassName}>
            <Show when={!cascader.loading()} fallback={<LoadingIcon class="animate-spin" />}>
              <Show
                when={cascader.clearable() && cascader.selectedPaths().length}
                fallback={
                  <span
                    data-state={cascader.snapshot().open ? 'open' : 'closed'}
                    class={cascaderIndicatorClassName}
                  >
                    <ChevronDownIcon />
                  </span>
                }
              >
                <Button
                  class={cascaderClearClassName}
                  onClick={(event) => {
                    event.stopPropagation()
                    cascader.controller.clear()
                  }}
                >
                  <XIcon />
                </Button>
              </Show>
            </Show>
          </span>
        </div>
      )}
    </PopoverTrigger>
  )
}

export function CascaderValue() {
  const cascader = useCascader('CascaderValue')
  const display = (path: readonly CascaderNode[]) =>
    cascader.displayRender?.(
      path.map((node) => node.label),
      path.map((node) => node.option),
    ) ?? path.map((node) => node.label).join(' / ')
  return (
    <Show
      when={cascader.selectedPaths().length}
      fallback={
        <Show when={!cascader.snapshot().searchValue && !cascader.showSearch()}>
          <span class={cascaderPlaceholderClassName}>{cascader.placeholder()}</span>
        </Show>
      }
    >
      <Show
        when={cascader.multiple()}
        fallback={<div class={cascaderValueClassName}>{display(cascader.selectedPaths()[0]!)}</div>}
      >
        <For each={cascader.selectedPaths()}>
          {(path) => (
            <Tag
              size="sm"
              closable
              onClose={(event) => {
                event.stopPropagation()
                cascader.controller.removePath(path.at(-1)!.key)
              }}
            >
              {display(path)}
            </Tag>
          )}
        </For>
      </Show>
    </Show>
  )
}
