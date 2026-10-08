import { toastIconClassName } from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type ToastIconProps = ComponentProps<"div">

export function ToastIcon({ className, ...props }: ToastIconProps) {
  return <div data-slot="toast-icon" className={cn(toastIconClassName, className)} {...props} />
}
