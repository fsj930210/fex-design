import { cn } from '@fex-design/utils'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import type { TreeBehaviorProps } from './tree-types'
import { createTreeSetup } from './tree-setup'
import { createTreeInstance, type TreeInstance, type TreeViewportInstance } from './tree-instance'
import { createTree } from '@fex-design/solid/primitive/tree'
import type { TreeController, TreeVisibleItem } from '@fex-design/solid/primitive/tree'
import {
  TreeCheckbox,
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
  TreeVirtualViewport,
} from '@fex-design/solid/primitive/tree'
import { splitProps, type JSX } from 'solid-js'
import { Spinner } from '@fex-design/solid/ui/spinner'
export {
  expansionFeature,
  selectionFeature,
  checkFeature,
  asyncLoadFeature,
  dndFeature,
  keyboardFeature,
  searchFeature,
} from '@fex-design/solid/primitive/tree'

export interface TreeProps<TNode extends Record<string, unknown>>
  extends
    Omit<
      JSX.HTMLAttributes<HTMLDivElement>,
      | 'ref'
      | 'onSelect'
      | 'onDragStart'
      | 'onDragEnter'
      | 'onDragOver'
      | 'onDragLeave'
      | 'onDrop'
      | 'onDragEnd'
    >,
    TreeBehaviorProps<TNode> {
  ref?: (handle: TreeInstance<TNode>) => void
  virtual?: boolean
  virtualHeight?: number
  virtualOverscan?: number
  checkable?: boolean
  block?: boolean
  draggable?: boolean
  renderItem?: (item: TreeVisibleItem<TNode>, tree: TreeController<TNode>) => JSX.Element
  classNames?: Partial<
    Record<
      'root' | 'viewport' | 'item' | 'trigger' | 'checkbox' | 'title' | 'dropIndicator',
      string
    >
  >
  styles?: Partial<
    Record<
      'root' | 'viewport' | 'item' | 'trigger' | 'checkbox' | 'title' | 'dropIndicator',
      JSX.CSSProperties
    >
  >
  onItemClick?: (event: MouseEvent, item: TreeVisibleItem<TNode>) => void
  onItemDoubleClick?: (event: MouseEvent, item: TreeVisibleItem<TNode>) => void
  onItemContextMenu?: (event: MouseEvent, item: TreeVisibleItem<TNode>) => void
}
export function Tree<TNode extends Record<string, unknown>>(props: TreeProps<TNode>) {
  const [local, rootAttrs] = splitProps(props, [
    'treeData',
    'disabled',
    'selectable',
    'disableCheckbox',
    'droppable',
    'fieldNames',
    'isLeaf',
    'expandedKeys',
    'defaultExpandedKeys',
    'onExpand',
    'selectedKeys',
    'defaultSelectedKeys',
    'multiple',
    'onSelect',
    'checkedKeys',
    'defaultCheckedKeys',
    'checkStrict',
    'onCheck',
    'loadChildren',
    'onLoadError',
    'indent',
    'rowHeight',
    'class',
    'style',
    'ref',
    'virtual',
    'virtualHeight',
    'virtualOverscan',
    'checkable',
    'block',
    'draggable',
    'onDragStart',
    'onDragEnter',
    'onDragOver',
    'onDragLeave',
    'onDrop',
    'onDragEnd',
    'renderItem',
    'classNames',
    'styles',
    'onItemClick',
    'onItemDoubleClick',
    'onItemContextMenu',
  ])
  const setup = createTreeSetup<TNode>()
  const tree = createTree(() => setup(local))
  let viewport: TreeViewportInstance | undefined
  const setViewport = (handle: TreeViewportInstance) => {
    viewport = handle
  }
  local.ref?.(
    createTreeInstance(
      () => tree,
      () => viewport,
    ),
  )
  const render = (tree: TreeController<TNode>, item: TreeVisibleItem<TNode>) => (
    <TreeItem
      itemKey={item.key}
      block={local.block ?? false}
      dndCallbacks={{
        onDragStart: local.onDragStart,
        onDragEnter: local.onDragEnter,
        onDragOver: local.onDragOver,
        onDragLeave: local.onDragLeave,
        onDrop: local.onDrop,
        onDragEnd: local.onDragEnd,
      }}
      class={local.classNames?.item}
      style={local.styles?.item}
    >
      {(state) => (
        <div
          {...state.itemProps}
          onClick={(event) => {
            state.itemProps.onClick?.(event)
            local.onItemClick?.(event, item)
          }}
          onDblClick={(event) => local.onItemDoubleClick?.(event, item)}
          onContextMenu={(event) => local.onItemContextMenu?.(event, item)}
        >
          {local.renderItem?.(item, tree) ?? (
            <>
              {state.loadState === 'loading' ? (
                <Spinner size="sm" aria-label="Loading children" />
              ) : (
                <TreeTrigger
                  itemKey={state.item.key}
                  class={local.classNames?.trigger}
                  style={local.styles?.trigger}
                />
              )}
              {state.item.checkable && (
                <TreeCheckbox
                  itemKey={state.item.key}
                  class={local.classNames?.checkbox}
                  style={local.styles?.checkbox}
                />
              )}
              <TreeTitle class={local.classNames?.title} style={local.styles?.title}>
                {String(state.item.title)}
              </TreeTitle>
            </>
          )}
        </div>
      )}
    </TreeItem>
  )
  return (
    <TreeRoot
      {...rootAttrs}
      class={cn(local.class, local.classNames?.root)}
      style={mergeStyle(local.style, local.styles?.root)}
      controller={tree}
      aria-disabled={local.disabled || undefined}
      indent={local.indent}
      rowHeight={local.rowHeight}
    >
      {(tree) =>
        local.virtual ? (
          <TreeVirtualViewport
            ref={setViewport}
            class={local.classNames?.viewport}
            style={local.styles?.viewport}
            height={local.virtualHeight ?? 320}
            overscan={local.virtualOverscan ?? 6}
          >
            {(item) => render(tree, item)}
          </TreeVirtualViewport>
        ) : (
          <TreeViewport
            ref={setViewport}
            class={local.classNames?.viewport}
            style={local.styles?.viewport}
          >
            {(item) => render(tree, item)}
          </TreeViewport>
        )
      }
    </TreeRoot>
  )
}
export { createTree, createTreeVisibleItems } from '@fex-design/solid/primitive/tree'
export type {
  TreeController,
  TreeDragEventContext,
  TreeItemEventContext,
  TreeKey,
  TreeOptions,
  TreeVisibleItem,
} from '@fex-design/solid/primitive/tree'

export type { TreeInstance, TreeScrollOptions } from './tree-instance'
export type { TreeBehaviorProps } from './tree-types'

export type { TreeNode, TreeDataNode } from '@fex-design/solid/primitive/tree'
