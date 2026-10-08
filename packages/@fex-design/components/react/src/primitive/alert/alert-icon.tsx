import { alertIconClassName } from "@fex-design/components-styles/alert"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type AlertIconProps = ComponentProps<"span">

export function AlertIcon({ className, ...props }: AlertIconProps) {
  return <span data-slot="alert-icon" className={cn(alertIconClassName, className)} {...props} />
}
