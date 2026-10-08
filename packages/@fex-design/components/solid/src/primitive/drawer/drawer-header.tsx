import { drawerHeaderClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"

export type DrawerHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function DrawerHeader(props: DrawerHeaderProps) {
  return <div {...props} data-slot="drawer-header" class={cn(drawerHeaderClassName, props.class)} />
}
