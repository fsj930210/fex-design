import { collapseIconClassName, collapseTriggerClassName } from "@fex-design/components-styles/collapse"
import { cn } from "@fex-design/utils"
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react"
import { Button } from "../button"
import { ChevronRightIcon } from "@fex-design/react/icons/chevron"
import { useCollapseContext, useCollapseItemContext } from "./collapse-context"
import type { CollapseItemState } from "./collapse-item"

type RenderChild<T> = (context: T) => ReactElement | null
type CollapseTriggerDOMProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  "data-slot": "collapse-trigger"
  "data-state": "open" | "closed"
}

export interface CollapseTriggerRenderProps {
  props: CollapseTriggerDOMProps
  state: CollapseItemState
  icon: ReactNode
}

export interface CollapseTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  showIcon?: boolean
  children?: ReactNode | RenderChild<CollapseTriggerRenderProps>
}

export function CollapseTrigger({
  className,
  children,
  onClick,
  showIcon = true,
  ...props
}: CollapseTriggerProps) {
  const collapse = useCollapseContext("CollapseTrigger")
  const item = useCollapseItemContext("CollapseTrigger")
  const state = {
    expanded: collapse.isExpanded(item.value),
    disabled: item.disabled || collapse.isDisabled(item.value),
  }
  const icon = showIcon ? <ChevronRightIcon className={collapseIconClassName} /> : null
  const triggerProps: CollapseTriggerDOMProps = {
    ...props,
    type: props.type ?? "button",
    id: item.triggerId,
    disabled: state.disabled,
    "aria-expanded": state.expanded,
    "aria-controls": item.contentId,
    "data-slot": "collapse-trigger",
    "data-state": state.expanded ? "open" : "closed",
    className: cn(collapseTriggerClassName({ variant: collapse.variant }), className),
    onClick: (event) => {
      onClick?.(event)
      if (!event.defaultPrevented && !state.disabled) collapse.toggle(item.value)
    },
  }
  if (typeof children === "function") return children({ props: triggerProps, state, icon })
  return (
    <Button
      {...props}
      type={props.type ?? "button"}
      id={item.triggerId}
      disabled={state.disabled}
      aria-expanded={state.expanded}
      aria-controls={item.contentId}
      data-slot="collapse-trigger"
      data-state={state.expanded ? "open" : "closed"}
      className={cn(collapseTriggerClassName({ variant: collapse.variant }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !state.disabled) collapse.toggle(item.value)
      }}
    >
      <span className="min-w-0 flex-1">{children}</span>
      {showIcon ? (
        <ChevronRightIcon
          className={cn(
            collapseIconClassName,
            "transition-transform duration-200",
            state.expanded && "rotate-90",
          )}
        />
      ) : null}
    </Button>
  )
}
