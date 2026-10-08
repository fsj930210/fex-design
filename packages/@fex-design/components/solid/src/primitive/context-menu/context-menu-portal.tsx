import { Portal } from "solid-js/web"
import { Show, type ParentProps } from "solid-js"
import { useContextMenuContext } from "./context-menu-context"

export interface ContextMenuPortalProps {
  container?: HTMLElement | null
}

export function ContextMenuPortal(props: ParentProps<ContextMenuPortalProps>) {
  const context = useContextMenuContext("ContextMenuPortal")
  return (
    <Show when={context.snapshot().overlay.mounted}>
      <Portal
        mount={
          props.container ?? context.controller.overlay.resolvePopupContainer() ?? document.body
        }
      >
        {props.children}
      </Portal>
    </Show>
  )
}
