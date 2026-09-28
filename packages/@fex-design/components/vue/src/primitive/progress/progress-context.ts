import type { ProgressContextValue } from '@fex-design/core/progress/types'
import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export const progressContextKey: InjectionKey<ComputedRef<ProgressContextValue>> =
  Symbol('progressContext')

export function useProgressContext(componentName: string): ComputedRef<ProgressContextValue> {
  const context = inject(progressContextKey)
  if (!context) {
    throw new Error(`${componentName} must be used inside Progress.`)
  }
  return context
}
