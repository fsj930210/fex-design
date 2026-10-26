import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'
import type { TreeBehaviorProps } from './tree-types'
import type { TreeController, TreeVisibleItem } from './tree-internal-types'

export interface TreeProps<TNode extends Record<string, unknown>>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, TreeBehaviorProps<TNode> {
  virtual?: boolean
  virtualHeight?: number
  virtualOverscan?: number
  checkable?: boolean
  block?: boolean
  draggable?: boolean
  classNames?: Partial<
    Record<
      'root' | 'viewport' | 'item' | 'trigger' | 'checkbox' | 'title' | 'dropIndicator',
      string
    >
  >
  styles?: Partial<
    Record<
      'root' | 'viewport' | 'item' | 'trigger' | 'checkbox' | 'title' | 'dropIndicator',
      string
    >
  >
  renderItem?: Snippet<[TreeVisibleItem<TNode>, TreeController<TNode>]>
  onItemClick?: (event: MouseEvent, item: TreeVisibleItem<TNode>) => void
  onItemDoubleClick?: (event: MouseEvent, item: TreeVisibleItem<TNode>) => void
  onItemContextMenu?: (event: MouseEvent, item: TreeVisibleItem<TNode>) => void
}
