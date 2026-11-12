export interface FormControlTargetOptions {
  onTarget?: (element: HTMLElement, originalId: string | undefined) => (() => void) | void
  onBlur?: (event: FocusEvent) => void
  target?: () => HTMLElement | null
}

function isControl(element: HTMLElement) {
  return element.matches(
    'input:not([type="hidden"]),select,textarea,button,[role="combobox"],[role="checkbox"],[role="switch"],[role="radio"],[role="radiogroup"],[role="slider"],[role="group"]',
  )
}

/** Native parts register their actual element; no wrapper, DOM search or observer is needed. */
export function createFormControlTarget(options: FormControlTargetOptions) {
  const controls = new Map<HTMLElement, number>()
  const previous = new Map<string, string | null>()
  let element: HTMLElement | null = null
  let attributes: Record<string, string | boolean | undefined> = {}
  let detach: (() => void) | void
  let generation = 0
  let updating = false
  let pending = false
  let closing = false
  const blur = (event: Event) => options.onBlur?.(event as FocusEvent)
  const release = () => {
    if (!element) return
    element.removeEventListener('blur', blur)
    for (const [name, value] of previous) {
      if (value === null) element.removeAttribute(name)
      else element.setAttribute(name, value)
    }
    previous.clear()
    const cleanup = detach
    detach = undefined
    element = null
    cleanup?.()
  }
  const update = (next = attributes) => {
    if (closing) return
    attributes = next
    // Association callbacks may synchronously notify a framework reader; finish this transition first.
    if (updating) {
      pending = true
      return
    }
    updating = true
    try {
      do {
        pending = false
        const target = options.target?.() ?? controls.keys().next().value ?? null
        if (target !== element) {
          release()
          element = target
          if (element) {
            detach = options.onTarget?.(element, element.id || undefined)
            element.addEventListener('blur', blur)
          }
        }
        if (!element) continue
        for (const [name, value] of Object.entries(attributes)) {
          if (!previous.has(name)) previous.set(name, element.getAttribute(name))
          const resolved =
            name === 'aria-describedby' || name === 'aria-labelledby'
              ? [
                  ...new Set(
                    [previous.get(name), value]
                      .filter(Boolean)
                      .flatMap((item) => String(item).split(/\s+/)),
                  ),
                ].join(' ') || undefined
              : value
          if (resolved === undefined) {
            if (element.hasAttribute(name)) element.removeAttribute(name)
          } else if (element.getAttribute(name) !== String(resolved))
            element.setAttribute(name, String(resolved))
        }
      } while (pending)
    } finally {
      updating = false
    }
  }
  return {
    register: (control: HTMLElement) => {
      if (!control || typeof control.matches !== 'function' || !isControl(control)) return () => {}
      const epoch = generation
      controls.set(control, (controls.get(control) ?? 0) + 1)
      update()
      return () => {
        if (epoch !== generation) return
        const count = (controls.get(control) ?? 1) - 1
        if (count) controls.set(control, count)
        else controls.delete(control)
        update()
      }
    },
    update,
    element: () => element,
    destroy: () => {
      closing = true
      try {
        generation++
        controls.clear()
        attributes = {}
        release()
      } finally {
        closing = false
        pending = false
      }
    },
  }
}
