import { createContext, onCleanup, onMount, useContext } from 'solid-js'
export type NativeControlTarget = (element: HTMLElement) => () => void
export const NativeControlTargetContext = createContext<NativeControlTarget>()
export function useNativeControlTarget() {
  const register = useContext(NativeControlTargetContext)
  let detach: (() => void) | undefined
  let element: HTMLElement | undefined
  let mounted = false
  const attach = (target: HTMLElement) => {
    detach?.()
    detach = register?.(target)
  }
  onMount(() => {
    mounted = true
    if (element) attach(element)
  })
  onCleanup(() => detach?.())
  return (target: HTMLElement) => {
    element = target
    if (mounted) attach(target)
  }
}
