import { createExpansionController } from "@fex-design/core/expansion/create-expansion-controller"
import type { ExpansionChangeMeta, ExpansionKey } from "@fex-design/core/expansion/types"
import { collapseRootClassName } from "@fex-design/components-styles/collapse"
import { cn } from "@fex-design/utils"
import {
  createEffect,
  createMemo,
  createUniqueId,
  mergeProps,
  splitProps,
  type JSX,
  type ParentProps,
} from "solid-js"
import { createCoreStoreSignal } from "@fex-design/solid/primitives/create-core-store-signal"
import {
  CollapseContext,
  type CollapseContextValue,
  type CollapseRef,
  type CollapseSize,
  type CollapseVariant,
} from "./collapse-context"

export interface CollapseProps
  extends ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, "children" | "onChange">> {
  expandedKeys?: readonly ExpansionKey[]
  defaultExpandedKeys?: readonly ExpansionKey[]
  disabledKeys?: readonly ExpansionKey[]
  multiple?: boolean
  collapsible?: boolean
  variant?: CollapseVariant
  size?: CollapseSize
  ref?: (instance: CollapseRef) => void
  onChange?: (keys: ExpansionKey[], meta: ExpansionChangeMeta) => void
}
export type CollapseRootProps = CollapseProps

export function Collapse(props: CollapseProps) {
  const merged = mergeProps(
    { variant: "outlined" as CollapseVariant, size: "md" as CollapseSize, collapsible: true },
    props,
  )
  const [local, rest] = splitProps(merged, [
    "expandedKeys",
    "defaultExpandedKeys",
    "disabledKeys",
    "multiple",
    "collapsible",
    "variant",
    "size",
    "class",
    "children",
    "ref",
    "onChange",
  ])
  const baseId = createUniqueId()
  const controller = createExpansionController({
    ...(local.expandedKeys === undefined ? {} : { expandedKeys: local.expandedKeys }),
    ...(local.defaultExpandedKeys === undefined ? {} : { defaultExpandedKeys: local.defaultExpandedKeys }),
    ...(local.disabledKeys === undefined ? {} : { disabledKeys: local.disabledKeys }),
    ...(local.multiple === undefined ? {} : { multiple: local.multiple }),
    ...(local.collapsible === undefined ? {} : { collapsible: local.collapsible }),
    ...(local.onChange === undefined ? {} : { onChange: local.onChange }),
  })
  const snapshot = createCoreStoreSignal(controller)
  createEffect(() => {
    if (local.expandedKeys !== undefined) controller.setExpandedKeys(local.expandedKeys)
  })
  createEffect(() => {
    if (local.disabledKeys !== undefined) controller.setDisabledKeys(local.disabledKeys)
  })
  const api: CollapseRef = {
    expand: (key) => controller.expand(key),
    collapse: (key) => controller.collapse(key),
    toggle: (key) => controller.toggle(key),
    setExpandedKeys: (keys) => controller.setExpandedKeys(keys),
    clear: () => controller.clear(),
    getExpandedKeys: () => controller.getSnapshot().expandedKeys,
    isExpanded: (key) => controller.isExpanded(key),
    isDisabled: (key) => controller.isDisabled(key),
  }
  local.ref?.(api)
  const context: CollapseContextValue = {
    ...api,
    baseId,
    snapshot,
    variant: () => local.variant,
    size: () => local.size,
  }
  return (
    <CollapseContext.Provider value={context}>
      <div
        {...rest}
        data-slot="collapse"
        data-variant={local.variant}
        class={cn(collapseRootClassName({ variant: local.variant, size: local.size }), local.class)}
      >
        {local.children}
      </div>
    </CollapseContext.Provider>
  )
}

export { Collapse as CollapseRoot }
