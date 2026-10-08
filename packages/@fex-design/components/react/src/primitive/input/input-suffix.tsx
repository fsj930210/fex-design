import { inputSuffixClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { ComponentProps, Ref } from "react"

export interface InputSuffixProps extends ComponentProps<"span"> {
  ref?: Ref<HTMLSpanElement> | undefined
}

export function InputSuffix({ className, ref, ...props }: InputSuffixProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="input-suffix"
      className={cn(inputSuffixClassName, className)}
    />
  )
}
