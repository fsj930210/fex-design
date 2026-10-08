import type { createCascaderController } from '@fex-design/core/cascader/create-cascader-controller'
import type { CascaderNode, CascaderOption } from '@fex-design/core/cascader/types'
import { createContext, useContext, type JSX } from 'solid-js'
import type { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'

export interface CascaderContextValue {
  controller: ReturnType<typeof createCascaderController>
  snapshot: ReturnType<typeof createCoreStoreSignal>
  selectedPaths: () => readonly (readonly CascaderNode[])[]
  multiple: () => boolean
  expandTrigger: () => 'click' | 'hover'
  showSearch: () => boolean
  clearable: () => boolean
  disabled: () => boolean
  loading: () => boolean
  status: () => 'error' | 'warning' | undefined
  placeholder: () => string | undefined
  displayRender?: (labels: readonly string[], path: readonly CascaderOption[]) => JSX.Element
}

export const CascaderContext = createContext<CascaderContextValue>()

export function useCascader(part: string) {
  const value = useContext(CascaderContext)
  if (!value) throw new Error(`${part} must be used inside CascaderRoot.`)
  return value
}
