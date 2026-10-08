import { toastTitleClassName } from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"

export type ToastTitleProps = JSX.HTMLAttributes<HTMLDivElement>

export function ToastTitle(props: ToastTitleProps) {
  return <div {...props} data-slot="toast-title" class={cn(toastTitleClassName, props.class)} />
}
