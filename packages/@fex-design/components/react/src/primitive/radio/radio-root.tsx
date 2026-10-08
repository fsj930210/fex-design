import { radioIndicatorClassName, radioRootClassName, type RadioStyleProps } from "@fex-design/components-styles/radio"
import { cn } from "@fex-design/utils"
import type { ButtonHTMLAttributes, Ref } from "react"
import { useRadioContext, type RadioValue } from "./radio-context"

export interface RadioProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue" | "onChange" | "type" | "value">,
    RadioStyleProps {
  value: RadioValue
  ref?: Ref<HTMLButtonElement>
}
export type RadioRootProps = RadioProps

export function Radio({
  value,
  disabled = false,
  size = "md",
  className,
  ref,
  onClick,
  children,
  ...props
}: RadioProps) {
  const context = useRadioContext("Radio")
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
      data-slot="radio"
      data-state={checked ? "checked" : "unchecked"}
      data-disabled={currentDisabled ? "true" : undefined}
      data-value={value}
      className={cn(radioRootClassName({ size }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || currentDisabled) return
        context.select(value)
      }}
    >
      {checked ? <span data-slot="radio-indicator" className={radioIndicatorClassName} /> : null}
      {children}
    </button>
  )
}

export { Radio as RadioRoot }
