import { drawerHeaderClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type DrawerHeaderProps = ComponentProps<"div">

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div {...props} data-slot="drawer-header" className={cn(drawerHeaderClassName, className)} />
  )
}
