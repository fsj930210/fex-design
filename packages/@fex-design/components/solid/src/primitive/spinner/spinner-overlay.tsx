import { spinnerOverlayClassName } from "@fex-design/components-styles/spinner"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"
import { splitProps } from "solid-js"

export type SpinnerOverlayProps = JSX.HTMLAttributes<HTMLDivElement>

export function SpinnerOverlay(props: SpinnerOverlayProps) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div {...rest} data-slot="spinner-overlay" class={cn(spinnerOverlayClassName, local.class)} />
  )
}
