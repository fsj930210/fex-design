import { cn } from '@fex-design/utils'
import type { TreeBehaviorProps } from './tree-types'
import { createTreeSetup } from './tree-setup'
import { createTreeInstance, type TreeInstance } from './tree-instance'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useTree } from '@fex-design/react/primitive/tree'
import { useImperativeHandle, useRef } from 'react'
import type {
  TreeController,
  TreeVisibleItem,
  TreeViewportHandle,
} from '@fex-design/react/primitive/tree'
import {
  TreeCheckbox,
  TreeDropIndicator,
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
  TreeVirtualViewport,
} from '@fex-design/react/primitive/tree'
import type { CSSProperties, HTMLAttributes, MouseEvent, ReactNode, Ref } from 'react'
import { Spinner } from '@fex-design/react/ui/spinner'
export { useTree, useTreeVisibleItems } from '@fex-design/react/primitive/tree'
export {
  expansionFeature,
  selectionFeature,
  checkFeature,
  asyncLoadFeature,
  dndFeature,
  keyboardFeature,
  searchFeature,
} from '@fex-design/react/primitive/tree'

export type TreeClassNames = Partial<
  Record<'root' | 'viewport' | 'item' | 'trigger' | 'checkbox' | 'title' | 'dropIndicator', string>
>
export type TreeStyles = Partial<Record<keyof TreeClassNames, CSSProperties>>

export interface TreeProps<TNode extends Record<string, unknown>>
  extends
    Omit<
      HTMLAttributes<HTMLDivElement>,
      | 'children'
      | 'onSelect'
      | 'onDragStart'
      | 'onDragEnter'
      | 'onDragOver'
      | 'onDragLeave'
      | 'onDrop'
      | 'onDragEnd'
    >,
    TreeBehaviorProps<TNode> {
  ref?: Ref<TreeInstance<TNode>>
  virtual?: boolean
  virtualHeight?: number
  virtualOverscan?: number
  checkable?: boolean
  block?: boolean
  draggable?: boolean
  classNames?: TreeClassNames
  styles?: TreeStyles
  onItemClick?: (event: MouseEvent<HTMLDivElement>, item: TreeVisibleItem<TNode>) => void
  onItemDoubleClick?: (event: MouseEvent<HTMLDivElement>, item: TreeVisibleItem<TNode>) => void
  onItemContextMenu?: (event: MouseEvent<HTMLDivElement>, item: TreeVisibleItem<TNode>) => void
  renderItem?: (item: TreeVisibleItem<TNode>, tree: TreeController<TNode>) => ReactNode
}

export function Tree<TNode extends Record<string, unknown>>({
  ref,
  treeData,
  disabled,
  selectable,
  disableCheckbox,
  droppable,
  fieldNames,
  isLeaf,
  expandedKeys,
  defaultExpandedKeys,
  onExpand,
  selectedKeys,
  defaultSelectedKeys,
  multiple,
  onSelect,
  checkedKeys,
  defaultCheckedKeys,
  checkStrict = false,
  onCheck,
  loadChildren,
  onLoadError,
  indent,
  rowHeight,
  virtual = false,
  virtualHeight = 320,
  virtualOverscan = 6,
  checkable = false,
  block = false,
  draggable = false,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  classNames,
  styles,
  onItemClick,
  onItemDoubleClick,
  onItemContextMenu,
  renderItem: customRenderItem,
  className,
  style,
  ...props
}: TreeProps<TNode>) {
  const setup = useLazyRef(() => createTreeSetup<TNode>()).current
  const tree = useTree(
    setup({
      disabled,
      selectable,
      disableCheckbox,
      droppable,
      treeData,
      checkable,
      draggable,
      fieldNames,
      isLeaf,
      expandedKeys,
      defaultExpandedKeys,
      onExpand,
      selectedKeys,
      defaultSelectedKeys,
      multiple,
      onSelect,
      checkedKeys,
      defaultCheckedKeys,
      checkStrict,
      onCheck,
      loadChildren,
      onLoadError,
      indent,
      rowHeight,
    }),
  )
  const viewport = useRef<TreeViewportHandle>(null)
  useImperativeHandle(
    ref,
    () =>
      createTreeInstance(
        () => tree,
        () => viewport.current ?? undefined,
      ),
    [tree],
  )
  const dndCallbacks = { onDragStart, onDragEnter, onDragOver, onDragLeave, onDrop, onDragEnd }
  const renderItem = (tree: TreeController<TNode>, item: TreeVisibleItem<TNode>) => (
    <TreeItem
      key={item.key}
      itemKey={item.key}
      block={block}
      dndCallbacks={dndCallbacks}
      className={classNames?.item}
      style={styles?.item}
    >
      {(state) => (
        <div
          {...state.itemProps}
          {...state.dnd.itemProps}
          className={state.itemProps.className}
          style={{ ...state.itemProps.style, ...state.dnd.itemProps.style }}
          onClick={(event) => {
            state.itemProps.onClick?.(event)
            onItemClick?.(event, item)
          }}
          onDoubleClick={(event) => {
            onItemDoubleClick?.(event, item)
          }}
          onContextMenu={(event) => {
            onItemContextMenu?.(event, item)
          }}
        >
          {customRenderItem?.(item, tree) ?? (
            <>
              {state.loadState === 'loading' ? (
                <Spinner size="sm" aria-label="Loading children" />
              ) : (
                <TreeTrigger
                  itemKey={state.item.key}
                  className={classNames?.trigger}
                  style={styles?.trigger}
                />
              )}
              {state.item.checkable && (
                <TreeCheckbox
                  itemKey={state.item.key}
                  className={classNames?.checkbox}
                  style={styles?.checkbox}
                />
              )}
              <TreeTitle className={classNames?.title} style={styles?.title}>
                {String(state.item.title)}
              </TreeTitle>
              <TreeDropIndicator
                className={classNames?.dropIndicator}
                item={state.item}
                intent={state.dnd.intent}
                style={{ ...state.dnd.dropIndicatorStyle, ...styles?.dropIndicator }}
              />
            </>
          )}
        </div>
      )}
    </TreeItem>
  )
  return (
    <TreeRoot
      {...props}
      className={cn(className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
      controller={tree}
      aria-disabled={disabled || undefined}
      indent={indent}
      rowHeight={rowHeight}
    >
      {(tree) =>
        virtual ? (
          <TreeVirtualViewport
            ref={viewport}
            height={virtualHeight}
            overscan={virtualOverscan}
            className={classNames?.viewport}
            style={styles?.viewport}
          >
            {(item) => renderItem(tree, item)}
          </TreeVirtualViewport>
        ) : (
          <TreeViewport ref={viewport} className={classNames?.viewport} style={styles?.viewport}>
            {(item) => renderItem(tree, item)}
          </TreeViewport>
        )
      }
    </TreeRoot>
  )
}

export type {
  TreeController,
  TreeDragEventContext,
  TreeItemEventContext,
  TreeKey,
  TreeOptions,
  TreeVisibleItem,
} from '@fex-design/react/primitive/tree'

export type { TreeInstance, TreeScrollOptions } from './tree-instance'
export type { TreeBehaviorProps } from './tree-types'

export type { TreeNode, TreeDataNode } from '@fex-design/react/primitive/tree'
