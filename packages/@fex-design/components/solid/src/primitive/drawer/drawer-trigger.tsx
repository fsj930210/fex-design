import type { createDrawerController } from "@fex-design/core/drawer/create-drawer-controller"
import type { JSX } from "solid-js"
import { useDrawer } from "./drawer-context"

export interface DrawerTriggerProps {
  children: (slot: {
    props: any
    ref: (el: HTMLButtonElement) => void
    state: ReturnType<ReturnType<typeof createDrawerController>["getSnapshot"]>
  }) => JSX.Element
}

export function DrawerTrigger(props: DrawerTriggerProps) {
  const { drawer, snapshot, triggerElement } = useDrawer("DrawerTrigger")
  return props.children({
    ref: (el) => {
      triggerElement.current = el
    },
    state: snapshot(),
    props: {
      type: "button",
      "data-state": snapshot().open ? "open" : "closed",
      "aria-haspopup": "dialog",
      "aria-expanded": snapshot().open,
      onClick: (e: MouseEvent) => drawer.toggle({ source: "trigger", event: e }),
    },
  })
}
