import {
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import type {
  MasonryColumns,
  MasonryKey,
} from '@fex-design/core/masonry/types'
import { resolveMasonryColumns, resolveMasonryGap } from '@fex-design/core/masonry/layout'
import { masonryVirtualViewportClassName } from '@fex-design/components-styles/masonry'
import { cn } from '@fex-design/utils'
import { useCoreStore } from '@fex-design/react/hooks/use-core-store'
import { useMasonryContext } from './masonry-context'

export interface MasonryVirtualViewportProps<T> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  items: readonly T[]
  getItemKey: (item: T, index: number) => MasonryKey
  estimateSize: (item: T, index: number) => number
  height: number
  overscan?: number
  children: (item: T, index: number) => ReactNode
}

export function MasonryVirtualViewport<T>({
  items,
  getItemKey,
  estimateSize,
  height,
  overscan = 4,
  children,
  className,
  style,
  ...props
}: MasonryVirtualViewportProps<T>) {
  const { controller, options } = useMasonryContext()
  const snapshot = useCoreStore(controller)
  const scrollRef = useRef<HTMLDivElement>(null)
  const gap = resolveMasonryGap(options.gap)
  const columns = resolveMasonryColumns(
    options.columns as MasonryColumns | undefined,
    snapshot.width,
    gap.column,
  )
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    getItemKey: (index) => getItemKey(items[index] as T, index),
    estimateSize: (index) => estimateSize(items[index] as T, index),
    overscan,
    gap: gap.row,
    lanes: columns,
    laneAssignmentMode: 'measured',
  })
  const columnWidth = Math.max(0, (snapshot.width - gap.column * (columns - 1)) / columns),
    sign = options.direction === 'rtl' ? -1 : 1

  return (
    <div
      {...props}
      ref={scrollRef}
      data-slot="masonry-virtual-viewport"
      className={cn(masonryVirtualViewportClassName, className)}
      style={{ ...style, height }}
    >
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index]
          if (!item) return null
          return (
            <div
              key={virtualItem.key}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
              data-column={virtualItem.lane}
              className="absolute start-0 top-0 min-w-0"
              style={{
                width: columnWidth,
                transform: `translate3d(${sign * (virtualItem.lane ?? 0) * (columnWidth + gap.column)}px, ${virtualItem.start}px, 0)`,
              }}
            >
              {children(item, virtualItem.index)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
