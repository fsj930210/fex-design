import { getContext, setContext } from 'svelte'
export type NativeControlTarget = (element: HTMLElement) => () => void
const nativeControlTargetKey = Symbol('native-control-target')
export function provideNativeControlTarget(register: NativeControlTarget) {
  setContext(nativeControlTargetKey, register)
}
export function getNativeControlTarget() {
  return getContext<NativeControlTarget | undefined>(nativeControlTargetKey)
}
