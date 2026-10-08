import { Portal } from "solid-js/web"
import { Show, type ParentProps } from "solid-js"
import { useDialog } from "./dialog-context"

export interface DialogPortalProps extends ParentProps {
  container?: HTMLElement | null
  forceMount?: boolean
}

export function DialogPortal(props: DialogPortalProps) {
  const { snapshot } = useDialog("DialogPortal")
  return (
    <Show when={snapshot().mounted || props.forceMount}>
      <Portal mount={props.container ?? document.body}>{props.children}</Portal>
    </Show>
  )
}
