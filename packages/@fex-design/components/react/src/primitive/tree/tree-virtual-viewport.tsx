import type { FocusFeatureApi } from '@fex-design/core/tree/features/focus'
import type { TreeKey, TreeNodeData, TreeVisibleItem } from '@fex-design/core/tree/types'
import { cn } from '@fex-design/utils'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react'
import { useTreeContext } from './tree-context'
import { useTreeVisibleItems } from './use-tree-visible-items'

export interface TreeVirtualViewportProps<TNode extends TreeNodeData> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  height: number
  overscan?: number | undefined
  ref?: Ref<TreeVirtualViewportHandle> | undefined
  children: (item: TreeVisibleItem<TNode>) => ReactNode
}

export interface TreeVirtualViewportHandle {
  scrollToKey(
    key: TreeKey,
    options?: { align?: 'auto' | 'start' | 'center' | 'end'; reveal?: boolean },
  ): boolean
}

export function TreeVirtualViewport<TNode extends TreeNodeData>({
  height,
  overscan = 6,
  children,
  className,
  style,
  ref,
  ...props
}: TreeVirtualViewportProps<TNode>) {
  const { tree, rowHeight } = useTreeContext<TNode>()
  const scrollElementRef = useRef<HTMLDivElement>(null)
  const items = useTreeVisibleItems(tree)
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => rowHeight,
    overscan,
  })

  useImperativeHandle(
    ref,
    () => ({
      scrollToKey(key, options) {
        if (options?.reveal) tree.getFeature<FocusFeatureApi>('focus')?.reveal(key)
        const visibleIndex = tree.getVisibleIndex(key)
        if (visibleIndex === undefined || visibleIndex < 0) return false
        virtualizer.scrollToIndex(visibleIndex, { align: options?.align ?? 'auto' })
        return true
      },
    }),
    [tree, virtualizer],
  )

  return (
    <div
      {...props}
      ref={scrollElementRef}
      data-slot="tree-virtual-viewport"
      className={cn('overflow-auto', className)}
      style={{ ...style, height }}
    >
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index]
          if (!item) return null
          return (
            <div
              key={item.key}
              className="absolute left-0 w-full"
              style={{ height: virtualItem.size, transform: `translateY(${virtualItem.start}px)` }}
            >
              {children(item)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
