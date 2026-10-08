import { dialogDescriptionClassName } from "@fex-design/components-styles/dialog"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"
import { useDialog } from "./use-dialog"

export type DialogDescriptionProps = ComponentProps<"p">

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  const { descriptionId } = useDialog("DialogDescription")
  return (
    <p
      {...props}
      id={descriptionId}
      data-slot="dialog-description"
      className={cn(dialogDescriptionClassName, className)}
    />
  )
}
