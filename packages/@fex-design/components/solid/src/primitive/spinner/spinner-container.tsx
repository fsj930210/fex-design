import { spinnerContainerClassName } from "@fex-design/components-styles/spinner"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"
import { splitProps } from "solid-js"

export type SpinnerContainerProps = JSX.HTMLAttributes<HTMLDivElement>

export function SpinnerContainer(props: SpinnerContainerProps) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      {...rest}
      data-slot="spinner-container"
      class={cn(spinnerContainerClassName, local.class)}
    />
  )
}
