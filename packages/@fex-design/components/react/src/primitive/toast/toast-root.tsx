import {
  toastRootClassName,
  type ToastStyleProps,
} from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"
import { toast, type ReactToastItem, type ReactToastManager } from "./toast-manager"

function isKnownVariant(
  variant: ReactToastItem["variant"],
): variant is NonNullable<ToastStyleProps["variant"]> {
  return (
    variant === "default" ||
    variant === "success" ||
    variant === "info" ||
    variant === "warning" ||
    variant === "error" ||
    variant === "loading"
  )
}

export interface ToastRootProps extends ComponentProps<"div"> {
  manager?: ReactToastManager
  toast: ReactToastItem
}
export type ToastProps = ToastRootProps

export function ToastRoot({
  children,
  className,
  manager = toast,
  toast: item,
  ...props
}: ToastRootProps) {
  const knownVariant = isKnownVariant(item.variant) ? item.variant : "default"

  return (
    <div
      {...props}
      data-paused={item.paused ? "" : undefined}
      data-slot="toast"
      data-variant={item.variant}
      role="status"
      className={cn(toastRootClassName({ variant: knownVariant }), className)}
      onPointerEnter={(event) => {
        props.onPointerEnter?.(event)
        manager.pause(item.id)
      }}
      onPointerLeave={(event) => {
        props.onPointerLeave?.(event)
        manager.resume(item.id)
      }}
    >
      {children}
    </div>
  )
}

export { ToastRoot as Toast }
