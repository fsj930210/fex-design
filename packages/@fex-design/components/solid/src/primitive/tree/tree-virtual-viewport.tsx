import type { FocusFeatureApi } from '@fex-design/core/tree/features/focus'
import type { TreeKey, TreeNodeData, TreeVisibleItem } from '@fex-design/core/tree/types'
import { cn } from '@fex-design/utils'
import { createVirtualizer } from '@tanstack/solid-virtual'
import { For, Show, splitProps, type JSX } from 'solid-js'
import { createTreeVisibleItems } from './create-tree-visible-items'
import { useTreeContext } from './tree-context'

export interface TreeVirtualViewportHandle {
  scrollToKey(
    key: TreeKey,
    options?: { align?: 'auto' | 'start' | 'center' | 'end'; reveal?: boolean },
  ): boolean
}

export interface TreeVirtualViewportProps<TNode extends TreeNodeData> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children' | 'style' | 'ref'
> {
  height: number
  overscan?: number
  style?: JSX.CSSProperties
  ref?: (handle: TreeVirtualViewportHandle) => void
  children: (item: TreeVisibleItem<TNode>) => JSX.Element
}

export function TreeVirtualViewport<TNode extends TreeNodeData>(
  props: TreeVirtualViewportProps<TNode>,
) {
  const [local, attrs] = splitProps(props, [
    'height',
    'overscan',
    'style',
    'ref',
    'children',
    'class',
  ])
  const { tree, rowHeight } = useTreeContext<TNode>('TreeVirtualViewport')
  const items = createTreeVisibleItems(tree)
  let scrollElement: HTMLDivElement | undefined = undefined
  const virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
    get count() {
      return items().length
    },
    getScrollElement: () => scrollElement ?? null,
    estimateSize: rowHeight,
    get overscan() {
      return local.overscan ?? 6
    },
    getItemKey: (index) => items()[index]?.key ?? index,
  })
  const handle: TreeVirtualViewportHandle = {
    scrollToKey(key, options) {
      if (options?.reveal) tree.getFeature<FocusFeatureApi>('focus')?.reveal(key)
      const index = tree.getVisibleIndex(key)
      if (index === undefined || index < 0) return false
      virtualizer.scrollToIndex(index, { align: options?.align ?? 'auto' })
      return true
    },
  }
  local.ref?.(handle)

  return (
    <div
      {...attrs}
      ref={scrollElement}
      data-slot="tree-virtual-viewport"
      class={cn('overflow-auto', local.class)}
      style={{ ...local.style, height: `${local.height}px` }}
    >
      <div class="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <For each={virtualizer.getVirtualItems()}>
          {(virtualItem) => {
            const item = () => items()[virtualItem.index]
            return (
              <Show when={item()}>
                {(current) => (
                  <div
                    class="absolute left-0 w-full"
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    {local.children(current())}
                  </div>
                )}
              </Show>
            )
          }}
        </For>
      </div>
    </div>
  )
}
