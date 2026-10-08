import { collapseItemClassName } from "@fex-design/components-styles/collapse"
import type { ExpansionKey } from "@fex-design/core/expansion/types"
import { cn } from "@fex-design/utils"
import { useId } from "react"
import type { HTMLAttributes, ReactElement, ReactNode } from "react"
import { CollapseItemContext, useCollapseContext } from "./collapse-context"

type RenderChild<T> = (context: T) => ReactElement | null

export interface CollapseItemState {
  expanded: boolean
  disabled: boolean
}

export interface CollapseItemActions {
  expand: () => void
  collapse: () => void
  toggle: () => void
}

export interface CollapseItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  value: ExpansionKey
  disabled?: boolean
  children?: ReactNode | RenderChild<{ state: CollapseItemState; actions: CollapseItemActions }>
}

export function CollapseItem({
  value,
  disabled = false,
  className,
  children,
  ...props
}: CollapseItemProps) {
  const collapse = useCollapseContext("CollapseItem")
  const fallbackId = useId()
  const state = {
    expanded: collapse.isExpanded(value),
    disabled: disabled || collapse.isDisabled(value),
  }
  const actions = {
    expand: () => collapse.expand(value),
    collapse: () => collapse.collapse(value),
    toggle: () => collapse.toggle(value),
  }
  const safeValue = String(value).replace(/\s+/g, "-")
  const itemContext = {
    value,
    disabled: state.disabled,
    triggerId: collapse.baseId + "-" + (safeValue || fallbackId) + "-trigger",
    contentId: collapse.baseId + "-" + (safeValue || fallbackId) + "-content",
  }
  return (
    <CollapseItemContext value={itemContext}>
      <div
        {...props}
        data-slot="collapse-item"
        data-state={state.expanded ? "open" : "closed"}
        data-disabled={state.disabled || undefined}
        className={cn(collapseItemClassName({ variant: collapse.variant }), className)}
      >
        {typeof children === "function" ? children({ state, actions }) : children}
      </div>
    </CollapseItemContext>
  )
}
