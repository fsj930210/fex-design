const OVERLAY_GAP = 4
const OVERLAY_SAFE_AREA = 32

function isVisible(element: HTMLElement) {
  const style = getComputedStyle(element)
  return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0
}

function measureRuntimeHeight(runtime: HTMLElement) {
  const runtimeStyle = getComputedStyle(runtime)
  const paddingBottom = Number.parseFloat(runtimeStyle.paddingBottom) || 0
  let height = runtime.scrollHeight

  const overlays = document.body.querySelectorAll<HTMLElement>(
    '[data-side], [role="listbox"], [role="menu"], [role="dialog"]',
  )
  for (const overlay of overlays) {
    if (!isVisible(overlay)) continue

    const overlayRect = overlay.getBoundingClientRect()
    const overlayHeight = overlay.hasAttribute('data-side')
      ? Math.max(overlayRect.height, overlay.scrollHeight)
      : overlayRect.height
    height = Math.max(height, overlayRect.top + overlayHeight + paddingBottom + OVERLAY_SAFE_AREA)

    if (!overlay.id) continue
    const trigger = document.querySelector<HTMLElement>(`[aria-controls="${CSS.escape(overlay.id)}"]`)
    if (!trigger) continue

    const triggerRect = trigger.getBoundingClientRect()
    height = Math.max(
      height,
      triggerRect.bottom + OVERLAY_GAP + overlayHeight + paddingBottom + OVERLAY_SAFE_AREA,
    )
  }

  return Math.ceil(height)
}

export function observeRuntimeHeight(runtime: HTMLElement, onHeightChange: (height: number) => void) {
  let frame = 0
  let lastHeight = 0

  const measure = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      const height = measureRuntimeHeight(runtime)
      if (height === lastHeight) return
      lastHeight = height
      onHeightChange(height)
    })
  }

  const resizeObserver = new ResizeObserver(measure)
  const mutationObserver = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type !== 'childList') continue
      for (const node of record.addedNodes) {
        if (!(node instanceof HTMLElement)) continue
        resizeObserver.observe(node)
        for (const element of node.querySelectorAll<HTMLElement>('*')) resizeObserver.observe(element)
      }
    }
    measure()
  })

  resizeObserver.observe(runtime)
  mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true })
  const dismissOverlay = () => {
    const target = document.activeElement instanceof HTMLElement ? document.activeElement : runtime
    target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
  }
  window.addEventListener('blur', dismissOverlay)
  measure()

  return () => {
    cancelAnimationFrame(frame)
    resizeObserver.disconnect()
    mutationObserver.disconnect()
    window.removeEventListener('blur', dismissOverlay)
  }
}
