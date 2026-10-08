import { alertActionClassName } from "@fex-design/components-styles/alert"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type AlertActionProps = ComponentProps<"div">

export function AlertAction({ className, ...props }: AlertActionProps) {
  return <div data-slot="alert-action" className={cn(alertActionClassName, className)} {...props} />
}
