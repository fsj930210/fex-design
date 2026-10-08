import { toastCloseClassName } from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"
import { toast, type SolidToastItem, type SolidToastManager } from "./toast-manager"

export interface ToastCloseProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  manager?: SolidToastManager
  toast: SolidToastItem
}

export function ToastClose(props: ToastCloseProps) {
  const manager = () => props.manager ?? toast
  return (
    <button
      {...props}
      type="button"
      aria-label="Close toast"
      data-slot="toast-close"
      class={cn(toastCloseClassName, props.class)}
      onClick={() => {
        manager().dismiss(props.toast.id)
      }}
    />
  )
}
