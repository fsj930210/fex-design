import type { TreeController, TreeKey, TreeNodeData } from './types'
import type { CheckFeatureApi } from './features/check'
import type { ExpansionFeatureApi } from './features/expansion'
import type { FocusFeatureApi } from './features/focus'
import type { SelectionFeatureApi } from './features/selection'

interface TreeKeyboardEvent {
  key: string
  target: EventTarget | null
  defaultPrevented: boolean
  isComposing?: boolean
  preventDefault(): void
}

function focusNode<T extends TreeNodeData>(
  tree: TreeController<T>,
  root: HTMLElement,
  key: TreeKey,
) {
  if (tree.getItem(key)?.disabled) return
  tree.getFeature<FocusFeatureApi>('focus')?.focus(key)
  const row = Array.from(root.querySelectorAll<HTMLElement>('[role="treeitem"][data-key]')).find(
    (element) => element.dataset.key === String(key) && element.closest('[role="tree"]') === root,
  )
  if (row) root.tabIndex = -1
  row?.focus({ preventScroll: true })
  row?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

export function focusTreeEntry<T extends TreeNodeData>(
  tree: TreeController<T>,
  root: HTMLElement,
  target: EventTarget | null,
  previousTarget?: EventTarget | null,
) {
  if (previousTarget instanceof Node && root.contains(previousTarget)) return
  if (
    target !== root ||
    !tree.hasFeature('keyboard') ||
    root.getAttribute('aria-disabled') === 'true'
  )
    return
  const items = tree.getVisibleItems().filter((item) => !item.disabled)
  const key = items.find((item) => item.key === tree.getSnapshot().focusedKey)?.key ?? items[0]?.key
  if (key !== undefined) focusNode(tree, root, key)
}

export function handleTreeKeyboard<T extends TreeNodeData>(
  tree: TreeController<T>,
  root: HTMLElement,
  event: TreeKeyboardEvent,
) {
  if (
    event.defaultPrevented ||
    event.isComposing ||
    !tree.hasFeature('keyboard') ||
    root.getAttribute('aria-disabled') === 'true'
  )
    return
  const target = event.target
  if (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      (target instanceof HTMLInputElement && target.type !== 'checkbox'))
  )
    return
  if (
    !['ArrowDown', 'ArrowUp', 'Home', 'End', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(
      event.key,
    )
  )
    return
  const items = tree.getVisibleItems().filter((item) => !item.disabled)
  if (!items.length) return
  const row =
    target instanceof Element ? target.closest<HTMLElement>('[role="treeitem"][data-key]') : null
  const current =
    items.find((item) =>
      row ? String(item.key) === row.dataset.key : item.key === tree.getSnapshot().focusedKey,
    ) ?? items[0]!
  const index = items.findIndex((item) => item.key === current.key)
  const focusAt = (next: number) =>
    focusNode(tree, root, items[Math.max(0, Math.min(next, items.length - 1))]!.key)
  const expansion = tree.getFeature<ExpansionFeatureApi>('expansion')
  const forward = getComputedStyle(root).direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight'
  const backward = forward === 'ArrowLeft' ? 'ArrowRight' : 'ArrowLeft'
  event.preventDefault()
  if (event.key === 'ArrowDown') focusAt(index + 1)
  else if (event.key === 'ArrowUp') focusAt(index - 1)
  else if (event.key === 'Home') focusAt(0)
  else if (event.key === 'End') focusAt(items.length - 1)
  else if (event.key === forward) {
    if (!current.isLeaf && !tree.getSnapshot().expandedKeys.includes(current.key))
      expansion?.expand(current.key)
    else {
      const child = items.find((item) => item.parentKey === current.key)
      if (child) focusNode(tree, root, child.key)
    }
  } else if (event.key === backward) {
    if (!current.isLeaf && tree.getSnapshot().expandedKeys.includes(current.key))
      expansion?.collapse(current.key)
    else if (current.parentKey !== null) focusNode(tree, root, current.parentKey)
  } else if (event.key === 'Enter')
    tree.getFeature<SelectionFeatureApi>('selection')?.toggle(current.key)
  else if (event.key === ' ') {
    const check = tree.getFeature<CheckFeatureApi>('check')
    check?.check(current.key, check.getState(current.key) !== true)
  }
}
