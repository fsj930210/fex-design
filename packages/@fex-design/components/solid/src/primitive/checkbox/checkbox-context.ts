import type { CheckboxValue } from "@fex-design/core/checkbox/types"
import { createContext, useContext } from "solid-js"

export interface RootContextValue {
  controlId: string
  value?: CheckboxValue
  disabled?: boolean
}

export interface GroupContextValue {
  value: () => CheckboxValue[]
  disabled: () => boolean
  toggle(value: CheckboxValue): void
}

export const RootContext = createContext<RootContextValue>()
export const GroupContext = createContext<GroupContextValue>()

export function useRootContext() {
  return useContext(RootContext)
}

export function useGroupContext() {
  return useContext(GroupContext)
}
