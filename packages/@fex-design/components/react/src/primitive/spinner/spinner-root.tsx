import { spinnerClassName } from "@fex-design/components-styles/spinner"
import { cn } from "@fex-design/utils"
import type { SpinnerOptions } from "@fex-design/core/spinner/types"
import type { ComponentProps } from "react"
import { LoadingIcon } from "@fex-design/react/icons/loading"

export type SpinnerProps = ComponentProps<"span"> & SpinnerOptions
export type SpinnerRootProps = SpinnerProps

export function Spinner({
  children,
  className,
  size = "md",
  ...props
}: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      className={cn(spinnerClassName({ size }), className)}
      role="status"
      {...props}
    >
      {children ?? <LoadingIcon className="animate-spin" />}
    </span>
  )
}

export { Spinner as SpinnerRoot }
