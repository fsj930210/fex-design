import type { AlertOptions } from "@fex-design/core/alert/types"
import { alertClassName } from "@fex-design/components-styles/alert"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type AlertProps = ComponentProps<"div"> & AlertOptions
export type AlertRootProps = AlertProps

export function AlertRoot({ className, type = "info", variant = "filled", ...props }: AlertRootProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertClassName({ type, variant }), className)}
      {...props}
    />
  )
}

export const Alert = AlertRoot
