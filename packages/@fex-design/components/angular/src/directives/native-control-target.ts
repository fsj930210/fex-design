import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  inject,
} from '@angular/core'
export type NativeControlTargetRegistration = (element: HTMLElement) => () => void
export const NATIVE_CONTROL_TARGET = new InjectionToken<NativeControlTargetRegistration>(
  'native-control-target',
)
/** Optional native-element registration; controls do not depend on a form implementation. */
@Directive({
  selector:
    'input[nativeControlTarget],select[nativeControlTarget],textarea[nativeControlTarget],button[nativeControlTarget]',
  standalone: true,
})
export class NativeControlTarget {
  constructor() {
    const register = inject(NATIVE_CONTROL_TARGET, { optional: true })
    if (!register) return
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    let detach: (() => void) | undefined
    const scheduled = afterNextRender(() => {
      detach = register(element)
    })
    inject(DestroyRef).onDestroy(() => {
      scheduled.destroy()
      detach?.()
    })
  }
}
