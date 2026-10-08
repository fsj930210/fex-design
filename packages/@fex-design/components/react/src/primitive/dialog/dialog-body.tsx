import { dialogBodyClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type DialogBodyProps = ComponentProps<"div">

export function DialogBody({ className, ...props }: DialogBodyProps) {
  return <div {...props} data-slot="dialog-body" className={cn(dialogBodyClassName, className)} />
}
