import { alertIconClassName } from "@fex-design/components-styles/alert"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type AlertIconProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>

export function AlertIcon(props: AlertIconProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <span {...rest} data-slot="alert-icon" class={cn(alertIconClassName, local.class)}>
      {local.children}
    </span>
  )
}
