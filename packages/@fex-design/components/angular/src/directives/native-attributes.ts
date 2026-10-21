import {
  afterRenderEffect,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  Renderer2,
  type Signal,
} from '@angular/core'

export interface NativeAttributes {
  class?: string | undefined
  style?: string | undefined
  onInput?: (event: Event) => void
  onClick?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
  onKeyDown?: (event: KeyboardEvent) => void
  onKeyUp?: (event: KeyboardEvent) => void
  onPointerDown?: (event: PointerEvent) => void
  onPointerUp?: (event: PointerEvent) => void
  onMouseLeave?: (event: MouseEvent) => void
  onChange?: (event: Event) => void
  [attribute: string]: string | number | boolean | null | ((event: never) => void) | undefined
}

export function connectNativeAttributes(
  source: Signal<NativeAttributes | undefined>,
  options: {
    exclude?: readonly string[]
    handledEvents?: readonly string[]
    captureEvents?: readonly string[]
  } = {},
) {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  const renderer = inject(Renderer2)
  const destroyRef = inject(DestroyRef)
  const excluded = new Set(['class', 'style', ...(options.exclude ?? [])])
  const handledEvents = new Set(options.handledEvents)
  const capturedEvents = new Set(options.captureEvents)
  const events = new Map<string, { handler: (event: never) => void; remove: () => void }>()
  let previous = new Set<string>()
  destroyRef.onDestroy(() => {
    for (const event of events.values()) event.remove()
  })
  // Synchronize native DOM attributes/listeners; component values and business actions remain event driven.
  afterRenderEffect({
    write: () => {
      const next = new Set<string>()
      const nextEvents = new Set<string>()
      for (const [name, value] of Object.entries(source() ?? {})) {
        if (excluded.has(name)) continue
        if (/^on[A-Z]/.test(name)) {
          if (handledEvents.has(name) || typeof value !== 'function') continue
          nextEvents.add(name)
          if (events.get(name)?.handler !== value) {
            events.get(name)?.remove()
            const eventName =
              name === 'onFocus'
                ? 'focusin'
                : name === 'onBlur'
                  ? 'focusout'
                  : name === 'onDoubleClick'
                    ? 'dblclick'
                    : name.slice(2).toLowerCase()
            const handler = value as (event: Event) => void
            events.set(name, {
              handler: value,
              remove: renderer.listen(
                element,
                eventName,
                (event) => {
                  handler(event)
                },
                { capture: capturedEvents.has(name) },
              ),
            })
          }
          continue
        }
        if (typeof value === 'function') continue
        next.add(name)
        const booleanText =
          name.startsWith('aria-') ||
          name.startsWith('data-') ||
          ['draggable', 'spellcheck', 'contenteditable'].includes(name.toLowerCase())
        if (value == null || (value === false && !booleanText))
          renderer.removeAttribute(element, name)
        else
          renderer.setAttribute(element, name, value === true && !booleanText ? '' : String(value))
      }
      for (const name of previous) if (!next.has(name)) renderer.removeAttribute(element, name)
      for (const [name, event] of events)
        if (!nextEvents.has(name)) {
          event.remove()
          events.delete(name)
        }
      previous = next
    },
  })
}

@Directive({ selector: '[nativeAttributes]', standalone: true })
export class NativeAttributesDirective {
  readonly nativeAttributes = input<NativeAttributes>()
  constructor() {
    connectNativeAttributes(this.nativeAttributes, {
      exclude: ['data-slot'],
      captureEvents: ['onKeyDown', 'onMouseLeave'],
    })
  }
}
