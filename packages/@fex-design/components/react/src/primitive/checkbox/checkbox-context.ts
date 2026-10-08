import type { CheckboxValue } from "@fex-design/core/checkbox/types"
import { createContext } from "react"

export interface RootContextValue {
  controlId: string
  value?: CheckboxValue
  disabled?: boolean
}

export interface GroupContextValue {
  value: CheckboxValue[]
  disabled: boolean
  toggle: (value: CheckboxValue) => void
}

export const RootContext = createContext<RootContextValue | null>(null)
export const GroupContext = createContext<GroupContextValue | null>(null)
