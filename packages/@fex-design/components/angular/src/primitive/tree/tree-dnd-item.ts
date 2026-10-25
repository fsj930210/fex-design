import { Directive, ElementRef, HostListener, inject, input, output } from '@angular/core'
import type { OnDestroy, OnInit } from '@angular/core'
import {
  clearCurrentDndSource,
  DND_DRAG_START_X,
  DND_DRAG_START_Y,
  DND_DRAG_START_RECT_X,
  DND_DRAG_START_RECT_Y,
  DND_DRAG_START_RECT_WIDTH,
  DND_DRAG_START_RECT_HEIGHT,
  dropCurrentDndSource,
  moveCurrentDndSource,
  registerDndDropTarget,
  setCurrentDndSource,
} from '@fex-design/core/interactions/dnd-store'
import type { DndFeatureApi, TreeDropIntent } from '@fex-design/core/tree/features/dnd'
import { updateTreeDropIndicator } from '@fex-design/core/tree/drop-indicator-dom'
import { treeDropIndicatorClassName } from '@fex-design/components-styles/tree'
import type {
  TreeDndCallbacks,
  TreeDragEventContext,
  TreeNodeData,
} from '@fex-design/core/tree/types'
import { TreeItem } from './tree-item'
import { getKey, getDragRect, getRect } from './tree-dnd-geometry'

@Directive({
  selector: '[treeDndItem], [treeDraggable]',
  standalone: true,
  host: { '[attr.data-dnd-enabled]': 'canDrag() ? "true" : null' },
})
export class TreeDndItem<TNode extends TreeNodeData = TreeNodeData> implements OnInit, OnDestroy {
  readonly enabled = input(true, { alias: 'treeDndItem' })
  readonly draggable = input<boolean | undefined>(undefined, { alias: 'treeDraggable' })
  readonly callbacks = input<TreeDndCallbacks<TNode> | undefined>(undefined, {
    alias: 'treeDndCallbacks',
  })
  readonly dragStart = output<TreeDragEventContext<TNode>>()
  readonly dragEnd = output<TreeDragEventContext<TNode>>()
  readonly dragEnter = output<TreeDragEventContext<TNode>>()
  readonly dragOver = output<TreeDragEventContext<TNode>>()
  readonly dragLeave = output<TreeDragEventContext<TNode>>()
  readonly drop = output<TreeDragEventContext<TNode>>()
  private readonly item = inject<TreeItem<TNode>>(TreeItem, { self: true })
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  private cleanupDrop: (() => void) | undefined
  private cleanupWindow: (() => void) | undefined
  private preview: HTMLElement | null = null
  private intent: TreeDropIntent | null = null

  ngOnInit() {
    const tree = this.item.root.tree()
    const key = this.item.key()
    const feature = tree.getFeature<DndFeatureApi>('dnd')
    if (!feature) return
    this.cleanupDrop = registerDndDropTarget({
      id: `tree:${String(key)}`,
      element: this.element,
      data: { treeKey: key },
      canDrop: (source) => {
        if (!tree.getItem(key)?.droppable) return false
        const sourceKey = getKey(source.treeKey)
        return (
          sourceKey !== undefined && sourceKey !== key && !tree.getPath(key).includes(sourceKey)
        )
      },
      getPosition: ({ element, pointer, source }) => {
        const value = this.resolve(source, pointer, getRect(element))
        if (!value?.valid) return null
        if (value.position === 'after') return 'bottom'
        return 'inside'
      },
      onDragEnter: (args) => this.handleDragEnter(args),
      onDrag: (args) => this.handleDragOver(args),
      onDragLeave: () => {
        this.updateIntent(null)
        const item = this.item.item()
        if (item) this.emit('dragLeave', { item, targetItem: item })
      },
      onDrop: (args) => {
        const value = this.resolve(args.source, args.pointer, args.targetRect)
        this.updateIntent(null)
        const item = this.item.item()
        if (value?.valid && item) {
          feature?.drop(value)
          this.emit('drop', {
            item,
            targetItem: item,
            sourceItem: this.getSourceItem(args.source),
            event: args.event,
            intent: value,
          })
        }
      },
    })
  }

  ngOnDestroy() {
    updateTreeDropIndicator(this.element, null, treeDropIndicatorClassName)
    this.cleanupDrop?.()
    this.cleanupWindow?.()
    this.clearPreview()
    clearCurrentDndSource()
  }

  protected canDrag() {
    return (
      this.draggable() !== false &&
      this.item.item()?.draggable === true &&
      this.item.root.tree().getFeature<DndFeatureApi>('dnd')?.canDrag(this.item.key()) === true
    )
  }

