import { resolveMasonryColumns, resolveMasonryGap } from '@fex-design/core/masonry/layout'
import type { MasonryKey } from '@fex-design/core/masonry/types'
import { masonryVirtualViewportClassName } from '@fex-design/components-styles/masonry'
import { createVirtualizer } from '@tanstack/solid-virtual'
import { cn } from '@fex-design/utils'
import {
  For,
  splitProps,
  type JSX,
} from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { useMasonryContext } from './masonry-context'

export interface MasonryVirtualViewportProps<T> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  items: readonly T[]
  getItemKey: (item: T, index: number) => MasonryKey
  estimateSize: (item: T, index: number) => number
  height: number
  overscan?: number
  children: (item: T, index: number) => JSX.Element
}

export function MasonryVirtualViewport<T>(props: MasonryVirtualViewportProps<T>) {
  const [local, attrs] = splitProps(props, [
    'items',
    'getItemKey',
    'estimateSize',
    'height',
    'overscan',
    'children',
    'class',
    'style',
  ])
  const { controller, options } = useMasonryContext('MasonryVirtualViewport'),
    snapshot = createCoreStoreSignal(controller)
  const gap = () => resolveMasonryGap(options().gap),
    columns = () => resolveMasonryColumns(options().columns, snapshot().width, gap().column)
  const columnWidth = () =>
      Math.max(0, (snapshot().width - gap().column * (columns() - 1)) / columns()),
    directionSign = () => (options().direction === 'rtl' ? -1 : 1)
  let scroll!: HTMLDivElement
  const virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
    get count() {
      return local.items.length
    },
    getScrollElement: () => scroll,
    getItemKey: (index) => local.getItemKey(local.items[index] as T, index),
    estimateSize: (index) => local.estimateSize(local.items[index] as T, index),
    get overscan() {
      return local.overscan ?? 4
    },
    get gap() {
      return gap().row
    },
    get lanes() {
      return columns()
    },
    laneAssignmentMode: 'measured',
  })
  return (
    <div
      {...attrs}
      ref={scroll}
      data-slot="masonry-virtual-viewport"
      class={cn(masonryVirtualViewportClassName, local.class)}
      style={{ ...(local.style as JSX.CSSProperties), height: `${local.height}px` }}
    >
      <div class="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <For each={virtualizer.getVirtualItems()}>
          {(virtualItem) => (
            <div
              data-index={virtualItem.index}
              data-column={virtualItem.lane}
              ref={(element) => queueMicrotask(() => virtualizer.measureElement(element))}
              class="absolute start-0 top-0 min-w-0"
              style={{
                width: `${columnWidth()}px`,
                transform: `translate3d(${directionSign() * (virtualItem.lane ?? 0) * (columnWidth() + gap().column)}px, ${virtualItem.start}px, 0)`,
              }}
            >
              {local.children(local.items[virtualItem.index] as T, virtualItem.index)}
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
