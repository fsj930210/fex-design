import { drawerFooterClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type DrawerFooterProps = ComponentProps<"div">

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div {...props} data-slot="drawer-footer" className={cn(drawerFooterClassName, className)} />
  )
}
