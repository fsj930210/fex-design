import { dialogFooterClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type DialogFooterProps = ComponentProps<"div">

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div {...props} data-slot="dialog-footer" className={cn(dialogFooterClassName, className)} />
  )
}
