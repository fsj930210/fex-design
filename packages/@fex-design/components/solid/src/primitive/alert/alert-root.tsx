import type { AlertOptions } from "@fex-design/core/alert/types"
import { alertClassName } from "@fex-design/components-styles/alert"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type AlertProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>> & AlertOptions
export type AlertRootProps = AlertProps

export function AlertRoot(props: AlertRootProps) {
  const [local, rest] = splitProps(props, ["class", "children", "type", "variant"])
  return (
    <div
      data-slot="alert"
      role="alert"
      {...rest}
      class={cn(
        alertClassName({ type: local.type ?? "info", variant: local.variant ?? "filled" }),
        local.class,
      )}
    >
      {local.children}
    </div>
  )
}

export const Alert = AlertRoot
