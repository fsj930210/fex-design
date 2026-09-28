import type { ProgressContextValue } from "@fex-design/core/progress/types"

export const progressContextKey = Symbol("progress-context")

export interface ProgressContext {
  context: () => ProgressContextValue
}
