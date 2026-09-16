import { createContext, use } from 'react'
import type { UseInputNumberReturn } from './use-input-number'

export const InputNumberContext = createContext<UseInputNumberReturn | null>(null)

export function useInputNumberContext(component: string) {
  const context = use(InputNumberContext)
  if (!context) throw new Error(`${component} must be used inside InputNumberRoot.`)
  return context
}
