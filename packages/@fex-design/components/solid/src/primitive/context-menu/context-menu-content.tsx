import { popoverContentClassName, popoverMenuContentClassName } from "@fex-design/components-styles/popover"
import { cn } from "@fex-design/utils"
import { onCleanup, Show, type JSX, type ParentProps } from "solid-js"
import { useContextMenuContext } from "./context-menu-context"

export interface ContextMenuContentProps extends ParentProps {
  class?: string
  role?: JSX.HTMLAttributes<HTMLDivElement>["role"]
  style?: string
}

export function ContextMenuContent(props: ContextMenuContentProps) {
  const context = useContextMenuContext("ContextMenuContent")
  function ref(element: HTMLDivElement) {
    queueMicrotask(() => context.controller.overlay.setFloatingElement(element))
  }
  onCleanup(() => context.controller.overlay.setFloatingElement(null))
  return (
    <Show when={context.snapshot().overlay.mounted}>
      <div
        ref={ref}
        role={props.role ?? "menu"}
        tabIndex={-1}
        data-slot="context-menu-content"
        data-state={context.snapshot().overlay.open ? "open" : "closed"}
        data-phase={context.snapshot().overlay.phase}
        data-side={context.snapshot().overlay.side}
        data-align={context.snapshot().overlay.align}
        class={cn(popoverContentClassName(), popoverMenuContentClassName, props.class)}
        style={`position:var(--floating-strategy, absolute);left:var(--floating-x,0px);top:var(--floating-y,0px);${props.style ?? ""}`}
      >
        {props.children}
      </div>
    </Show>
  )
}
