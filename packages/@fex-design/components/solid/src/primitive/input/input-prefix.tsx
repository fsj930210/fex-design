import { inputPrefixClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"

export type InputPrefixProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>

export function InputPrefix(props: InputPrefixProps) {
  return (
    <span {...props} data-slot="input-prefix" class={cn(inputPrefixClassName, props.class)}>
      {props.children}
    </span>
  )
}
