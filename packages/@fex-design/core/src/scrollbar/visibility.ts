import type { ResolvedScrollbarOptions } from './options'

/** Only activity changes visibility; geometry updates must not reset the hide timer. */
export function createScrollbarVisibility(
  options: () => ResolvedScrollbarOptions,
  update: () => void,
) {
  let active = false
  let inside = false
  let dragging = false
  let timer: ReturnType<typeof setTimeout> | undefined
  const clear = () => {
    clearTimeout(timer)
    timer = undefined
  }
  const hideLater = () => {
    clear()
    if (dragging || options().autoHide === 'never' || (options().autoHide === 'leave' && inside))
      return
    timer = setTimeout(() => {
      active = false
      timer = undefined
      update()
    }, options().autoHideDelay)
  }
  const show = () => {
    active = true
    update()
    hideLater()
  }
  return {
    visible: () =>
      options().visibility === 'always' ||
      (options().visibility === 'auto' && (options().autoHide === 'never' || active || dragging)),
    scroll: show,
    move() {
      if (options().autoHide === 'move') show()
    },
    enter() {
      inside = true
      if (options().autoHide === 'leave') show()
    },
    leave() {
      inside = false
      if (options().autoHide === 'leave') hideLater()
    },
    drag(value: boolean) {
      dragging = value
      show()
    },
    configure() {
      clear()
      active = options().autoHide === 'leave' && inside
      update()
    },
    destroy() {
      clear()
      active = inside = dragging = false
    },
  }
}
