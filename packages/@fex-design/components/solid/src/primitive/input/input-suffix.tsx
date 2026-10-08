import { inputSuffixClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"

export type InputSuffixProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>

export function InputSuffix(props: InputSuffixProps) {
  return (
    <span {...props} data-slot="input-suffix" class={cn(inputSuffixClassName, props.class)}>
      {props.children}
    </span>
  )
}
