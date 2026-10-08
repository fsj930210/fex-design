import { sortableItemClassName } from '@fex-design/components-styles/sortable'
import { cn } from '@fex-design/utils'
import type { SortableId } from '@fex-design/core/sortable/types'
import { onCleanup, type JSX, type ParentProps } from 'solid-js'
import { useSortableContext } from './sortable-context'

export interface SortableItemProps extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>> {
  id: SortableId
  containerId?: string
}

export function SortableItem(props: SortableItemProps) {
  const sortable = useSortableContext()
  const containerId = () => props.containerId ?? 'default'
  function handlePointerDown(event: PointerEvent) {
    sortable.syncOptions()
    sortable.onPointerDown(event, props.id, containerId())
  }
  function setItemRef(element: HTMLDivElement) {
    sortable.setItem(props.id, containerId())(element)
    element.addEventListener('pointerdown', handlePointerDown)
    onCleanup(() => element.removeEventListener('pointerdown', handlePointerDown))
  }

  return (
    <div
      ref={setItemRef}
      data-active={sortable.snapshot().activeId === props.id || undefined}
      data-sortable-id={props.id}
      data-sortable-container-id={containerId()}
      style={sortable.getItemStyle(props.id)}
      class={cn(sortableItemClassName, props.class)}
    >
      {props.children}
    </div>
  )
}
