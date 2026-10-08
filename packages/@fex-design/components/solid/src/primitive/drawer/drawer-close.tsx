import { drawerCloseClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"
import { XIcon } from "@fex-design/solid/icons/x"
import { useDrawer } from "./drawer-context"

export type DrawerCloseProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>

export function DrawerClose(props: DrawerCloseProps) {
  const { drawer } = useDrawer("DrawerClose")
  return (
    <button
      {...props}
      type="button"
      aria-label="Close"
      data-slot="drawer-close"
      class={cn(drawerCloseClassName, props.class)}
      onClick={(e) => {
        ;(props.onClick as any)?.(e)
        if (!e.defaultPrevented) drawer.close({ source: "close-button", event: e })
      }}
    >
      {props.children ?? <XIcon class="size-4" />}
    </button>
  )
}
