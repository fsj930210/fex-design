import { sortableClassName } from '@fex-design/components-styles/sortable'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode } from 'react'
import type { SortableAxis, SortableItems } from '@fex-design/core/sortable/types'
import { useSortable } from '@fex-design/react/hooks/use-sortable'
import { SortableContext } from './sortable-context'

export interface SortableRootProps<TItems extends SortableItems> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange'
> {
  items: TItems
  axis?: SortableAxis
  containerId?: string
  children: ReactNode | ((state: { items: TItems }) => ReactNode)
  onChange?: (items: TItems) => void
}

export function SortableRoot<TItems extends SortableItems>({
  items,
  axis,
  containerId = 'default',
  className,
  children,
  onChange,
  ...props
}: SortableRootProps<TItems>) {
  const sortable = useSortable({ items, axis, onChange })
  const containerProps = sortable.getContainerProps(containerId)

  return (
    <SortableContext value={sortable}>
      <div {...props} {...containerProps} className={cn(sortableClassName, className)}>
        {typeof children === 'function'
          ? children({ items: sortable.previewItems as TItems })
          : children}
      </div>
    </SortableContext>
  )
}
