import { drawerBodyClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type DrawerBodyProps = ComponentProps<"div">

export function DrawerBody({ className, ...props }: DrawerBodyProps) {
  return <div {...props} data-slot="drawer-body" className={cn(drawerBodyClassName, className)} />
}
