import { createContext, useContext } from "solid-js"
import type { createInput } from "./create-input"

export type InputContextValue = ReturnType<typeof createInput>
export const InputContext = createContext<InputContextValue>()

export function useInputContext(name: string) {
  const context = useContext(InputContext)
  if (!context) throw new Error(`${name} must be used inside InputRoot.`)
  return context
}
