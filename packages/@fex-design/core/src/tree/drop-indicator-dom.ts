import type { TreeDropIntent } from './features/dnd'

/** DOM adapter utility. Position the indicator without exposing geometry as CSS variables. */
export function updateTreeDropIndicator(
  row: HTMLElement | null,
  intent: TreeDropIntent | null | undefined,
  className: string,
) {
  if (!row) return
  let indicator = row.querySelector<HTMLElement>(':scope > [data-tree-dnd-indicator]')
  if (!intent?.valid) {
    indicator?.remove()
    return
  }
  if (!indicator) {
    indicator = row.ownerDocument.createElement('span')
    indicator.dataset.treeDndIndicator = ''
    indicator.dataset.slot = 'tree-drop-indicator'
    indicator.setAttribute('aria-hidden', 'true')
    row.append(indicator)
  }
  const bounds = row.getBoundingClientRect()
  const title = row.querySelector<HTMLElement>('[data-slot="tree-title"]')
  const titleOffset = title ? title.getBoundingClientRect().left - bounds.left : 0
  const right =
    row.closest<HTMLElement>('[data-slot="tree"]')?.getBoundingClientRect().right ?? bounds.right
  const left = titleOffset + intent.indicatorOffset
  indicator.className = className
  indicator.dataset.position = intent.position
  Object.assign(indicator.style, {
    left: left + 'px',
    width: Math.max(0, right - bounds.left - left) + 'px',
    bottom: '0px',
    transform: 'translateY(1px)',
  })
}
