import { dialogHeaderClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type DialogHeaderProps = ComponentProps<"div">

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div {...props} data-slot="dialog-header" className={cn(dialogHeaderClassName, className)} />
  )
}
