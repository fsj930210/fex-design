import { createContext, use } from 'react'
import type { useInputNumber } from './use-input-number'

export type InputNumberContextValue = ReturnType<typeof useInputNumber>

export const InputNumberContext = createContext<InputNumberContextValue | null>(null)

export function useInputNumberContext(component: string) {
  const context = use(InputNumberContext)
  if (!context) throw new Error(`${component} must be used inside InputNumberRoot.`)
  return context
}
