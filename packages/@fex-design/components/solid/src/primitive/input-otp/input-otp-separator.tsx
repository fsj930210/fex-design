import { inputOTPSeparatorClassName } from "@fex-design/components-styles/input-otp"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

export type InputOTPSeparatorProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>

export function InputOTPSeparator(props: InputOTPSeparatorProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <span
      {...rest}
      aria-hidden="true"
      data-slot="input-otp-separator"
      class={cn(inputOTPSeparatorClassName, local.class)}
    >
      {local.children ?? "–"}
    </span>
  )
}
