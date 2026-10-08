import { toastActionClassName } from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type ToastActionProps = ComponentProps<"div">

export function ToastAction({ className, ...props }: ToastActionProps) {
  return <div data-slot="toast-action" className={cn(toastActionClassName, className)} {...props} />
}
