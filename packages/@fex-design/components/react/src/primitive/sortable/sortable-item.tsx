import { sortableItemClassName } from '@fex-design/components-styles/sortable'
import { cn } from '@fex-design/utils'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { SortableId } from '@fex-design/core/sortable/types'
import { useSortableContext } from './sortable-context'

export interface SortableItemRenderState {
  active: boolean
  style: CSSProperties
  props: HTMLAttributes<HTMLElement>
  handleProps: HTMLAttributes<HTMLElement>
}

export interface SortableItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  id: SortableId
  containerId?: string
  children?: ReactNode | ((state: SortableItemRenderState) => ReactNode)
}

export function SortableItem({
  id,
  containerId = 'default',
  className,
  children,
  ...props
}: SortableItemProps) {
  const sortable = useSortableContext()
  const itemProps = sortable.getItemProps(id, containerId)
  const handleProps = sortable.getHandleProps()
  const active = sortable.activeId === id
  const state = {
    active,
    style: itemProps.style ?? {},
    props: itemProps,
    handleProps,
  }

  if (typeof children === 'function') {
    return children(state)
  }

  return (
    <div
      {...props}
      {...itemProps}
      className={cn(sortableItemClassName, className)}
      data-active={active || undefined}
    >
      {children}
    </div>
  )
}
