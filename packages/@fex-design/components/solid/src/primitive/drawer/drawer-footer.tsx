import { drawerFooterClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"

export type DrawerFooterProps = JSX.HTMLAttributes<HTMLDivElement>

export function DrawerFooter(props: DrawerFooterProps) {
  return <div {...props} data-slot="drawer-footer" class={cn(drawerFooterClassName, props.class)} />
}
