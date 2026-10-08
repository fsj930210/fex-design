import { spinnerTextClassName } from "@fex-design/components-styles/spinner"
import { cn } from "@fex-design/utils"
import type { JSX } from "solid-js"
import { splitProps } from "solid-js"

export type SpinnerTextProps = JSX.HTMLAttributes<HTMLSpanElement>

export function SpinnerText(props: SpinnerTextProps) {
  const [local, rest] = splitProps(props, ["class"])
  return <span {...rest} data-slot="spinner-text" class={cn(spinnerTextClassName, local.class)} />
}
