import { inputOTPGroupClassName } from "@fex-design/components-styles/input-otp"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes } from "react"

export type InputOTPGroupProps = HTMLAttributes<HTMLDivElement>

export function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  return (
    <div
      {...props}
      data-slot="input-otp-group"
      className={cn(inputOTPGroupClassName, className)}
    />
  )
}
