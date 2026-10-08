import type { CascaderNode } from '@fex-design/core/cascader/types'
import {
  cascaderColumnClassName,
  cascaderColumnViewportClassName,
  cascaderContentClassName,
  cascaderEmptyClassName,
  cascaderLoadingClassName,
  cascaderOptionClassName,
  cascaderOptionIconClassName,
  cascaderOptionLabelClassName,
  cascaderPanelClassName,
  cascaderPanelHeight,
} from '@fex-design/components-styles/cascader'
import {
  checkboxCheckIconClassName,
  checkboxControlClassName,
  checkboxIndicatorClassName,
  checkboxMinusIconClassName,
} from '@fex-design/components-styles/checkbox'
import { cn } from '@fex-design/utils'
import { For, Show, splitProps, type JSX, type ParentProps } from 'solid-js'
import { CheckIcon } from '@fex-design/solid/icons/check'
import { ChevronRightIcon } from '@fex-design/solid/icons/chevron'
import { LoadingIcon } from '@fex-design/solid/icons/loading'
import { MinusIcon } from '@fex-design/solid/icons/minus'
import { CheckboxControl, CheckboxIndicator, CheckboxRoot } from '../checkbox'
import { PopoverContent, PopoverPortal } from '../popover'
import { ScrollbarBar, ScrollbarRoot, ScrollbarViewport } from '../scrollbar'
import { useCascader } from './cascader-context'

export function CascaderContent(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <PopoverPortal>
      <PopoverContent {...rest} class={cn(cascaderContentClassName, local.class)}>
        {local.children ?? <CascaderPanel />}
      </PopoverContent>
    </PopoverPortal>
  )
}

export function CascaderOption(props: { node: CascaderNode; label?: string }) {
  const cascader = useCascader('CascaderOption')
  const state = () => ({
    active: cascader.snapshot().activePath.includes(props.node.key),
    selected: cascader.snapshot().selectedPathKeys.includes(props.node.key),
    checked: cascader.snapshot().checkedKeys.includes(props.node.key),
    indeterminate: cascader.snapshot().indeterminateKeys.includes(props.node.key),
    loading: cascader.snapshot().loadingKeys.includes(props.node.key),
  })
  return (
    <div
      role="option"
      aria-selected={state().selected}
      aria-disabled={props.node.disabled || undefined}
      data-active={state().active || undefined}
      data-selected={state().selected || undefined}
      data-disabled={props.node.disabled || undefined}
      class={cascaderOptionClassName}
      onPointerEnter={() => {
        if (cascader.expandTrigger() === 'hover' && !props.node.leaf)
          cascader.controller.expand(props.node.key)
      }}
      onClick={() => cascader.controller.select(props.node.key)}
    >
      <Show when={cascader.multiple()}>
        <CheckboxRoot disabled={props.node.disabled}>
          <CheckboxControl
            checked={state().checked}
            indeterminate={state().indeterminate}
            class={checkboxControlClassName}
            onClick={(event) => event.stopPropagation()}
            onChange={() => cascader.controller.toggleCheck(props.node.key)}
          />
          <CheckboxIndicator class={checkboxIndicatorClassName}>
            <CheckIcon class={checkboxCheckIconClassName} />
            <MinusIcon class={checkboxMinusIconClassName} />
          </CheckboxIndicator>
        </CheckboxRoot>
      </Show>
      <span class={cascaderOptionLabelClassName}>{props.label ?? props.node.label}</span>
      <span class={cascaderOptionIconClassName}>
        <Show when={!state().loading} fallback={<LoadingIcon class="animate-spin" />}>
          <Show
            when={!props.node.leaf}
            fallback={
              <Show when={state().selected}>
                <CheckIcon />
              </Show>
            }
          >
            <ChevronRightIcon />
          </Show>
        </Show>
      </span>
    </div>
  )
}

export function CascaderPanel() {
  const cascader = useCascader('CascaderPanel')
  const results = () => {
    cascader.snapshot()
    return cascader.controller.getSearchResults()
  }
  const columns = () => {
    cascader.snapshot()
    return cascader.controller.getColumns()
  }
  const itemCount = () =>
    cascader.snapshot().searchValue && cascader.showSearch()
      ? cascader.loading()
        ? 0
        : results().length
      : Math.max(0, ...columns().map((column) => column.nodes.length))
  const columnCount = () =>
    cascader.snapshot().searchValue && cascader.showSearch() ? 1 : Math.max(1, columns().length)
  return (
    <div
      class={cascaderPanelClassName}
      style={{
        '--cascader-column-count': columnCount(),
        '--cascader-panel-height': cascaderPanelHeight(itemCount()),
      }}
    >
      <Show
        when={cascader.snapshot().searchValue && cascader.showSearch()}
        fallback={
          <For each={columns()}>
            {(column, index) => (
              <CascaderColumn aria-label={`Level ${index() + 1}`}>
                <For each={column.nodes}>{(node) => <CascaderOption node={node} />}</For>
              </CascaderColumn>
            )}
          </For>
        }
      >
        <CascaderColumn class="w-full min-w-full border-r-0">
          <Show when={!cascader.loading()} fallback={<CascaderLoading />}>
            <Show when={results().length} fallback={<CascaderEmpty />}>
              <For each={results()}>
                {(path) => (
                  <CascaderOption
                    node={path.at(-1)!}
                    label={path.map((node) => node.label).join(' / ')}
                  />
                )}
              </For>
            </Show>
          </Show>
        </CascaderColumn>
      </Show>
    </div>
  )
}

export function CascaderColumn(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} role="listbox" class={cn(cascaderColumnClassName, local.class)}>
      <ScrollbarRoot class="h-full">
        <ScrollbarViewport
          overflowX="hidden"
          overflowY="auto"
          class={cascaderColumnViewportClassName}
        >
          {local.children}
        </ScrollbarViewport>
        <ScrollbarBar axis="y" />
      </ScrollbarRoot>
    </div>
  )
}

export function CascaderEmpty(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} class={cn(cascaderEmptyClassName, local.class)}>
      {local.children ?? 'No options'}
    </div>
  )
}

export function CascaderLoading(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} class={cn(cascaderLoadingClassName, local.class)}>
      <LoadingIcon class="animate-spin" />
      {local.children ?? 'Loading...'}
    </div>
  )
}