  @HostListener('pointerdown', ['$event'])
  start(event: PointerEvent) {
    const feature = this.item.root.tree().getFeature<DndFeatureApi>('dnd')
    if (
      event.button !== 0 ||
      !(this.draggable() ?? this.item.item()?.draggable ?? this.enabled()) ||
      feature?.canDrag(this.item.key()) !== true
    )
      return

    event.preventDefault()
    const start = { x: event.clientX, y: event.clientY }
    const bounds = this.element.getBoundingClientRect()

    setCurrentDndSource({
      id: `tree:${String(this.item.key())}`,
      type: 'tree-item',
      treeKey: this.item.key(),
      [DND_DRAG_START_X]: start.x,
      [DND_DRAG_START_Y]: start.y,
      [DND_DRAG_START_RECT_X]: bounds.left,
      [DND_DRAG_START_RECT_Y]: bounds.top,
      [DND_DRAG_START_RECT_WIDTH]: bounds.width,
      [DND_DRAG_START_RECT_HEIGHT]: bounds.height,
    })
    moveCurrentDndSource(start)
    this.element.dataset.dragging = 'true'
    const item = this.item.item()
    if (item) this.emit('dragStart', { item, event })
    this.mountPreview(bounds)

    const move = (pointer: PointerEvent) => {
      const point = { x: pointer.clientX, y: pointer.clientY }
      moveCurrentDndSource(point)
      if (this.preview) {
        this.preview.style.left = `${bounds.left + point.x - start.x}px`
        this.preview.style.top = `${bounds.top + point.y - start.y}px`
      }
    }
    const end = (pointer: PointerEvent) => {
      this.cleanupWindow?.()
      this.cleanupWindow = undefined
      dropCurrentDndSource({ x: pointer.clientX, y: pointer.clientY })
      this.element.dataset.dragging = ''
      const item = this.item.item()
      if (item) this.emit('dragEnd', { item, event: pointer })
      this.clearPreview()
    }

    this.cleanupWindow = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
  }

  private getSourceItem(source: Record<string, unknown>) {
    const key = getKey(source.treeKey)
    return key === undefined ? undefined : this.item.root.tree().getItem(key)
  }
  private handleDragEnter(args: {
    source: Record<string, unknown>
    pointer: { x: number; y: number }
    targetRect: { x: number; y: number; width: number; height: number }
    event?: Event | undefined
  }) {
    const value = this.resolve(args.source, args.pointer, args.targetRect)
    this.updateIntent(value)
    const item = this.item.item()
    if (item)
      this.emit('dragEnter', {
        item,
        targetItem: item,
        sourceItem: this.getSourceItem(args.source),
        event: args.event,
        intent: value,
      })
  }
  private handleDragOver(args: {
    source: Record<string, unknown>
    pointer: { x: number; y: number }
    targetRect: { x: number; y: number; width: number; height: number }
    event?: Event | undefined
  }) {
    const value = this.resolve(args.source, args.pointer, args.targetRect)
    this.updateIntent(value)
    const item = this.item.item()
    if (item)
      this.emit('dragOver', {
        item,
        targetItem: item,
        sourceItem: this.getSourceItem(args.source),
        event: args.event,
        intent: value,
      })
  }

  private emit(
    name: 'dragStart' | 'dragEnd' | 'dragEnter' | 'dragOver' | 'dragLeave' | 'drop',
    context: TreeDragEventContext<TNode>,
  ) {
    this[name].emit(context)
    const callback = {
      dragStart: 'onDragStart',
      dragEnd: 'onDragEnd',
      dragEnter: 'onDragEnter',
      dragOver: 'onDragOver',
      dragLeave: 'onDragLeave',
      drop: 'onDrop',
    }[name] as keyof TreeDndCallbacks<TNode>
    this.callbacks()?.[callback]?.(context)
  }

  private resolve(
    source: Record<string, unknown>,
    pointer: { x: number; y: number },
    targetRect: { x: number; y: number; width: number; height: number },
  ) {
    const sourceKey = getKey(source.treeKey)
    if (sourceKey === undefined) return undefined

    return this.item.root
      .tree()
      .getFeature<DndFeatureApi>('dnd')
      ?.resolve({
        sourceKey,
        targetKey: this.item.key(),
        pointer,
        dragRect: getDragRect(source, pointer),
        targetRect,
        indent: this.item.root.indent(),
      })
  }

  private updateIntent(value: TreeDropIntent | null | undefined) {
    this.intent = value?.valid ? value : null
    this.element.dataset.dropPosition = this.intent
      ? this.intent.position === 'after'
        ? 'bottom'
        : 'inside'
      : ''
    updateTreeDropIndicator(this.element, this.intent, treeDropIndicatorClassName)
  }

  private mountPreview(bounds: DOMRect) {
    this.clearPreview()
    const preview = this.element.cloneNode(true) as HTMLElement
    preview.removeAttribute('id')
    for (const child of preview.querySelectorAll('[id]')) child.removeAttribute('id')
    preview.setAttribute('aria-hidden', 'true')
    preview.setAttribute('data-drag-preview', 'true')
    Object.assign(preview.style, {
      position: 'fixed',
      top: `${bounds.top}px`,
      left: `${bounds.left}px`,
      width: 'max-content',
      maxWidth: 'none',
      height: `${bounds.height}px`,
      marginInlineStart: '0',
      overflow: 'visible',
      opacity: '0.45',
      pointerEvents: 'none',
      zIndex: '20',
      willChange: 'left, top',
    })
    document.body.append(preview)
    this.preview = preview
  }

  private clearPreview() {
    this.preview?.remove()
    this.preview = null
  }
}
