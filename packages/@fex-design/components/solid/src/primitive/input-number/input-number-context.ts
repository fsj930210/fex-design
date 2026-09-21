import { createContext, useContext } from 'solid-js'
import type { UseInputNumberReturn } from './use-input-number'
export const InputNumberContext = createContext<UseInputNumberReturn>()
export function useInputNumberContext(component: string) {
  const value = useContext(InputNumberContext)
  if (!value) throw new Error(`${component} must be used inside InputNumberRoot.`)
  return value
}
