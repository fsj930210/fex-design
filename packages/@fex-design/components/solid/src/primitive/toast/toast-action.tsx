import { toastActionClassName } from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"

export type ToastActionProps = JSX.HTMLAttributes<HTMLDivElement>

export function ToastAction(props: ToastActionProps) {
  return <div {...props} data-slot="toast-action" class={cn(toastActionClassName, props.class)} />
}
