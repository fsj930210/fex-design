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
import { createEffect, createMemo, onCleanup } from 'solid-js'
import { updateTreeDropIndicator } from '@fex-design/core/tree/drop-indicator-dom'
import { treeDropIndicatorClassName } from '@fex-design/components-styles/tree'
import { createDraggable } from '@fex-design/solid/primitives/create-draggable'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import {
  createDroppable,
  type CreateDroppableEventArgs,
} from '@fex-design/solid/primitives/create-droppable'
import { useTreeContext } from './tree-context'

export interface CreateTreeDndItemOptions<TNode extends TreeNodeData> {
  tree: TreeController<TNode>
  itemKey: TreeKey
  dragDisabled?: boolean | (() => boolean)
  disabled?: boolean
  callbacks?: TreeDndCallbacks<TNode>
}

export function createTreeDndItem<TNode extends TreeNodeData>({
  tree,
  itemKey,
  disabled = false,
  dragDisabled: rowDragDisabled = false,
  callbacks,
}: CreateTreeDndItemOptions<TNode>) {
  const { indent } = useTreeContext<TNode>('createTreeDndItem')
  const feature = tree.getFeature<DndFeatureApi>('dnd')
  const activeIntent = feature
    ? createCoreStoreSignal<TreeDropIntent | null>({
        getSnapshot: feature.getActiveIntent,
        subscribe: feature.subscribeActiveIntent,
      })
    : () => null
  const item = tree.getItem(itemKey)
  const dropDisabled = () => disabled || tree.getItem(itemKey)?.droppable !== true || !feature
  const dragDisabled = () =>
    disabled ||
    (typeof rowDragDisabled === 'function' ? rowDragDisabled() : rowDragDisabled) ||
    feature?.canDrag(itemKey) !== true
  let itemElement: HTMLElement | null = null

  type Args = CreateDroppableEventArgs<{ treeKey: TreeKey }>

  const resolve = (args: Pick<Args, 'source' | 'pointer' | 'targetRect'>) => {
    const sourceKey = getKey(args.source.treeKey)
    if (sourceKey === undefined) return undefined
    return feature?.resolve({
      sourceKey,
      targetKey: itemKey,
      pointer: args.pointer,
      dragRect: getDragRect(args.source, args.pointer),
      targetRect: args.targetRect,
      indent: indent(),
    })
  }
  const intent = () => {
    const next = activeIntent()
    return next?.targetKey === itemKey ? next : null
  }

  const drag = createDraggable({
    id: `tree:${String(itemKey)}`,
    type: 'tree-item',
    data: { treeKey: itemKey },
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
  const drop = createDroppable<{ treeKey: TreeKey }>({
    id: `tree:${String(itemKey)}`,
    accept: 'tree-item',
    data: { treeKey: itemKey },
    disabled: !feature,
    getPosition: ({ element, pointer, source }) => {
      const next = resolve({ source, pointer, targetRect: getRect(element) })
      if (!next?.valid) return null
      if (next.position === 'after') return 'bottom'
      return 'inside'
    },
    canDrop: (source) => {
      if (dropDisabled()) return false
      const key = getKey(source.treeKey)
      return key !== undefined && key !== itemKey && !tree.getPath(itemKey).includes(key)
    },
    onDragEnter: (args) => {
      const next = resolve(args)
      const sourceKey = getKey(args.source.treeKey)
      if (item)
        callbacks?.onDragEnter?.({
          item: tree.getItem(itemKey)!,
          sourceItem: sourceKey === undefined ? undefined : tree.getItem(sourceKey),
          targetItem: tree.getItem(itemKey),
          event: args.event,
          intent: next,
        })
      feature?.setActiveIntent(next?.valid ? next : null)
    },
    onDrag: (args) => {
      const next = resolve(args)
      const sourceKey = getKey(args.source.treeKey)
      if (item)
        callbacks?.onDragOver?.({
          item: tree.getItem(itemKey)!,
          sourceItem: sourceKey === undefined ? undefined : tree.getItem(sourceKey),
          targetItem: tree.getItem(itemKey),
          event: args.event,
          intent: next,
        })
      feature?.setActiveIntent(next?.valid ? next : null)
    },
    onDragLeave: () => {
      feature?.clearActiveIntent(itemKey)
      if (item) callbacks?.onDragLeave?.({ item, targetItem: tree.getItem(itemKey) })
    },
    onDrop: (args) => {
      const next = resolve(args)
      const sourceKey = getKey(args.source.treeKey)
      if (item)
        callbacks?.onDrop?.({
          item: tree.getItem(itemKey)!,
          sourceItem: sourceKey === undefined ? undefined : tree.getItem(sourceKey),
          targetItem: tree.getItem(itemKey),
          event: args.event,
          intent: next,
        })
      feature?.clearActiveIntent(itemKey)
    },
  })

  const setItemRef = (element: HTMLElement) => {
    itemElement = element
    drag.setTarget(element)
    drop.setTarget(element)
  }
  const itemProps = createMemo(() => ({
    ...drop.dataAttributes(),
    'data-dragging': drag.dragging() || undefined,
    'data-dnd-enabled': !dragDisabled() || undefined,
    'data-drop-position': intent()
      ? intent()!.position === 'after'
        ? 'bottom'
        : 'inside'
      : undefined,
    onPointerDown: drag.onPointerDown,
  }))

  // Drag intent belongs to an external store; render its DOM indicator and clean up on disposal.
  createEffect(() => updateTreeDropIndicator(itemElement, intent(), treeDropIndicatorClassName))
  onCleanup(() => updateTreeDropIndicator(itemElement, null, treeDropIndicatorClassName))
  return {
    dragging: drag.dragging,
    over: drop.over,
    edge: drop.edge,
    position: drop.position,
    intent,
    itemProps,
    setItemRef,
  }
}

function getKey(value: unknown): TreeKey | undefined {
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

function getRect(element: HTMLElement) {
  const value = element.getBoundingClientRect()
  return {
    x: value.left,
    y: value.top,
    width: value.width,
    height: value.height,
  }
}
