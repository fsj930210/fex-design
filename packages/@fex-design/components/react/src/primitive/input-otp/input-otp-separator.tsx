import { inputOTPSeparatorClassName } from "@fex-design/components-styles/input-otp"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes } from "react"

export type InputOTPSeparatorProps = HTMLAttributes<HTMLSpanElement>

export function InputOTPSeparator({ className, children, ...props }: InputOTPSeparatorProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="input-otp-separator"
      className={cn(inputOTPSeparatorClassName, className)}
    >
      {children ?? "–"}
    </span>
  )
}
