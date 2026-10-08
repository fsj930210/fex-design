import { drawerBodyClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"

export type DrawerBodyProps = JSX.HTMLAttributes<HTMLDivElement>

export function DrawerBody(props: DrawerBodyProps) {
  return <div {...props} data-slot="drawer-body" class={cn(drawerBodyClassName, props.class)} />
}
