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
import { computed, watchEffect, onScopeDispose } from 'vue'
import { updateTreeDropIndicator } from '@fex-design/core/tree/drop-indicator-dom'
import { treeDropIndicatorClassName } from '@fex-design/components-styles/tree'
import { useCoreStore } from '@fex-design/vue/composables/use-core-store'
import { useDraggable } from '@fex-design/vue/composables/use-draggable'
import { useDroppable, type UseDroppableEventArgs } from '@fex-design/vue/composables/use-droppable'
import { useTreeContext } from './context'

export function useTreeDndItem<TNode extends TreeNodeData>({
  tree,
  itemKey,
  disabled = false,
  dragDisabled: rowDragDisabled = false,
  callbacks,
}: {
  tree: TreeController<TNode>
  itemKey: TreeKey
  dragDisabled?: boolean | (() => boolean)
  disabled?: boolean
  callbacks?: TreeDndCallbacks<TNode>
}) {
  const { indent } = useTreeContext<TNode>('useTreeDndItem')
  const feature = tree.getFeature<DndFeatureApi>('dnd')
  const activeIntentSnapshot = feature
    ? useCoreStore<TreeDropIntent | null>({
        getSnapshot: feature.getActiveIntent,
        subscribe: feature.subscribeActiveIntent,
      })
    : undefined
  const activeIntent = computed(() => {
    const intent = activeIntentSnapshot?.value ?? null
    return intent?.targetKey === itemKey ? intent : null
  })
  const item = tree.getItem(itemKey)
  const dropDisabled = () => disabled || tree.getItem(itemKey)?.droppable !== true || !feature
  const dragDisabled = () =>
    disabled ||
    (typeof rowDragDisabled === 'function' ? rowDragDisabled() : rowDragDisabled) ||
    feature?.canDrag(itemKey) !== true
  let itemElement: HTMLElement | null = null
  // Synchronize the external drag intent to its DOM indicator; disposal removes it.
  watchEffect(() =>
    updateTreeDropIndicator(itemElement, activeIntent.value, treeDropIndicatorClassName),
  )
  onScopeDispose(() => updateTreeDropIndicator(itemElement, null, treeDropIndicatorClassName))
  type DropArgs = UseDroppableEventArgs<{ treeKey: TreeKey }>
  const resolveIntent = (args: Pick<DropArgs, 'source' | 'pointer' | 'targetRect'>) => {
    const sourceKey = getTreeKey(args.source.treeKey)
    if (sourceKey === undefined) return undefined
    return feature?.resolve({
      sourceKey,
      targetKey: itemKey,
      pointer: args.pointer,
      dragRect: getDragRect(args.source, args.pointer),
      targetRect: args.targetRect,
      indent: indent.value,
    })
  }
  const drag = useDraggable({
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
  const drop = useDroppable<{ treeKey: TreeKey }>({
    id: `tree:${String(itemKey)}`,
    accept: 'tree-item',
    data: { treeKey: itemKey },
    disabled: !feature,
    getPosition: ({ element, pointer, source }) => {
      const intent = resolveIntent({ source, pointer, targetRect: getElementRect(element) })
      if (!intent?.valid) return null
      return intent.position === 'after' ? 'bottom' : 'inside'
    },
    canDrop: (source) => {
      if (dropDisabled()) return false
      const sourceKey = getTreeKey(source.treeKey)
      return (
        sourceKey !== undefined &&
        sourceKey !== itemKey &&
        !tree.getPath(itemKey).includes(sourceKey)
      )
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
      feature?.setActiveIntent(intent?.valid ? intent : null)
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
      feature?.setActiveIntent(intent?.valid ? intent : null)
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
    },
  })
  const setItemRef = (element: Element | null) => {
    const htmlElement = element instanceof HTMLElement ? element : null
    itemElement = htmlElement
    drag.setTarget(htmlElement)
    drop.setTarget(htmlElement)
  }
  const itemProps = computed(() => ({
    ...drop.dataAttributes.value,
    'data-dragging': drag.dragging.value || undefined,
    'data-dnd-enabled': !dragDisabled() || undefined,
    'data-drop-position': activeIntent.value
      ? activeIntent.value.position === 'after'
        ? 'bottom'
        : 'inside'
      : undefined,
  }))
  return {
    dragging: drag.dragging,
    over: drop.over,
    edge: drop.edge,
    position: drop.position,
    intent: activeIntent,
    itemProps,
    setItemRef,
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
