import type { DndFeatureApi, TreeDropIntent } from '@fex-design/core/tree/features/dnd'
import { updateTreeDropIndicator } from '@fex-design/core/tree/drop-indicator-dom'
import { treeDropIndicatorClassName } from '@fex-design/components-styles/tree'
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
import { draggableAction } from '@fex-design/svelte/actions/draggable'
import {
  droppableAction,
  type DroppableActionOptions,
  type DroppableEventArgs,
} from '@fex-design/svelte/actions/droppable'

export interface TreeDndItemOptions<TNode extends TreeNodeData> {
  tree: TreeController<TNode>
  itemKey: TreeKey
  indent: number
  dragDisabled?: boolean
  disabled?: boolean
  callbacks?: TreeDndCallbacks<TNode>
}

export function treeDndItemAction<TNode extends TreeNodeData>(
  node: HTMLElement,
  options: TreeDndItemOptions<TNode>,
) {
  let current = options
  let drag: ReturnType<typeof draggableAction> | undefined
  let drop:
    | { update: (current: DroppableActionOptions<{ treeKey: TreeKey }>) => void; destroy(): void }
    | undefined
  let intent: TreeDropIntent | null = null

  const bind = (nextOptions: TreeDndItemOptions<TNode>) => {
    current = nextOptions
    drag?.destroy()
    drop?.destroy()

    const feature = current.tree.getFeature<DndFeatureApi>('dnd')
    const item = current.tree.getItem(current.itemKey)
    const dropDisabled = () =>
      current.disabled || current.tree.getItem(current.itemKey)?.droppable !== true || !feature
    const dragDisabled = () =>
      current.disabled || current.dragDisabled || feature?.canDrag(current.itemKey) !== true

    type Args = DroppableEventArgs<{ treeKey: TreeKey }>

    const resolve = (args: Pick<Args, 'source' | 'pointer' | 'targetRect'>) => {
      const sourceKey = getKey(args.source.treeKey)
      if (sourceKey === undefined) return undefined
      return feature?.resolve({
        sourceKey,
        targetKey: current.itemKey,
        pointer: args.pointer,
        dragRect: getDragRect(args.source, args.pointer),
        targetRect: args.targetRect,
        indent: current.indent,
      })
    }
    const update = (value: TreeDropIntent | null | undefined) => {
      intent = value ?? null
      updateTreeDropIndicator(node, intent, treeDropIndicatorClassName)
    }

    drag = draggableAction(node, {
      id: `tree:${String(current.itemKey)}`,
      type: 'tree-item',
      data: { treeKey: current.itemKey },
      get disabled() {
        return dragDisabled()
      },
      dragPreview: 'clone',
      onDragStart: (event) => {
        if (item) current.callbacks?.onDragStart?.({ item, event })
      },
      onDragEnd: (event) => {
        if (item) current.callbacks?.onDragEnd?.({ item, event })
      },
    })
    drop = droppableAction(node, {
      id: `tree:${String(current.itemKey)}`,
      accept: 'tree-item',
      data: { treeKey: current.itemKey },
      disabled: !feature,
      getPosition: ({ element, pointer, source }) => {
        const value = resolve({ source, pointer, targetRect: getRect(element) })
        if (!value?.valid) return null
        if (value.position === 'after') return 'bottom'
        return 'inside'
      },
      canDrop: (source) => {
        if (dropDisabled()) return false
        const key = getKey(source.treeKey)
        return (
          key !== undefined &&
          key !== current.itemKey &&
          !current.tree.getPath(current.itemKey).includes(key)
        )
      },
      onDragEnter: (args) => {
        const value = resolve(args)
        const sourceKey = getKey(args.source.treeKey)
        if (item)
          current.callbacks?.onDragEnter?.({
            item,
            targetItem: item,
            sourceItem: sourceKey === undefined ? undefined : current.tree.getItem(sourceKey),
            event: args.event,
            intent: value,
          })
        update(value?.valid ? value : null)
      },
      onDrag: (args) => {
        const value = resolve(args)
        const sourceKey = getKey(args.source.treeKey)
        if (item)
          current.callbacks?.onDragOver?.({
            item,
            targetItem: item,
            sourceItem: sourceKey === undefined ? undefined : current.tree.getItem(sourceKey),
            event: args.event,
            intent: value,
          })
        update(value?.valid ? value : null)
      },
      onDragLeave: () => {
        update(null)
        if (item) current.callbacks?.onDragLeave?.({ item, targetItem: item })
      },
      onDrop: (args) => {
        const value = resolve(args)
        const sourceKey = getKey(args.source.treeKey)
        if (item)
          current.callbacks?.onDrop?.({
            item,
            targetItem: item,
            sourceItem: sourceKey === undefined ? undefined : current.tree.getItem(sourceKey),
            event: args.event,
            intent: value,
          })
        update(null)
        if (value?.valid) feature?.drop(value)
      },
    })
    node.dataset.dndEnabled = dragDisabled() ? '' : 'true'
  }

  bind(options)
  return {
    update: bind,
    destroy() {
      updateTreeDropIndicator(node, null, treeDropIndicatorClassName)
      drag?.destroy()
      drop?.destroy()
    },
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
