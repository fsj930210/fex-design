import { createContext, use } from 'react'
import { useMemoizedFn } from './use-memoized-fn'
export type NativeControlTarget = (element: HTMLElement) => () => void
export const NativeControlTargetContext = createContext<NativeControlTarget | null>(null)
/** Optional native-element registration for composed controls, independent of any form engine. */
export function useNativeControlTarget() {
  const register = use(NativeControlTargetContext)
  return useMemoizedFn((element: HTMLElement | null) => (element ? register?.(element) : undefined))
}
