import { Show, type ParentProps } from "solid-js"
import { Portal } from "solid-js/web"
import { useDrawer } from "./drawer-context"

export interface DrawerPortalProps extends ParentProps {
  forceMount?: boolean
}

export function DrawerPortal(props: DrawerPortalProps) {
  const { snapshot, depth } = useDrawer("DrawerPortal")
  return (
    <Show when={snapshot().mounted || props.forceMount}>
      <Portal>
        <div style={{ display: "contents", "--drawer-z-index": 50 + depth * 2 }}>
          {props.children}
        </div>
      </Portal>
    </Show>
  )
}
