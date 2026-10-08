import type { SelectionChangeMeta, SelectionValue } from "@fex-design/core/selection/types"
import { createContext, useContext } from "solid-js"

export type RadioValue = SelectionValue

export interface RadioChangeMeta {
  previousValue: RadioValue | undefined
  value: RadioValue
  changedValues: SelectionChangeMeta["changedValues"]
}

export interface RadioContextValue {
  value: () => RadioValue | undefined
  disabled: () => boolean
  select: (value: RadioValue) => void
}

export const RadioContext = createContext<RadioContextValue>()

export function useRadioContext(componentName: string) {
  const context = useContext(RadioContext)
  if (!context) throw new Error(`${componentName} must be used inside RadioGroup.`)
  return context
}
