import { toastCloseClassName } from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"
import { toast, type ReactToastItem, type ReactToastManager } from "./toast-manager"

export interface ToastCloseProps extends ComponentProps<"button"> {
  manager?: ReactToastManager
  toast: ReactToastItem
}

export function ToastClose({ className, manager = toast, toast: item, ...props }: ToastCloseProps) {
  return (
    <button
      {...props}
      type="button"
      aria-label="Close toast"
      data-slot="toast-close"
      className={cn(toastCloseClassName, className)}
      onClick={(event) => {
        props.onClick?.(event)
        manager.dismiss(item.id)
      }}
    />
  )
}
