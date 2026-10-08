import { spinnerOverlayClassName } from "@fex-design/components-styles/spinner"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type SpinnerOverlayProps = ComponentProps<"div">

export function SpinnerOverlay({ className, ...props }: SpinnerOverlayProps) {
  return (
    <div
      data-slot="spinner-overlay"
      className={cn(spinnerOverlayClassName, className)}
      {...props}
    />
  )
}
