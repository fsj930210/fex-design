import { getContext, setContext } from 'svelte'
import type { UseInputNumberReturn } from './use-input-number.svelte'
const key = Symbol('InputNumber')
export const setInputNumberContext = (value: UseInputNumberReturn) => setContext(key, value)
export function getInputNumberContext(component: string) {
  const value = getContext<UseInputNumberReturn>(key)
  if (!value) throw new Error(`${component} must be used inside InputNumberRoot.`)
  return value
}
