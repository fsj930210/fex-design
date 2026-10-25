import type { TreeKey, TreeNodeData, TreeVisibleItem } from '@fex-design/core/tree/types'
import { treeViewportClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import { For, splitProps, type JSX } from 'solid-js'
import { createTreeVisibleItems } from './create-tree-visible-items'
import { useTreeContext } from './tree-context'

export interface TreeViewportProps<TNode extends TreeNodeData> extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  ref?: (handle: TreeViewportHandle) => void
  children: (item: TreeVisibleItem<TNode>) => JSX.Element
}
export interface TreeViewportHandle {
  scrollTo(
    key: TreeKey,
    options?: { reveal?: boolean; align?: 'auto' | 'start' | 'center' | 'end' },
  ): boolean
}

export function TreeViewport<TNode extends TreeNodeData>(props: TreeViewportProps<TNode>) {
  const [local, attrs] = splitProps(props, ['children', 'class', 'ref'])
  const { tree } = useTreeContext<TNode>('TreeViewport')
  const items = createTreeVisibleItems(tree)
  const viewportRef = (element: HTMLDivElement) => {
    const handle: TreeViewportHandle = {
      scrollTo(key, options) {
        if (options?.reveal && !tree.getFeature('focus')?.reveal(key)) return false
        if (options?.reveal) {
          requestAnimationFrame(() => handle.scrollTo(key, { ...options, reveal: false }))
          return true
        }
        const item = Array.from(element.querySelectorAll<HTMLElement>('[data-key]')).find(
          (node) => node.dataset.key === String(key),
        )
        if (!item) return false
        item.scrollIntoView({
          block: options?.align === 'auto' ? 'nearest' : (options?.align ?? 'nearest'),
        })
        return true
      },
    }
    local.ref?.(handle)
  }

  return (
    <div
      {...attrs}
      ref={viewportRef}
      data-slot="tree-viewport"
      class={cn(treeViewportClassName, local.class)}
    >
      <For each={items()}>{local.children}</For>
    </div>
  )
}
