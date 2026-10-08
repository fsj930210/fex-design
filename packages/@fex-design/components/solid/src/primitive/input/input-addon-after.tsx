import { inputAddonAfterClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"

export type InputAddonAfterProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>

export function InputAddonAfter(props: InputAddonAfterProps) {
  return (
    <span {...props} data-slot="input-addon-after" class={cn(inputAddonAfterClassName, props.class)}>
      {props.children}
    </span>
  )
}
