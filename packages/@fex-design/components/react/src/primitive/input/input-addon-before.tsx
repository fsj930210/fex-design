import { inputAddonBeforeClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { ComponentProps, Ref } from "react"

export interface InputAddonBeforeProps extends ComponentProps<"span"> {
  ref?: Ref<HTMLSpanElement> | undefined
}

export function InputAddonBefore({ className, ref, ...props }: InputAddonBeforeProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="input-addon-before"
      className={cn(inputAddonBeforeClassName, className)}
    />
  )
}
