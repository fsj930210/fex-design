import { collapseItemClassName } from "@fex-design/components-styles/collapse"
import type { ExpansionKey } from "@fex-design/core/expansion/types"
import { cn } from "@fex-design/utils"
import { createMemo, createUniqueId, splitProps, type JSX } from "solid-js"
import {
  CollapseItemContext,
  useCollapseContext,
  type CollapseItemContextValue,
} from "./collapse-context"

export interface CollapseItemProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> {
  value: ExpansionKey
  disabled?: boolean
  children?:
    | JSX.Element
    | ((value: {
        state: { expanded: boolean; disabled: boolean }
        actions: { expand: () => void; collapse: () => void; toggle: () => void }
      }) => JSX.Element)
}

export function CollapseItem(props: CollapseItemProps) {
  const [local, rest] = splitProps(props, ["value", "disabled", "class", "children"])
  const collapse = useCollapseContext()
  const safeValue = String(local.value).replace(/\s+/g, "-") || createUniqueId()
  const state = createMemo(() => ({
    expanded: collapse.snapshot().expandedKeys.includes(local.value),
    disabled: local.disabled === true || collapse.isDisabled(local.value),
  }))
  const context: CollapseItemContextValue = {
    value: local.value,
    disabled: () => state().disabled,
    triggerId: collapse.baseId + "-" + safeValue + "-trigger",
    contentId: collapse.baseId + "-" + safeValue + "-content",
  }
  return (
    <CollapseItemContext.Provider value={context}>
      <div
        {...rest}
        data-slot="collapse-item"
        data-state={state().expanded ? "open" : "closed"}
        data-disabled={state().disabled || undefined}
        class={cn(collapseItemClassName({ variant: collapse.variant() }), local.class)}
      >
        {typeof local.children === "function"
          ? local.children({
              state: state(),
              actions: {
                expand: () => collapse.expand(local.value),
                collapse: () => collapse.collapse(local.value),
                toggle: () => collapse.toggle(local.value),
              },
            })
          : local.children}
      </div>
    </CollapseItemContext.Provider>
  )
}
