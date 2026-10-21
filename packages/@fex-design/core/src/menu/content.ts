import { createPopover } from '../popover/create-popover'
import { splitPopoverOptions } from '../popover/options'
import { shallowEqualObject } from '@fex-design/utils'
import type { PopoverOptions } from '../popover/types'
import type { MenuDomBinding, MenuDomContent } from './dom-types'
import { getMenuBranchStore, resolveMenuPopupContainer } from './branch'

let nextId = 0
const noTriggers: NonNullable<PopoverOptions['trigger']> = []
const menuDismiss = { escapeKey: false, outsidePointer: false }

export function syncMenuContent(binding: MenuDomBinding, content: MenuDomContent) {
  const state = binding.controller.getSnapshot(),
    { element, branch } = content
  const inline = state.layout === 'inline'
  let open = !branch || (!state.disabled && state.openValues.includes(branch.value()))
  let ancestor = branch
  while (ancestor && open) {
    if (
      !state.openValues.includes(ancestor.value()) ||
      binding.controller.getNode(ancestor.value())?.disabled
    )
      open = false
    ancestor = ancestor.parent
  }
  element.dir = state.dir
  element.dataset.layout = state.layout
  element.dataset.size = state.size
  element.setAttribute('role', !branch && state.layout === 'horizontal' ? 'menubar' : 'menu')
  element.setAttribute(
    'aria-orientation',
    !branch && state.layout === 'horizontal' ? 'horizontal' : 'vertical',
  )
  if (!element.id) element.id = 'menu-content-' + ++nextId
  if (!branch) return
  const trigger = [...binding.items.values()].find((item) => item.branch === branch)?.element
  if (trigger) {
    if (!trigger.id) trigger.id = 'menu-trigger-' + ++nextId
    element.setAttribute('aria-labelledby', trigger.id)
    trigger.setAttribute('aria-controls', element.id)
  }
  if (!open && element.contains(element.ownerDocument.activeElement))
    trigger?.focus({ preventScroll: true })
  const presence = getMenuBranchStore(branch)
  const publish = (next: ReturnType<typeof presence.getSnapshot>) => {
    const resolved = { ...next, popoverProps: branch.popoverProps?.() }
    if (!shallowEqualObject(presence.getSnapshot(), resolved)) presence.setSnapshot(resolved)
    const hidden = next.phase === 'closed'
    if (element.hidden !== hidden) element.hidden = hidden
    if (element.inert === next.open) element.inert = !next.open
    element.dataset.state = next.open ? 'open' : 'closed'
    element.dataset.phase = next.phase
  }
  if (inline) {
    content.stopOverlay?.()
    content.stopOverlay = undefined
    content.overlay?.destroy()
    content.overlay = undefined
    content.configuration = undefined
    content.reference = undefined
    content.restore()
    publish({ mounted: true, open, phase: open ? 'open' : 'closed', container: null })
    for (const name of ['position', 'left', 'top', 'transform-origin', 'z-index'])
      element.style.removeProperty(name)
    return
  }
  if (!content.overlay) {
    const parentOverlay = [...binding.contents].find(
      (candidate) => candidate.branch === branch.parent,
    )?.overlay
    content.overlay = createPopover({ open: false, dismiss: menuDismiss }, parentOverlay)
  }
  const overlay = content.overlay
  const container = resolveMenuPopupContainer(binding, branch, content.options().container)
  const [popupOptions] = splitPopoverOptions(branch.popoverProps?.() ?? {})
  const configuration: PopoverOptions = {
    side:
      !branch.parent && state.layout === 'horizontal'
        ? 'bottom'
        : state.dir === 'rtl'
          ? 'left'
          : 'right',
    align: 'start',
    strategy: 'fixed',
    sideOffset: 4,
    ...popupOptions,
    open,
    trigger: noTriggers,
    dismiss: menuDismiss,
    // Menu owns disclosure; reference detachment must update the same open path.
    onOpenChange:
      content.configuration?.onOpenChange ??
      ((next, info) => {
        if (!next)
          binding.controller.setOpen(branch.value(), false, {
            value: branch.value(),
            reason: 'outside',
            event: info.event instanceof Event ? info.event : undefined,
          })
      }),
  }
  if (!content.configuration || !shallowEqualObject(content.configuration, configuration)) {
    content.configuration = configuration
    overlay.setOptions(configuration)
  }
  if (content.reference !== (trigger ?? null)) {
    content.reference = trigger ?? null
    overlay.setReferenceElement(content.reference)
    overlay.setFloatingElement(element)
  }
  content.stopOverlay?.()
  const syncPresence = () => {
    const snapshot = overlay.getSnapshot()
    element.dataset.side = snapshot.side
    element.dataset.align = snapshot.align
    element.dataset.placement = snapshot.placement
    publish({ mounted: snapshot.mounted, open: snapshot.open, phase: snapshot.phase, container })
  }
  content.stopOverlay = overlay.subscribe(syncPresence)
  syncPresence()
  element.style.position = 'var(--floating-strategy, fixed)'
  element.style.left = 'var(--floating-x, 0px)'
  element.style.top = 'var(--floating-y, 0px)'
  element.style.transformOrigin = 'var(--floating-transform-origin)'
  element.style.zIndex = 'var(--floating-z-index, 50)'
}
