import { toastTitleClassName } from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type ToastTitleProps = ComponentProps<"div">

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <div data-slot="toast-title" className={cn(toastTitleClassName, className)} {...props} />
}
