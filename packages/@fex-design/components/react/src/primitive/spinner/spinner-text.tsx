import { spinnerTextClassName } from "@fex-design/components-styles/spinner"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type SpinnerTextProps = ComponentProps<"span">

export function SpinnerText({ className, ...props }: SpinnerTextProps) {
  return (
    <span data-slot="spinner-text" className={cn(spinnerTextClassName, className)} {...props} />
  )
}
