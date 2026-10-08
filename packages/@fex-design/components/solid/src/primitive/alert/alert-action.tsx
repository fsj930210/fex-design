import { alertActionClassName } from "@fex-design/components-styles/alert"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type AlertActionProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function AlertAction(props: AlertActionProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="alert-action" class={cn(alertActionClassName, local.class)}>
      {local.children}
    </div>
  )
}
