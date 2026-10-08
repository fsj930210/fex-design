import type { ExpansionKey } from "@fex-design/core/expansion/types"
import type { CollapseStyleProps } from "@fex-design/components-styles/collapse"
import { createContext, useContext, type Accessor } from "solid-js"

export type CollapseVariant = NonNullable<CollapseStyleProps["variant"]>
export type CollapseSize = NonNullable<CollapseStyleProps["size"]>

export interface CollapseRef {
  expand: (key: ExpansionKey) => void
  collapse: (key: ExpansionKey) => void
  toggle: (key: ExpansionKey) => void
  setExpandedKeys: (keys: ExpansionKey[]) => void
  clear: () => void
  getExpandedKeys: () => ExpansionKey[]
  isExpanded: (key: ExpansionKey) => boolean
  isDisabled: (key: ExpansionKey) => boolean
}

export interface CollapseContextValue extends CollapseRef {
  baseId: string
  snapshot: () => { expandedKeys: ExpansionKey[]; multiple: boolean }
  variant: () => CollapseVariant
  size: () => CollapseSize
}

export interface CollapseItemContextValue {
  value: ExpansionKey
  disabled: () => boolean
  triggerId: string
  contentId: string
}

export const CollapseContext = createContext<CollapseContextValue>()
export const CollapseItemContext = createContext<CollapseItemContextValue>()

export function useCollapseContext() {
  const context = useContext(CollapseContext)
  if (!context) throw new Error("Collapse parts must be inside Collapse")
  return context
}

export function useCollapseItemContext() {
  const context = useContext(CollapseItemContext)
  if (!context) throw new Error("CollapseItem parts must be inside CollapseItem")
  return context
}
