import { alertDescriptionClassName } from "@fex-design/components-styles/alert"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type AlertDescriptionProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function AlertDescription(props: AlertDescriptionProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="alert-description" class={cn(alertDescriptionClassName, local.class)}>
      {local.children}
    </div>
  )
}
