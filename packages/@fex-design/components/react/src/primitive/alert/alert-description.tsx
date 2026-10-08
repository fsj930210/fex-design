import { alertDescriptionClassName } from "@fex-design/components-styles/alert"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type AlertDescriptionProps = ComponentProps<"div">

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn(alertDescriptionClassName, className)}
      {...props}
    />
  )
}
