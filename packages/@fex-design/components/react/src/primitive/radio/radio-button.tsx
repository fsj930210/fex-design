import { radioButtonClassName, type RadioButtonStyleProps } from "@fex-design/components-styles/radio"
import { cn } from "@fex-design/utils"
import type { ButtonHTMLAttributes, Ref } from "react"
import { useRadioContext, type RadioValue } from "./radio-context"

export interface RadioButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue" | "onChange" | "type" | "value">,
    RadioButtonStyleProps {
  value: RadioValue
  ref?: Ref<HTMLButtonElement>
}

export function RadioButton({
  value,
  disabled = false,
  size = "md",
  className,
  ref,
  onClick,
  children,
  ...props
}: RadioButtonProps) {
  const context = useRadioContext("RadioButton")
  const currentDisabled = context.disabled || disabled
  const checked = context.value === value

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={currentDisabled}
      data-slot="radio-button"
      data-state={checked ? "checked" : "unchecked"}
      data-disabled={currentDisabled ? "true" : undefined}
      data-value={value}
      className={cn(radioButtonClassName({ size }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || currentDisabled) return
        context.select(value)
      }}
    >
      {children}
    </button>
  )
}
