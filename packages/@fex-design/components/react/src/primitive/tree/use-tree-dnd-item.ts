import type { DndFeatureApi, TreeDropIntent } from '@fex-design/core/tree/features/dnd'
import type {
  TreeController,
  TreeDndCallbacks,
  TreeKey,
  TreeNodeData,
} from '@fex-design/core/tree/types'
import {
  DND_DRAG_START_RECT_HEIGHT,
  DND_DRAG_START_RECT_WIDTH,
  DND_DRAG_START_RECT_X,
  DND_DRAG_START_RECT_Y,
  DND_DRAG_START_X,
  DND_DRAG_START_Y,
} from '@fex-design/core/interactions/dnd-store'
import { useRef, useSyncExternalStore, type CSSProperties } from 'react'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { useDraggable } from '@fex-design/react/hooks/use-draggable'
import { useDroppable, type UseDroppableEventArgs } from '@fex-design/react/hooks/use-droppable'
import { useLazyRef } from '@fex-design/react/hooks/use-lazy-ref'
import { useMemoizedFn } from '@fex-design/react/hooks/use-memoized-fn'
import { useTreeContext } from './tree-context'

export interface UseTreeDndItemOptions<TNode extends TreeNodeData> {
  tree: TreeController<TNode>
  itemKey: TreeKey
  dragDisabled?: boolean | (() => boolean) | undefined
  disabled?: boolean | undefined
  callbacks?: TreeDndCallbacks<TNode>
}

type TreeDropEventArgs = UseDroppableEventArgs<{ treeKey: TreeKey }>

/** Optional row-level adapter between the Tree DnD feature and React DOM events. */
export function useTreeDndItem<TNode extends TreeNodeData>({
  tree,
  itemKey,
  disabled = false,
  dragDisabled: rowDragDisabled = false,
  callbacks,
}: UseTreeDndItemOptions<TNode>) {
  const { indent } = useTreeContext<TNode>()
  const itemElementRef = useRef<HTMLElement | null>(null)
  const dndData = useLazyRef(() => ({ treeKey: itemKey })).current
  const feature = tree.getFeature<DndFeatureApi>('dnd')
  const item = tree.getItem(itemKey)
  const dropDisabled = () => disabled || tree.getItem(itemKey)?.droppable !== true || !feature
  const dragDisabled = () =>
    disabled ||
    (typeof rowDragDisabled === 'function' ? rowDragDisabled() : rowDragDisabled) ||
    feature?.canDrag(itemKey) !== true
  const subscribeActiveIntent = useMemoizedFn(
    (listener: () => void) => feature?.subscribeActiveIntent(listener) ?? (() => {}),
  )
  const activeIntent = useSyncExternalStore(
    subscribeActiveIntent,
    () => feature?.getActiveIntent() ?? null,
    () => null,
  )

  const resolveIntent = useMemoizedFn(
    (args: Pick<TreeDropEventArgs, 'source' | 'pointer' | 'targetRect'>) => {
      const sourceKey = getTreeKey(args.source.treeKey)
      if (sourceKey === undefined) return undefined
      return feature?.resolve({
        sourceKey,
        targetKey: itemKey,
        pointer: args.pointer,
        dragRect: getDragRect(args.source, args.pointer),
        targetRect: args.targetRect,
        indent,
      })
    },
  )

  const updateActiveIntent = useMemoizedFn((nextIntent: TreeDropIntent | null | undefined) => {
    feature?.setActiveIntent(nextIntent?.valid ? nextIntent : null)
  })

  const drag = useDraggable({
    id: `tree:${String(itemKey)}`,
    type: 'tree-item',
    data: dndData,
    get disabled() {
      return dragDisabled()
    },
    dragPreview: 'clone',
    onDragStart: (event) => {
      if (item) callbacks?.onDragStart?.({ item: tree.getItem(itemKey)!, event })
    },
    onDragEnd: (event) => {
      if (item) callbacks?.onDragEnd?.({ item: tree.getItem(itemKey)!, event })
    },
  })
  const drop = useDroppable<{ treeKey: TreeKey }>({
    id: `tree:${String(itemKey)}`,
    accept: 'tree-item',
    data: dndData,
    disabled: !feature,
    getPosition: ({ element, pointer, source }) => {
      const intent = resolveIntent({ source, pointer, targetRect: getElementRect(element) })
      if (!intent?.valid) return null
      if (intent.position === 'after') return 'bottom'
      return intent.position
    },
    canDrop: (source) => {
      if (dropDisabled()) return false
      const sourceKey = getTreeKey(source.treeKey)
      if (sourceKey === undefined) return false
      return sourceKey !== itemKey && !tree.getPath(itemKey).includes(sourceKey)
    },
    onDragEnter: (args) => {
      const intent = resolveIntent(args)
      const sourceKey = getTreeKey(args.source.treeKey)
      if (item)
        callbacks?.onDragEnter?.({
          item: tree.getItem(itemKey)!,
          sourceItem: sourceKey === undefined ? undefined : tree.getItem(sourceKey),
          targetItem: tree.getItem(itemKey),
          event: args.event,
          intent,
        })
      updateActiveIntent(intent?.valid ? intent : null)
    },
    onDrag: (args) => {
      const intent = resolveIntent(args)
      const sourceKey = getTreeKey(args.source.treeKey)
      if (item)
        callbacks?.onDragOver?.({
          item: tree.getItem(itemKey)!,
          sourceItem: sourceKey === undefined ? undefined : tree.getItem(sourceKey),
          targetItem: tree.getItem(itemKey),
          event: args.event,
          intent,
        })
      updateActiveIntent(intent?.valid ? intent : null)
    },
    onDragLeave: () => {
      feature?.clearActiveIntent(itemKey)
      if (item) callbacks?.onDragLeave?.({ item, targetItem: tree.getItem(itemKey) })
    },
    onDrop: (args) => {
      const intent = resolveIntent(args)
      const sourceKey = getTreeKey(args.source.treeKey)
      if (item)
        callbacks?.onDrop?.({
          item: tree.getItem(itemKey)!,
          sourceItem: sourceKey === undefined ? undefined : tree.getItem(sourceKey),
          targetItem: tree.getItem(itemKey),
          event: args.event,
          intent,
        })
      feature?.clearActiveIntent(itemKey)
      if (intent?.valid) feature?.drop(intent)
    },
  })
  const dragProps = drag.getDragProps()
  const dropProps = drop.getDropProps()
  const setItemElement = useMemoizedFn((element: HTMLElement | null) => {
    itemElementRef.current = element
  })
  const ref = useComposedRef(setItemElement, dragProps.ref, dropProps.ref)
  const itemIntent = activeIntent?.targetKey === itemKey ? activeIntent : null
  const dropIndicatorStyle = itemIntent
    ? getDropIndicatorStyle(itemElementRef.current, itemIntent.indicatorOffset)
    : undefined

  return {
    dragging: drag.dragging,
    over: drop.over,
    edge: drop.edge,
    position: drop.position,
    intent: itemIntent,
    dropIndicatorStyle,
    itemProps: {
      ...dragProps,
      ...dropProps,
      ref,
      'data-drop-position': undefined,
      'data-dnd-enabled': !dragDisabled() || undefined,
    },
  }
}

