import { inputRootClassName } from "@fex-design/components-styles/input"
import type { InputVisualOptions } from "@fex-design/core/input/types"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes, Ref } from "react"
import { InputContext } from "./input-context"
import { useInput, type UseInputOptions } from "./use-input"

export interface InputRootProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "size">,
    UseInputOptions,
    InputVisualOptions {
  ref?: Ref<HTMLDivElement> | undefined
}
export type InputProps = InputRootProps

export function InputRoot({
  value,
  defaultValue,
  disabled,
  readOnly,
  size = "md",
  variant = "outlined",
  onValueChange,
  onClear,
  className,
  ref,
  children,
  ...props
}: InputRootProps) {
  const input = useInput({
    value,
    defaultValue,
    disabled,
    readOnly,
    onValueChange,
    onClear,
  })

  return (
    <InputContext value={input}>
      <div
        {...props}
        ref={ref}
        data-slot="input-root"
        data-disabled={input.disabled ? "true" : undefined}
        data-readonly={input.readOnly ? "true" : undefined}
        data-size={size}
        data-variant={variant}
        className={cn(inputRootClassName({ size, variant }), className)}
      >
        {children}
      </div>
    </InputContext>
  )
}

export { InputRoot as Input }
