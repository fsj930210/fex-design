import {
  toastRootClassName,
  type ToastStyleProps,
} from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"
import { toast, type SolidToastItem, type SolidToastManager } from "./toast-manager"

function isKnownVariant(
  variant: SolidToastItem["variant"],
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

export interface ToastRootProps extends JSX.HTMLAttributes<HTMLDivElement> {
  manager?: SolidToastManager
  toast: SolidToastItem
}
export type ToastProps = ToastRootProps

export function ToastRoot(props: ToastRootProps) {
  const manager = () => props.manager ?? toast
  const knownVariant = () => (isKnownVariant(props.toast.variant) ? props.toast.variant : "default")

  return (
    <div
      data-paused={props.toast.paused ? "" : undefined}
      data-slot="toast"
      data-variant={props.toast.variant}
      role="status"
      class={cn(
        toastRootClassName({
          variant: knownVariant(),
        }),
        props.class,
      )}
      onPointerEnter={() => {
        manager().pause(props.toast.id)
      }}
      onPointerLeave={() => {
        manager().resume(props.toast.id)
      }}
    >
      {props.children}
    </div>
  )
}

export { ToastRoot as Toast }
