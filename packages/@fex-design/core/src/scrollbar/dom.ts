import type { ScrollbarAxis } from './types'

export type BarElements = { axis: ScrollbarAxis; bar: HTMLElement; track: HTMLElement; thumb: HTMLElement }

/** Nested Scrollbar roots own their own parts and must never be bound by an ancestor. */
export function getScrollbarParts(root: HTMLElement) {
  const owned = (element: Element) => element.closest('[data-slot="scrollbar-root"]') === root
  const viewport = Array.from(root.querySelectorAll<HTMLElement>('[data-slot="scrollbar-viewport"]')).find(owned)
  const bars: BarElements[] = []
  for (const bar of root.querySelectorAll<HTMLElement>('[data-slot="scrollbar-bar"]')) {
    if (!owned(bar)) continue
    const axis = bar.dataset.axis
    const belongs = (element: Element) => owned(element) && element.closest('[data-slot="scrollbar-bar"]') === bar
    const track = Array.from(bar.querySelectorAll<HTMLElement>('[data-slot="scrollbar-track"]')).find(belongs)
    const thumb = track && Array.from(track.querySelectorAll<HTMLElement>('[data-slot="scrollbar-thumb"]')).find(belongs)
    if ((axis === 'x' || axis === 'y') && track && thumb) bars.push({ axis, bar, track, thumb })
  }
  return { viewport, bars }
}

export function getScrollbarMetrics(viewport: HTMLElement, axis: ScrollbarAxis) {
  const x = axis === 'x'
  const viewportSize = x ? viewport.clientWidth : viewport.clientHeight
  const contentSize = x ? viewport.scrollWidth : viewport.scrollHeight
  const style = getComputedStyle(viewport)
  const allowed = (x ? style.overflowX : style.overflowY) !== 'hidden'
  const direction = x && style.direction === 'rtl' ? -1 : 1
  const maxOffset = allowed ? Math.max(contentSize - viewportSize, 0) : 0
  // CSSOM scrollLeft is negative towards inline-end in RTL; geometry uses logical distance.
  const offset = Math.max(0, Math.min(maxOffset, x ? direction * viewport.scrollLeft : viewport.scrollTop))
  return { viewportSize, contentSize, allowed, offset, maxOffset, direction }
}
