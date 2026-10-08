import { sortableItemClassName } from '@fex-design/components-styles/sortable'
import { cn } from '@fex-design/utils'
import type { SortableId } from '@fex-design/core/sortable/types'
import type { JSX } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useSortableContext } from './sortable-context'

export interface SortableOverlayProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: JSX.Element | ((activeId: SortableId) => JSX.Element)
}

export function SortableOverlay(props: SortableOverlayProps) {
  const sortable = useSortableContext()

  return (
    <>
      {sortable.snapshot().activeId && (
        <Portal>
          <div
            data-sortable-overlay=""
            style={sortable.getOverlayStyle()}
            class={cn(
              sortableItemClassName,
              'bg-elevated-background text-foreground opacity-100 shadow-xl ring-1 ring-border/70',
              props.class,
            )}
          >
            {typeof props.children === 'function'
              ? (props.children as (activeId: SortableId) => JSX.Element)(
                  sortable.snapshot().activeId as SortableId,
                )
              : props.children}
          </div>
        </Portal>
      )}
    </>
  )
}
