/** Resolve motion at the DOM boundary, including explicit smooth scroll requests. */
export function getTimePickerScrollBehavior(behavior: ScrollBehavior): ScrollBehavior {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : behavior
}

/** Portaled panels inherit their trigger's writing direction, including CSS direction. */
export function getTimePickerDirection(reference: HTMLElement | null | undefined): 'ltr' | 'rtl' {
  return reference?.ownerDocument.defaultView?.getComputedStyle(reference).direction === 'rtl'
    ? 'rtl'
    : 'ltr'
}
