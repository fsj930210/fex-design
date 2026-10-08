import { spinnerContainerClassName } from "@fex-design/components-styles/spinner"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type SpinnerContainerProps = ComponentProps<"div">

export function SpinnerContainer({ className, ...props }: SpinnerContainerProps) {
  return (
    <div
      data-slot="spinner-container"
      className={cn(spinnerContainerClassName, className)}
      {...props}
    />
  )
}
