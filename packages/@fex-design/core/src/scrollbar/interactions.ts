import { getScrollbarMetrics, type BarElements } from './dom'
import type { ResolvedScrollbarOptions } from './options'

export function bindScrollbarBar(
  elements: BarElements,
  viewport: HTMLElement,
  options: () => ResolvedScrollbarOptions,
  drag: (active: boolean) => void,
) {
  const { axis, bar, track, thumb } = elements
  let endDrag: (() => void) | undefined
  const scrollFromPointer = (event: PointerEvent, grabOffset?: number) => {
    const metrics = getScrollbarMetrics(viewport, axis)
    if (!metrics.maxOffset) return
    const rect = track.getBoundingClientRect()
    const size = axis === 'x' ? rect.width : rect.height
    const pointer = axis === 'x'
      ? metrics.direction === -1 ? rect.right - event.clientX : event.clientX - rect.left
      : event.clientY - rect.top
    const thumbSize = axis === 'x' ? thumb.offsetWidth : thumb.offsetHeight
    const travel = Math.max(size - thumbSize, 0)
    const position = Math.max(0, Math.min(travel, pointer - (grabOffset ?? thumbSize / 2)))
    const offset = position / Math.max(travel, 1) * metrics.maxOffset
    if (axis === 'x') viewport.scrollLeft = metrics.direction * offset
    else viewport.scrollTop = offset
  }
  const onPointerDown = (event: PointerEvent) => {
    if (event.defaultPrevented || options().disabled || event.button !== 0 || !getScrollbarMetrics(viewport, axis).maxOffset) return
    const isThumb = event.target instanceof Node && thumb.contains(event.target)
    if (isThumb && options().dragScroll) {
      endDrag?.()
      event.preventDefault()
      bar.setPointerCapture(event.pointerId)
      thumb.dataset.dragging = 'true'
      drag(true)
      const rect = thumb.getBoundingClientRect()
      const grab = axis === 'x'
        ? getScrollbarMetrics(viewport, axis).direction === -1 ? rect.right - event.clientX : event.clientX - rect.left
        : event.clientY - rect.top
      const move = (next: PointerEvent) => { if (next.pointerId === event.pointerId) scrollFromPointer(next, grab) }
      const end = (next: PointerEvent) => { if (next.pointerId === event.pointerId) endDrag?.() }
      endDrag = () => {
        endDrag = undefined
        thumb.dataset.dragging = 'false'
        bar.removeEventListener('pointermove', move)
        bar.removeEventListener('pointerup', end)
        bar.removeEventListener('pointercancel', end)
        bar.removeEventListener('lostpointercapture', end)
        if (bar.hasPointerCapture(event.pointerId)) bar.releasePointerCapture(event.pointerId)
        drag(false)
      }
      bar.addEventListener('pointermove', move)
      bar.addEventListener('pointerup', end)
      bar.addEventListener('pointercancel', end)
      bar.addEventListener('lostpointercapture', end)
    } else if (!isThumb && options().clickScroll) {
      event.preventDefault()
      if (options().clickScroll === 'jump') scrollFromPointer(event)
      else {
        const metrics = getScrollbarMetrics(viewport, axis)
        const rect = thumb.getBoundingClientRect()
        const before = axis === 'x' ? event.clientX < rect.left + rect.width / 2 : event.clientY < rect.top + rect.height / 2
        const step = (before ? -1 : 1) * metrics.viewportSize
        viewport.scrollBy(axis === 'x' ? { left: step } : { top: step })
      }
    }
  }
  const onWheel = (event: WheelEvent) => {
    const metrics = getScrollbarMetrics(viewport, axis)
    if (event.defaultPrevented || options().disabled || !metrics.maxOffset) return
    event.preventDefault()
    viewport.scrollBy(axis === 'x' ? { left: event.deltaX || metrics.direction * event.deltaY } : { top: event.deltaY })
  }
  bar.addEventListener('pointerdown', onPointerDown)
  bar.addEventListener('wheel', onWheel, { passive: false })
  return {
    cancelDrag: () => endDrag?.(),
    destroy() {
      endDrag?.()
      bar.removeEventListener('pointerdown', onPointerDown)
      bar.removeEventListener('wheel', onWheel)
    },
  }
}
