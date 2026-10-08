import { inputControlClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { ChangeEvent, ComponentProps, Ref } from "react"
import { useComposedRef } from "@fex-design/react/hooks/use-composed-ref"
import { useInputContext } from "./input-context"

export interface InputControlProps extends ComponentProps<"input"> {
  ref?: Ref<HTMLInputElement> | undefined
}

export function InputControl({
  className,
  disabled,
  readOnly,
  "aria-invalid": ariaInvalid,
  onChange,
  ref,
  ...props
}: InputControlProps) {
  const context = useInputContext("InputControl")
  const composedRef = useComposedRef(ref, context.focusRef)

  return (
    <input
      {...props}
      ref={composedRef}
      value={context.value}
      disabled={context.disabled || disabled}
      readOnly={context.readOnly || readOnly}
      aria-invalid={ariaInvalid}
      data-slot="input-control"
      className={cn(inputControlClassName, className)}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event)
        if (!event.defaultPrevented) {
          context.setValue(event.currentTarget.value, { reason: "input", event })
        }
      }}
    />
  )
}
