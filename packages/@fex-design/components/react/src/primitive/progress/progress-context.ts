import { createContext, use } from "react"
import type { ProgressContextValue } from "@fex-design/core/progress/types"

export const ProgressContext = createContext<ProgressContextValue | null>(null)

export function useProgressContext(componentName: string): ProgressContextValue {
  const context = use(ProgressContext)
  if (!context) {
    throw new Error(`${componentName} must be used inside Progress.`)
  }
  return context
}
