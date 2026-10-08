import { inputGroupClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes, Ref } from "react"

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement> | undefined
}

export function InputGroup({ className, ref, ...props }: InputGroupProps) {
  return (
    <div
      {...props}
      ref={ref}
      role="group"
      data-slot="input-group"
      className={cn(inputGroupClassName, className)}
    />
  )
}
