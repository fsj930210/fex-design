import { collapseIconClassName, collapseTriggerClassName } from "@fex-design/components-styles/collapse"
import { cn } from "@fex-design/utils"
import { createMemo, splitProps, type JSX } from "solid-js"
import { ChevronRightIcon } from "@fex-design/solid/icons/chevron"
import { Button } from "../button"
import { useCollapseContext, useCollapseItemContext } from "./collapse-context"

export interface CollapseTriggerProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  showIcon?: boolean
  children?:
    | JSX.Element
    | ((value: {
        props: JSX.ButtonHTMLAttributes<HTMLButtonElement>
        state: { expanded: boolean; disabled: boolean }
        icon: JSX.Element | null
      }) => JSX.Element)
}

export function CollapseTrigger(props: CollapseTriggerProps) {
  const [local, rest] = splitProps(props, ["class", "children", "showIcon", "onClick"])
  const collapse = useCollapseContext()
  const item = useCollapseItemContext()
  const state = createMemo(() => ({
    expanded: collapse.snapshot().expandedKeys.includes(item.value),
    disabled: item.disabled() || collapse.isDisabled(item.value),
  }))
  const handleClick = (event: MouseEvent) => {
    ;(local.onClick as ((event: MouseEvent) => void) | undefined)?.(event)
    if (!event.defaultPrevented && !state().disabled) collapse.toggle(item.value)
  }
  const triggerProps = {
    ...rest,
    type: rest.type ?? "button",
    id: item.triggerId,
    disabled: state().disabled,
    "aria-expanded": state().expanded,
    "aria-controls": item.contentId,
    "data-slot": "collapse-trigger",
    "data-state": state().expanded ? "open" : "closed",
    class: cn(collapseTriggerClassName({ variant: collapse.variant() }), local.class),
    onClick: handleClick,
  }
  if (typeof local.children === "function") {
    return local.children({
      props: triggerProps,
      state: state(),
      icon:
        local.showIcon === false ? null : (
          <ChevronRightIcon class={cn(collapseIconClassName, state().expanded && "-rotate-90")} />
        ),
    })
  }
  return (
    <Button
      {...rest}
      type={rest.type ?? "button"}
      id={item.triggerId}
      disabled={state().disabled}
      aria-expanded={state().expanded}
      aria-controls={item.contentId}
      data-slot="collapse-trigger"
      data-state={state().expanded ? "open" : "closed"}
      class={cn(collapseTriggerClassName({ variant: collapse.variant() }), local.class)}
      onClick={handleClick}
    >
      <span class="min-w-0 flex-1">{local.children}</span>
      {local.showIcon === false ? null : (
        <ChevronRightIcon class={cn(collapseIconClassName, state().expanded ? "-rotate-90" : "")} />
      )}
    </Button>
  )
}
