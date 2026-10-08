import { inputAddonAfterClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { ComponentProps, Ref } from "react"

export interface InputAddonAfterProps extends ComponentProps<"span"> {
  ref?: Ref<HTMLSpanElement> | undefined
}

export function InputAddonAfter({ className, ref, ...props }: InputAddonAfterProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="input-addon-after"
      className={cn(inputAddonAfterClassName, className)}
    />
  )
}
