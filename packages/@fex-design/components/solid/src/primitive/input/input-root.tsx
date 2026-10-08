import { inputRootClassName } from "@fex-design/components-styles/input"
import type { InputVisualOptions } from "@fex-design/core/input/types"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"
import { createInput, type InputChangeReason } from "./create-input"
import { InputContext } from "./input-context"

export interface InputRootProps
  extends ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, "size">>, InputVisualOptions {
  value?: string | undefined
  defaultValue?: string | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  onValueChange?:
    | ((value: string, meta: { reason: InputChangeReason; event?: InputEvent }) => void)
    | undefined
  onClear?: (() => void) | undefined
}
export type InputProps = InputRootProps

export function InputRoot(props: InputRootProps) {
  const [local, rest] = splitProps(props, [
    "children",
    "class",
    "value",
    "defaultValue",
    "disabled",
    "readOnly",
    "size",
    "variant",
    "onValueChange",
    "onClear",
  ])
  const input = createInput({
    value: () => props.value,
    defaultValue: props.defaultValue,
    disabled: () => props.disabled,
    readOnly: () => props.readOnly,
    onValueChange: (value, meta) => props.onValueChange?.(value, meta),
    onClear: () => props.onClear?.(),
  })
  return (
    <InputContext.Provider value={input}>
      <div
        {...rest}
        data-slot="input-root"
        data-disabled={input.disabled() || undefined}
        data-readonly={input.readOnly() || undefined}
        data-size={local.size ?? "md"}
        data-variant={local.variant ?? "outlined"}
        class={cn(inputRootClassName({ size: local.size, variant: local.variant }), local.class)}
      >
        {local.children}
      </div>
    </InputContext.Provider>
  )
}

export { InputRoot as Input }