function getTreeKey(value: unknown): TreeKey | undefined {
  return typeof value === 'string' || typeof value === 'number' ? value : undefined
}

function getDragRect(source: Record<string, unknown>, pointer: { x: number; y: number }) {
  const startX = source[DND_DRAG_START_X]
  const startY = source[DND_DRAG_START_Y]
  const x = source[DND_DRAG_START_RECT_X]
  const y = source[DND_DRAG_START_RECT_Y]
  const width = source[DND_DRAG_START_RECT_WIDTH]
  const height = source[DND_DRAG_START_RECT_HEIGHT]
  if (
    typeof startX !== 'number' ||
    typeof startY !== 'number' ||
    typeof x !== 'number' ||
    typeof y !== 'number' ||
    typeof width !== 'number' ||
    typeof height !== 'number'
  )
    return undefined
  return { x: x + pointer.x - startX, y: y + pointer.y - startY, width, height }
}

function getElementRect(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  return { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
}

function getTreeTitleOffset(element: HTMLElement | null) {
  if (!element) return 0
  const title = element.querySelector<HTMLElement>('[data-slot="tree-title"]')
  if (!title) return 0
  return title.getBoundingClientRect().left - element.getBoundingClientRect().left
}

function getDropIndicatorStyle(
  element: HTMLElement | null,
  indicatorOffset: number,
): CSSProperties | undefined {
  if (!element) return undefined
  const itemRect = element.getBoundingClientRect()
  const treeRect = element.closest<HTMLElement>('[data-slot="tree"]')?.getBoundingClientRect()
  const left = getTreeTitleOffset(element) + indicatorOffset
  return {
    left,
    width: Math.max(0, (treeRect?.right ?? itemRect.right) - itemRect.left - left),
  }
}

export type UseTreeDndItemReturn<TNode extends TreeNodeData = TreeNodeData> = ReturnType<
  typeof useTreeDndItem<TNode>
>
