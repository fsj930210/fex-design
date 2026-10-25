import type { TreeNodeData, TreeVisibleItem } from '@fex-design/core/tree/types'
import { treeViewportClassName } from '@fex-design/components-styles/tree'
import { cn } from '@fex-design/utils'
import { useImperativeHandle, useRef, type HTMLAttributes, type ReactNode, type Ref } from 'react'
import type { TreeKey } from '@fex-design/core/tree/types'
import { useTreeContext } from './tree-context'
import { useTreeVisibleItems } from './use-tree-visible-items'

export interface TreeViewportProps<TNode extends TreeNodeData> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  ref?: Ref<TreeViewportHandle> | undefined
  children: (item: TreeVisibleItem<TNode>) => ReactNode
}
export interface TreeViewportHandle {
  scrollTo(
    key: TreeKey,
    options?: { reveal?: boolean; align?: 'auto' | 'start' | 'center' | 'end' },
  ): boolean
}

export function TreeViewport<TNode extends TreeNodeData>({
  children,
  ref,
  className,
  ...props
}: TreeViewportProps<TNode>) {
  const { tree } = useTreeContext<TNode>()
  const viewportRef = useRef<HTMLDivElement>(null)
  useImperativeHandle(
    ref,
    () => ({
      scrollTo(key, options) {
        const scroll = () => {
          const item = Array.from(
            viewportRef.current?.querySelectorAll<HTMLElement>('[data-key]') ?? [],
          ).find((node) => node.dataset.key === String(key))
          if (!item) return false
          item.scrollIntoView({
            block: options?.align === 'auto' ? 'nearest' : (options?.align ?? 'nearest'),
          })
          return true
        }
        if (options?.reveal) {
          if (!tree.getFeature('focus')?.reveal(key)) return false
          requestAnimationFrame(scroll)
          return true
        }
        return scroll()
      },
    }),
    [tree],
  )
  const items = useTreeVisibleItems(tree)
  return (
    <div
      {...props}
      ref={viewportRef}
      data-slot="tree-viewport"
      className={cn(treeViewportClassName, className)}
    >
      {items.map((item) => children(item))}
    </div>
  )
}
