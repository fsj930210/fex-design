import type { ScrollbarController, ScrollbarOptions } from './types'
import { getScrollbarMetrics, getScrollbarParts } from './dom'
import { bindScrollbarBar } from './interactions'
import { resolveScrollbarOptions } from './options'
import { createScrollbarVisibility } from './visibility'

export type {
  ScrollbarAxis, ScrollbarAutoHide, ScrollbarClickScroll, ScrollbarController,
  ScrollbarOptions, ScrollbarRootOptions, ScrollbarOverflow, ScrollbarOverflowMode,
  ScrollbarScrollDetail, ScrollbarVisibility,
  ScrollbarPart,
} from './types'
export { resolveScrollbarOverflow } from './options'

/** A stable DOM controller: configuration updates never reset scroll position or subscriptions. */
export function createScrollbarController(input: ScrollbarOptions = {}): ScrollbarController {
  let options = resolveScrollbarOptions(input)
  let root: HTMLElement | undefined
  let parts: ReturnType<typeof getScrollbarParts> = { viewport: undefined, bars: [] }
  let frame = 0
  let disconnect: (() => void) | undefined
  let unbind: (() => void) | undefined
  let interactions: ReturnType<typeof bindScrollbarBar>[] = []
  const update = () => {
    frame = 0
    if (!parts.viewport) return
    const metricsByAxis = {
      x: getScrollbarMetrics(parts.viewport, 'x'),
      y: getScrollbarMetrics(parts.viewport, 'y'),
    }
    const visible = { x: false, y: false }
    for (const { axis, track } of parts.bars) {
      const metrics = metricsByAxis[axis]
      const trackSize = axis === 'x' ? track.clientWidth : track.clientHeight
      visible[axis] ||= metrics.allowed && visibility.visible() &&
        (options.visibility === 'always' || (metrics.maxOffset > 0 && trackSize > 0))
    }
    // Shared DOM state lets assembled layouts reserve their corner without framework state.
    if (root) {
      root.dataset.scrollbarX = String(visible.x)
      root.dataset.scrollbarY = String(visible.y)
    }
    for (const { axis, bar, track, thumb } of parts.bars) {
      const metrics = metricsByAxis[axis]
      const trackSize = axis === 'x' ? track.clientWidth : track.clientHeight
      const canScroll = metrics.maxOffset > 0 && trackSize > 0
      bar.dataset.visible = String(metrics.allowed && visibility.visible() && (options.visibility === 'always' || canScroll))
      bar.dataset.disabled = String(options.disabled)
      const size = canScroll ? Math.min(trackSize, Math.max(options.minThumbSize,
        trackSize * metrics.viewportSize / metrics.contentSize)) : trackSize
      const offset = canScroll ? (trackSize - size) * metrics.offset / metrics.maxOffset : 0
      if (axis === 'x') {
        thumb.style.width = `${size}px`
        // Anchor at physical left so Viewport direction can differ from the surrounding parts.
        const physicalOffset = metrics.direction === -1 ? trackSize - size - offset : offset
        thumb.style.transform = `translate3d(${physicalOffset}px, 0, 0)`
      } else {
        thumb.style.height = `${size}px`
        thumb.style.transform = `translate3d(0, ${offset}px, 0)`
      }
    }
  }
  const scheduleUpdate = () => { if (root && !frame) frame = requestAnimationFrame(update) }
  const visibility = createScrollbarVisibility(() => options, scheduleUpdate)

  const refreshParts = () => {
    if (!root) return
    const next = getScrollbarParts(root)
    const changed = next.viewport !== parts.viewport || next.bars.length !== parts.bars.length ||
      next.bars.some((bar, index) => {
        const previous = parts.bars[index]
        return !previous || bar.axis !== previous.axis || bar.bar !== previous.bar ||
          bar.track !== previous.track || bar.thumb !== previous.thumb
      })
    if (changed) {
      unbind?.()
      // Axis changes reuse the same Thumb DOM; remove the old controlled dimension.
      for (const bar of next.bars) {
        const previous = parts.bars.find((part) => part.thumb === bar.thumb)
        if (previous && previous.axis !== bar.axis) {
          bar.thumb.style.removeProperty(previous.axis === 'x' ? 'width' : 'height')
        }
      }
      parts = next
      const viewport = next.viewport
      interactions = viewport ? next.bars.map((bar) => bindScrollbarBar(bar, viewport, () => options, visibility.drag)) : []
      const onScroll = () => {
        visibility.scroll()
        if (viewport) options.onScroll?.({ scrollLeft: viewport.scrollLeft, scrollTop: viewport.scrollTop })
      }
      const onWheel = (event: WheelEvent) => {
        if (!viewport || event.defaultPrevented || options.disabled) return
        // Preserve nested scroll regions and native vertical wheel behavior.
        if (event.target instanceof Element && event.target.closest('[data-slot="scrollbar-viewport"]') !== viewport) return
        const x = getScrollbarMetrics(viewport, 'x')
        const y = getScrollbarMetrics(viewport, 'y')
        if (x.maxOffset && (event.shiftKey || (!y.maxOffset && event.deltaY !== 0))) {
          event.preventDefault()
          viewport.scrollBy({ left: event.deltaX || x.direction * event.deltaY, behavior: 'auto' })
        }
      }
      viewport?.addEventListener('scroll', onScroll, { passive: true })
      viewport?.addEventListener('wheel', onWheel, { passive: false })
      const bindings = interactions
      unbind = () => {
        viewport?.removeEventListener('scroll', onScroll)
        viewport?.removeEventListener('wheel', onWheel)
        bindings.forEach((binding) => binding.destroy())
      }
    }
    scheduleUpdate()
  }

  const destroy = () => {
    disconnect?.()
    disconnect = undefined
    unbind?.()
    unbind = undefined
    interactions = []
    visibility.destroy()
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    root = undefined
    parts = { viewport: undefined, bars: [] }
  }

  return {
    connect(nextRoot) {
      destroy()
      root = nextRoot
      const enter = () => visibility.enter()
      const leave = () => visibility.leave()
      const move = (event: PointerEvent) => {
        if (event.target instanceof Element && event.target.closest('[data-slot="scrollbar-root"]') !== nextRoot) return
        visibility.move()
      }
      nextRoot.addEventListener('pointerenter', enter)
      nextRoot.addEventListener('pointerleave', leave)
      nextRoot.addEventListener('pointermove', move, { passive: true })
      // Content size, async parts and CSS changes are external DOM boundaries.
      // Observe content boxes without adding a wrapper or polling every frame.
      const resize = new ResizeObserver(scheduleUpdate)
      let observed = new Set<Element>()
      const observeSizes = () => {
        const viewport = parts.viewport
        const next = new Set<Element>([nextRoot,
          ...(viewport ? [viewport, ...Array.from(viewport.children)] : []),
          ...parts.bars.flatMap(({ bar, track }) => [bar, track])])
        for (const element of observed) if (!next.has(element)) resize.unobserve(element)
        for (const element of next) if (!observed.has(element)) resize.observe(element)
        observed = next
      }
      const mutation = new MutationObserver((records) => {
        const relevant = records.filter((record) => {
          const target = record.target instanceof Element ? record.target : record.target.parentElement
          return target?.closest('[data-slot="scrollbar-root"]') === nextRoot &&
            !target.closest('[data-slot="scrollbar-thumb"]')
        })
        if (!relevant.length) return
        if (relevant.some((record) => record.type === 'childList' || record.attributeName === 'data-slot' || record.attributeName === 'data-axis')) {
          refreshParts()
          observeSizes()
        } else scheduleUpdate()
      })
      mutation.observe(nextRoot, { subtree: true, childList: true, characterData: true,
        attributes: true, attributeFilter: ['class', 'style', 'dir', 'data-axis', 'data-slot'] })
      refreshParts()
      observeSizes()
      nextRoot.addEventListener('load', scheduleUpdate, true)
      nextRoot.addEventListener('transitionend', scheduleUpdate)
      nextRoot.addEventListener('animationend', scheduleUpdate)
      if (nextRoot.matches(':hover')) enter()
      disconnect = () => {
        mutation.disconnect()
        resize.disconnect()
        nextRoot.removeEventListener('pointerenter', enter)
        nextRoot.removeEventListener('pointerleave', leave)
        nextRoot.removeEventListener('pointermove', move)
        nextRoot.removeEventListener('load', scheduleUpdate, true)
        nextRoot.removeEventListener('transitionend', scheduleUpdate)
        nextRoot.removeEventListener('animationend', scheduleUpdate)
      }
      // A stale ref cleanup must not disconnect a later Root connection.
      const connection = disconnect
      return () => { if (disconnect === connection) destroy() }
    },
    setOptions(next) {
      const resolved = resolveScrollbarOptions(next)
      const policyChanged = resolved.autoHide !== options.autoHide || resolved.visibility !== options.visibility ||
        resolved.autoHideDelay !== options.autoHideDelay
      const geometryChanged = resolved.minThumbSize !== options.minThumbSize || resolved.disabled !== options.disabled
      options = resolved
      if (options.disabled || !options.dragScroll) interactions.forEach((binding) => binding.cancelDrag())
      if (policyChanged) visibility.configure()
      if (geometryChanged) scheduleUpdate()
    },
    update() { refreshParts() },
    scrollTo(next) { parts.viewport?.scrollTo(next) },
    scrollBy(next) { parts.viewport?.scrollBy(next) },
    destroy,
  }
}
