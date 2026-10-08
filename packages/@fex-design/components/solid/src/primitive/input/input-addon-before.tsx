import { inputAddonBeforeClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"

export type InputAddonBeforeProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>

export function InputAddonBefore(props: InputAddonBeforeProps) {
  return (
    <span {...props} data-slot="input-addon-before" class={cn(inputAddonBeforeClassName, props.class)}>
      {props.children}
    </span>
  )
}
