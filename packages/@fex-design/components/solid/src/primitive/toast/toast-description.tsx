import { toastDescriptionClassName } from "@fex-design/components-styles/toast"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"

export type ToastDescriptionProps = JSX.HTMLAttributes<HTMLDivElement>

export function ToastDescription(props: ToastDescriptionProps) {
  return (
    <div
      {...props}
      data-slot="toast-description"
      class={cn(toastDescriptionClassName, props.class)}
    />
  )
}
