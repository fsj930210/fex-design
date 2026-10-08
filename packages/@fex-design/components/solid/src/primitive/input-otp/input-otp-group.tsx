import { inputOTPGroupClassName } from "@fex-design/components-styles/input-otp"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

export type InputOTPGroupProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function InputOTPGroup(props: InputOTPGroupProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="input-otp-group" class={cn(inputOTPGroupClassName, local.class)}>
      {local.children}
    </div>
  )
}
