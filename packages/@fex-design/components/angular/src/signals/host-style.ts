import { afterEveryRender, ElementRef, inject, signal } from '@angular/core'

/** Read native host style after Angular bindings commit so composed parts can merge it. */
export function createHostStyle() {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  const value = signal(element.getAttribute('style') ?? '')
  // This observes the native DOM binding boundary, not component or business state.
  afterEveryRender({ read: () => {
    const next = element.getAttribute('style') ?? ''
    if (next !== value()) value.set(next)
  } })
  return value.asReadonly()
}
