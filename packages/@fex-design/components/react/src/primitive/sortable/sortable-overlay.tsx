import { sortableItemClassName } from '@fex-design/components-styles/sortable'
import { cn } from '@fex-design/utils'
import { createPortal } from 'react-dom'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import type { SortableId } from '@fex-design/core/sortable/types'
import { useSortableContext } from './sortable-context'

export interface SortableOverlayRenderState {
  activeId: SortableId
  style: CSSProperties
}

export interface SortableOverlayProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode | ((state: SortableOverlayRenderState) => ReactNode)
}

export function SortableOverlay({ className, children, style, ...props }: SortableOverlayProps) {
  const sortable = useSortableContext()
  const activeId = sortable.activeId
  if (!activeId) {
    return null
  }

  const overlayStyle = {
    ...sortable.getOverlayStyle(),
    ...style,
  }
  const state = { activeId, style: overlayStyle }

  return createPortal(
    <div
      {...props}
      data-sortable-overlay=""
      className={cn(
        sortableItemClassName,
        'bg-elevated-background text-foreground opacity-100 shadow-xl ring-1 ring-border/70',
        className,
      )}
      style={overlayStyle}
    >
      {typeof children === 'function' ? children(state) : children}
    </div>,
    document.body,
  )
}
