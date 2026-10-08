import { toastIconClassName } from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"

export type ToastIconProps = JSX.HTMLAttributes<HTMLDivElement>

export function ToastIcon(props: ToastIconProps) {
  return <div {...props} data-slot="toast-icon" class={cn(toastIconClassName, props.class)} />
}
