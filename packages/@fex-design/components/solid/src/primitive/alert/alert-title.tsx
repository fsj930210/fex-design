import { alertTitleClassName } from "@fex-design/components-styles/alert"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type AlertTitleProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function AlertTitle(props: AlertTitleProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="alert-title" class={cn(alertTitleClassName, local.class)}>
      {local.children}
    </div>
  )
}
