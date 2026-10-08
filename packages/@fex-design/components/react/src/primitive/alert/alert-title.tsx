import { alertTitleClassName } from "@fex-design/components-styles/alert"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type AlertTitleProps = ComponentProps<"div">

export function AlertTitle({ className, ...props }: AlertTitleProps) {
  return <div data-slot="alert-title" className={cn(alertTitleClassName, className)} {...props} />
}
