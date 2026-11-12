import { inject, watch, type InjectionKey } from 'vue'
export type NativeControlTarget = (element: HTMLElement) => () => void
export const nativeControlTargetKey: InjectionKey<NativeControlTarget> =
  Symbol('native-control-target')
/** Only the element lifecycle is observed; no control value or validation state is stored here. */
export function useNativeControlTarget(element: () => HTMLElement | null | undefined) {
  const register = inject(nativeControlTargetKey, null)
  if (register)
    watch(
      element,
      (target, _previous, cleanup) => {
        if (target) cleanup(register(target))
      },
      { immediate: true, flush: 'post' },
    )
}
