import { toastDescriptionClassName } from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type ToastDescriptionProps = ComponentProps<"div">

export function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return (
    <div
      data-slot="toast-description"
      className={cn(toastDescriptionClassName, className)}
      {...props}
    />
  )
}
