import { dialogTitleClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"
import { useDialog } from "./use-dialog"

export type DialogTitleProps = ComponentProps<"h2">

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  const { titleId } = useDialog("DialogTitle")
  return (
    <h2
      {...props}
      id={titleId}
      data-slot="dialog-title"
      className={cn(dialogTitleClassName, className)}
    />
  )
}
