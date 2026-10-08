import { sortableClassName } from '@fex-design/components-styles/sortable'
import { cn } from '@fex-design/utils'
import type { SortableAxis, SortableItems } from '@fex-design/core/sortable/types'
import { createMemo, type JSX } from 'solid-js'
import { createSortable, type CreateSortableOptions } from '@fex-design/solid/primitives/create-sortable'
import { SortableContext, type SortableContextValue } from './sortable-context'

export interface SortableRootProps<TItems extends SortableItems> {
  items: TItems
  axis?: SortableAxis
  containerId?: string
  class?: string
  onChange?: (items: TItems) => void
  children?: JSX.Element | ((state: { items: TItems }) => JSX.Element)
}

interface SortableRootContentProps<TItems extends SortableItems> {
  items: TItems
  render: JSX.Element | ((state: { items: TItems }) => JSX.Element)
}

function SortableRootContent<TItems extends SortableItems>(
  props: SortableRootContentProps<TItems>,
) {
  const rendered = createMemo(() =>
    typeof props.render === 'function'
      ? (props.render as (state: { items: TItems }) => JSX.Element)({ items: props.items })
      : props.render,
  )
  return <>{rendered()}</>
}

export function SortableRoot<TItems extends SortableItems>(props: SortableRootProps<TItems>) {
  const createOptions = (): CreateSortableOptions<TItems> => ({
    items: props.items,
    ...(props.axis === undefined ? {} : { axis: props.axis }),
    ...(props.onChange === undefined ? {} : { onChange: props.onChange }),
  })
  const sortable = createSortable(createOptions())
  const context: SortableContextValue = {
    ...sortable,
    previewItems: sortable.previewItems,
    update: (next) => sortable.update(next as unknown as CreateSortableOptions<TItems>),
    syncOptions: () => sortable.update(createOptions()),
  }
  return (
    <SortableContext.Provider value={context}>
      <div
        ref={sortable.setContainer(props.containerId ?? 'default')}
        data-sortable-container={props.containerId ?? 'default'}
        class={cn(sortableClassName, props.class)}
      >
        <SortableRootContent items={props.items} render={props.children} />
      </div>
    </SortableContext.Provider>
  )
}
