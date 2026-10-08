import { inputPrefixClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { ComponentProps, Ref } from "react"

export interface InputPrefixProps extends ComponentProps<"span"> {
  ref?: Ref<HTMLSpanElement> | undefined
}

export function InputPrefix({ className, ref, ...props }: InputPrefixProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="input-prefix"
      className={cn(inputPrefixClassName, className)}
    />
  )
}
