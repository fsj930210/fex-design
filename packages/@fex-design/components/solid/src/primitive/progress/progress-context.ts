import { createContext, useContext, type Accessor } from "solid-js"
import type { ProgressContextValue } from "@fex-design/core/progress/types"

export const ProgressContext = createContext<Accessor<ProgressContextValue>>()

export function useProgressContext(componentName: string): Accessor<ProgressContextValue> {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error(`${componentName} must be used inside Progress.`)
  }
  return context
}
