import { afterNextRender, DestroyRef, ElementRef, inject, Renderer2 } from '@angular/core'

/** Register during construction; caller template listeners run before primitive actions. */
export function listenNativeEvent<TKey extends keyof HTMLElementEventMap>(
  type: TKey,
  handler: (event: HTMLElementEventMap[TKey]) => void,
) {
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  const renderer = inject(Renderer2)
  const destroyRef = inject(DestroyRef)
  // DOM subscription is installed after the view's native bindings, and removed on destroy.
  afterNextRender({ write: () => {
    const cleanup = renderer.listen(element, type, event => handler(event as HTMLElementEventMap[TKey]))
    destroyRef.onDestroy(cleanup)
  } })
}
